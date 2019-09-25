import * as Yup from "yup";
import {
  startOfHour,
  parseISO,
  isBefore,
  subHours,
  startOfDay,
  endOfDay
} from "date-fns";
import { Op } from "sequelize";
import Appointment from "../models/Appointment";
import User from "../models/User";

class AppointmentController {
  async index(req, res) {
    const page = req.query.page || 1;
    const where = {};

    if (req.query.date) {
      const searchDate = parseISO(req.query.date);

      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)]
      };
    }

    const appointments = await Appointment.findAll({
      where,
      include: [User],
      order: ["date"],
      limit: 10,
      offset: 10 * page - 10
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      file_id: Yup.number().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const user_id = req.userId;

    const hourStart = startOfHour(parseISO(req.body.date));

    /**
     * Check for past date
     */
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: "Past date are not permited" });
    }

    const checkAvailability = await Appointment.findOne({
      where: {
        user_id,
        canceled_at: null,
        date: hourStart
      }
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: "Appointment date is note available" });
    }

    const appointment = await Appointment.create({
      ...req.body,
      user_id
    });

    return res.json(appointment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      file_id: Yup.number().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const appointment = await Appointment.findByPk(req.params.id);

    if (appointment.user_id !== req.userId) {
      return res.status(401).json({ error: "Not authorized." });
    }

    if (isBefore(appointment.date, new Date())) {
      return res.status(400).json({ error: "Past dates are not permited." });
    }

    await appointment.update({
      ...req.body
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id);

    if (appointment.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: "You don't have permission to cancel thie meetapp." });
    }

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res
        .status(401)
        .json({ error: "You can only cancel meetapp 2 hours in advance." });
    }

    await appointment.destroy();

    return res.json(appointment);
  }
}

export default new AppointmentController();
