import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";

const AccessSubject = sequelize.define("AccessSubject", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true

    },
    
    LastAccess: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },

    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    SubjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

}, {
    timestamps: false,
});

export default AccessSubject;