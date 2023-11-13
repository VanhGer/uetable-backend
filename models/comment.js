import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import User from "../models/user.js"

const Comment = sequelize.define("Comment", {
  Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },

  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('NOW()')
  },
  
  Content: {
    type: DataTypes.STRING,
    allowNull: false
  },

  PageId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  ParentId: {
    type: DataTypes.INTEGER,
  },

  PreCommentId: {
    type: DataTypes.INTEGER
  }

}, {
  timestamps: false
})

Comment.belongsToMany(User, {
  through: 'UserLike',
  as: 'likedUsers',
  foreignKey: 'UserId',
})

Comment.belongsTo(User)

Comment.prototype.getReplies = async (id) => {
  const replies = await Comment.findAll({
    where: {
      ParentId: id,
    },
  })

  return replies
} 

Comment.prototype.getPreVersion = async (id) => {
  const comment = await Comment.find({
    where: {
      Id: id
    }    
  })

  return comment
}



export default Comment;