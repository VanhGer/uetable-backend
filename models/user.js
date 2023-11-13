import { DataTypes} from "sequelize";
import sequelize from "../database/db.js"
import bcrypt from 'bcrypt'

const User = sequelize.define("User", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    PasswordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Birth: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    },
    StudentId: {
        type: DataTypes.STRING
    },
    Role: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    Score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    Status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    },
    Credits: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    Avatar: {
        type: DataTypes.TEXT
    }
 },
 {
    timestamps: false,
    hooks: {
        beforeUpdate: (User) => {
          const salt = bcrypt.genSaltSync(10)
          User.PasswordHash = bcrypt.hashSync(User.PasswordHash, salt)
        },
      }
 }
);

 User.prototype.validatePassword = function (plainText) {
    return bcrypt.compareSync(plainText, this.PasswordHash)
  }

 export default User;