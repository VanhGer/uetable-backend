import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
import Class from "./class.js";
import Event from "./event.js";
const EventClass= sequelize.define("EventClass", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    EventId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ClassId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

 }, {
    timestamps: false
 });


Event.belongsToMany(Class, {through: EventClass});
 export default EventClass;