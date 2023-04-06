"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patient.init(
    {
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middle_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telephone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      patient_id: {
        type: DataTypes.INTEGER,
        defaultValue: function () {
          return Math.floor(100000 + Math.random() * 900000);
        },
      },
      payment_category: {
        type: DataTypes.ENUM("out of pocket", "reliance health insurance"),
      },
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );

  Patient.addHook(
    "beforeCreate",
    async (patient) => (
      (patient.last_name = patient.last_name.toLowerCase()),
      (patient.middle_name = patient.middle_name.toLowerCase()),
      (patient.first_name = patient.first_name.toLowerCase())
    )
  );

  return Patient;
};
