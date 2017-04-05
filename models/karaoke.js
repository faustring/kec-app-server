module.exports = (sequelize, DataTypes) => {
  const Karaoke = sequelize.define("Karaoke", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      default: 0
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
      default: 0
    },
    address_line1: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address_line2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    postcode: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    price: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    create_ts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    classMethods: {
      associate: function(models) {
        Karaoke.hasMany(models.KaraokeReview)
        Karaoke.hasMany(models.KaraokeImage)
      }
    },
    tableName: 'karaoke',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })

  return Karaoke
}