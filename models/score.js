import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const Score = sequelize.define("Score", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    midExamScore: {
        type: DataTypes.FLOAT
    },
    finalExamScore: {
        type: DataTypes.FLOAT
    },
    midExamWeight: {
        type: DataTypes.FLOAT
    },
    finalExamWeight: {
        type: DataTypes.FLOAT
    },
    total: {
        type: DataTypes.FLOAT
    },
    Status: {
        type: DataTypes.STRING
    }

 }, {
    timestamps: false
 });

export default Score;