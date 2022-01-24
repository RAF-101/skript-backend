'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produkt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Kategorija, Rezervacija}) {
      // define association here
      this.belongsTo(Kategorija, {foreignKey: 'ime', as: 'kategorija'});
      this.belongsTo(Rezervacija, {foreignKey: 'ime', as: 'produkt'});
    }
  }
  // {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   unique: true,
  //   validate: {
  //     isEmail: {
  //       msg: "Nije email"
  //     }
  //   }
  // }
  Produkt.init({
    ime: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    opis: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    cena: {
      type :DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    popust: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false
    }
  }, {
    sequelize,
    modelName: 'Produkt',
  });
  return Produkt;
};