import { Model } from "sequelize";

class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsTo(models.Appointment, {
      foreignKey: "appointment_id",
      as: "appointment"
    });
  }
}

export default Subscription;
