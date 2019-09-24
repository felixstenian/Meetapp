import { Op } from "sequelize";
import Subscription from "../models/Subscription";
import Appointment from "../models/Appointment";
import User from "../models/User";

class SubscriptionController {
  async store(req, res) {
    const user = await User.findByPk(req.userID);
    const meetapp = await Appointment.findByPk(req.params.appointmentId, {
      include: [User]
    });

    if (meetapp.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to you own meetups !" });
    }

    return res.json({ ok: true });
  }
}

export default new SubscriptionController();
