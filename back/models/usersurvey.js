const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class UserSurvey extends Model {
  static init(sequelize) {
    return super.init(
      {
        isCompleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        completedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "UserSurvey",
        tableName: "userSurvey",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.UserSurvey.belongsTo(db.User);
    db.UserSurvey.belongsTo(db.Survey);
  }
};
