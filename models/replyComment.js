import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const ReplyComment = sequelize.define("ReplyComment", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    CommentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    ReplyCommentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

 }, {
    timestamps: false
 });

 export default ReplyComment;