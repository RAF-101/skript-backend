'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate({ Review }) {
      // define association here
      this.hasMany(Review, { foreignKey: 'userId', as: 'messages', onDelete: 'cascade', hooks: true });
    }
  };
  Users.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Nije email"
        }
      }
    },
    usertype: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    }
  }, {
    sequelize,
    defaultScope: {
      attributes: { exlude: ['email'] }
    },
    modelName: 'Users',
  });
  return Users;
};