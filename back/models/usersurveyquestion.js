const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class UserSurveyQuestion extends Model {
  static init(sequelize) {
    return super.init(
      {
        questionName: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        sort: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "UserSurveyQuestion",
        tableName: "userSurveyQuestion",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.UserSurveyQuestion.belongsTo(db.UserSurvey);
  }
};
