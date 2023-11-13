import { DataTypes} from "sequelize";
import sequelize from "../database/db.js"
import bcrypt from 'bcrypt'

const Auth = sequelize.define("Auth", {
    StudentId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    CodeHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CreateAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    },
 },
 {
    timestamps: false,
    hooks: {
        beforeUpdate: (Auth) => {
          const salt = bcrypt.genSaltSync(10)
          Auth.CodeHash = bcrypt.hashSync(User.CodeHash, salt)
        },
      }
 }
);

 User.prototype.validateCode = function (plainText) {
    return bcrypt.compareSync(plainText, this.CodeHash)
  }

 export default Auth; 