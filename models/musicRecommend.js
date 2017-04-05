module.exports = (sequelize, DataTypes) => {
  const MusicRecommend = sequelize.define("MusicRecommend", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    standard: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: '추천 기준'
    }
  }, {
    classMethods: {
      associate: (models) => {
        MusicRecommend.belongsTo(models.Music, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        })
      }
    },
    tableName: 'music_recommend',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })

  return MusicRecommend
}