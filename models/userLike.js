import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const UserLike = sequelize.define("UserLike", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    CommnetId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
 }, {
    timestamps: false
 });

export default UserLike;