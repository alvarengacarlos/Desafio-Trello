'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
  class List extends Model {
    
    static associate(models) {
      List.hasMany(models.Task, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });
    }
  };

  List.init({   
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true      
    }, 
    title: {
      type: DataTypes.STRING,
      allowNull: false,      
      validate: {
        min: 3,
        max: 255
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,      
      validate: {
        min: 3,
        max: 255        
      }
    }
  }, {
    sequelize,
    modelName: 'List',
  });
  
  return List;  
};