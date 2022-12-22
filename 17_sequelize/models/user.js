'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.user_profile.belongsTo(
      //   models.user,
      //   {
      //     foreignKey: {
      //       name: 'fk_user_id'
      //     },
      //     references: {
      //       table: 'users',
      //       field: 'id'
      //     },
      //     onDelete: 'CASCADE',
      //     onUpdate: 'CASCADE'
      //   }
      // );
    }
  };
  User.init({
    user_id: DataTypes.STRING,
    user_password: DataTypes.STRING,
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
    modelName: 'user',
  });
  return User;
};