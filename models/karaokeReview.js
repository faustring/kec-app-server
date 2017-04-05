module.exports = (sequelize, DataTypes) => {
  const KaraokeReview = sequelize.define("KaraokeReview", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    is_anon: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
      validate: {
        min: 0,
        max: 5
      }
    },
    create_ts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    classMethods: {
      associate: (models) => {
        KaraokeReview.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        })
        KaraokeReview.belongsTo(models.Karaoke, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        })
      }
    },
    tableName: 'karaoke_review',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })

  return KaraokeReview
}