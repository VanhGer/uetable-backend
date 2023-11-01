import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const Documment = sequelize.define("Document", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    PageType: {
        type: DataTypes.CHAR,
        defaultValue: 'D'
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CreatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    },
    Like: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    Download: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },

    Category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SubjectId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

 }, {
    timestamps: false
 });

 export default Documment;