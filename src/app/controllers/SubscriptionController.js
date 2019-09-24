import { Op } from "sequelize";
import Subscription from "../models/Subscription";
import Appointment from "../models/Appointment";
import User from "../models/User";

class SubscriptionController {
  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const appointment = await Appointment.findByPk(req.params.appointmentId, {
      include: [User]
    });

    if (appointment.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to you own meetups !" });
    }

    if (appointment.past) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to past meetups !" });
    }

    const checkSubscription = await Subscription.findOne({
      where: {
        user_id: user.id
      },
      include: [
        {
          model: Appointment,
          required: true,
          where: {
            date: appointment.date
          }
        }
      ]
    });

    if (checkSubscription) {
      return res
        .status(400)
        .json({ error: "Can't not subscribe two meetaps in the same time !" });
    }

    const subscription = await Subscription.create({
      user_id: user.id,
      appointment_id: appointment.id
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
