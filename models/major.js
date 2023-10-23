import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/db.js";
const Major = sequelize.define("Major", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: false
    }
 }, {
    timestamps: false,
    raw: true
 });

 export default Major;