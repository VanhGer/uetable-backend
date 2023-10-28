import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
import Subject from "./subject.js";
const Class = sequelize.define("Class", {
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
    Code: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TimeStart: {
      type: DataTypes.DATE,
      allowNull: false
    },
    TimeEnd: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Teacher: {
        type: DataTypes.STRING
    },
    SubjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

}, {
    timestamps: false,
});
Class.belongsTo(Subject);
export default Class;