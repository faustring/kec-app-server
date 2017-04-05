module.exports = (sequelize, DataTypes) => {
  const KaraokeImage = sequelize.define("KaraokeImage", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    src: {
      type: DataTypes.STRING(1028),
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    text: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    create_ts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    classMethods: {
      associate: (models) => {
        KaraokeImage.belongsTo(models.Karaoke, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        })
      }
    },
    tableName: 'karaoke_image',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })

  return KaraokeImage
}