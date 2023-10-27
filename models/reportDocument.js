import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const ReportDocument = sequelize.define("ReportDocument", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    DocumentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    ReportId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

 }, {
    timestamps: false
 });

 export default ReportDocument;