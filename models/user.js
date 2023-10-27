import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const User = sequelize.define("User", {
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
    PasswordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING
    },
    Birth: {
        type: DataTypes.DATE,
    },
    StudentId: {
        type: DataTypes.STRING
    },
    Role: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    Score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    Credits: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    Avatar: {
        type: DataTypes.TEXT
    }
 }, {
    timestamps: false
 });

 export default User;