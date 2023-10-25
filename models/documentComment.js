import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const DocumentComment = sequelize.define("DocumentComment", {
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

    DocumentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

 }, {
    timestamps: false
 });

 export default DocumentComment;