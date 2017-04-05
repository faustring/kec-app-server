module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
    },
    propic: {
      type: DataTypes.STRING(1028),
      allowNull: false,
      defaultValue: ''
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    create_ts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    last_login_ts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    oauth_provider: {
      type: DataTypes.STRING(16),
      allowNull: false,
      comment: 'facebook, google, kakao, naver'
    },
    oauth_provider_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: 'oauth access token'
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.KaraokeReview)
      }
    },
    tableName: 'user',
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })

  return User
}