import Sequelize, { Model } from "sequelize";

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Subscription, {
      foreignKey: "appointment_id"
    });
    this.belongsTo(models.File, { foreignKey: "file_id" });
    this.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

export default Appointment;
