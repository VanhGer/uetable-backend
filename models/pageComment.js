import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const PageComment = sequelize.define("PageComment", {
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

    PageId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

 }, {
    timestamps: false
 });

 export default PageComment;