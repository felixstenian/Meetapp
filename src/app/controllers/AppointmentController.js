import * as Yup from "yup";
import { startOfHour, parseISO } from "date-fns";
import Appointment from "../models/Appointment";

class AppointmentController {
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

    const { title, description, location, date, file_id } = req.body;

    const user_id = req.userId;

    const appointment = await Appointment.create({
      ...req.body,
      user_id
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
