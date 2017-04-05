module.exports = (sequelize, DataTypes) => {
  const MusicCategory = sequelize.define("MusicCategory", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true
    }
  }, {
    classMethods: {
      associate: (models) => {
        MusicCategory.hasMany(models.Music)
      }
    },
    tableName: 'music_category',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })

  return MusicCategory
}