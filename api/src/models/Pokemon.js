const {DataTypes} = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
        },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attack:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defense: {
      type:DataTypes.INTEGER,
      allowNull: false,
      
    },
    speed: {
      type:DataTypes.INTEGER,
      
    },
    height: {
      type:DataTypes.INTEGER,
      
    },
    weight: {
      type:DataTypes.INTEGER,
      
    },
    image: {
      type:DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/ef680c30a573972.png'
    }
  },
    {
      timestamps: false,
      hooks: {
        beforeCreate: (pokemon) => {
          if (!pokemon.image) {
            pokemon.image = 'https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/ef680c30a573972.png'
          }
        }
      }
  })
};

