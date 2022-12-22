'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserProfile.init({
    // fk_user_id: DataTypes.BIGINT.UNSIGNED,
    user_name: DataTypes.STRING,
    birth: {
      type: DataTypes.STRING
    },
    gender: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("now")
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("now")
    }    
  }, {
    sequelize,
    modelName: 'user_profile',
  });
  return UserProfile;
};