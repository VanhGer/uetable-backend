import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const Comment = sequelize.define("Comment", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    CreateAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Like: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    Content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

 }, {
    timestamps: false,
 });

 export default Comment;