import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const Event= sequelize.define("Event", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    TimeStart: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    },
    TimeEnd: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    },

    Location: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Info: {
        type: DataTypes.STRING,
    },
    ScheduleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
 }, {
    timestamps: false
 });

 export default Event;