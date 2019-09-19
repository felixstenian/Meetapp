import * as Yup from "yup";
import { startOfHour, parseISO, isBefore } from "date-fns";
import Appointment from "../models/Appointment";
import File from "../models/File";

class AppointmentController {
  async index(req, res) {
    const appointments = await Appointment.findAll({
      where: { user_id: req.userId },
      order: ["date"],
      attributes: ["id", "title", "description", "location", "date"],
      include: [
        {
          model: File,
          as: "file",
          attributes: ["id", "path", "url"]
        }
      ]
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

    const user_id = req.userId;

    const appointment = await Appointment.findByPk(req.params.id);

    if (appointment.user_id !== user_id) {
      return res.status(401).json({ error: "Not authorized." });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res
        .status(400)
        .json({ error: "Meetapp appointment date invalid" });
    }

    if (appointment.past) {
      return res
        .status(400)
        .json({ error: "Can't update past meetapp appointment" });
    }

    await appointment.update(req.body);

    return res.json(appointment);
  }
}

export default new AppointmentController();
