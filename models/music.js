module.exports = (sequelize, DataTypes) => {
  const Music = sequelize.define("Music", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    singer: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: '가수'
    },
    lyricist: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: '작사자'
    },
    composer: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: '작곡가'
    },
    tj_song_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ky_song_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    classMethods: {
      associate: (models) => {
        Music.belongsTo(models.MusicCategory, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        })
        Music.hasMany(models.MusicRecommend)
      }
    },
    tableName: 'music',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })

  return Music
}