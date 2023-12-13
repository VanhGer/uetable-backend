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

    PageType: {
        type: DataTypes.CHAR,
        allowNull: false,
        validate: {
            isIn: {
                args: [['D', 'S', 'R']],
                msg: "Must be D, S or R"
            }
        }
    },

    PageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

 }, {
    timestamps: false
 });

 export default PageComment;