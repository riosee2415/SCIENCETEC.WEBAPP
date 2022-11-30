const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class SurveyQuestion extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          type: DataTypes.STRING(100), // 질문 제목
          allowNull: false,
        },
        sort: {
          type: DataTypes.INTEGER, // 질문 순서
          allowNull: false,
        },
        isOverlap: {
          type: DataTypes.BOOLEAN, // 중복여부
          allowNull: false,
          defaultValue: false,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "SurveyQuestion",
        tableName: "surveyQuestion",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.SurveyQuestion.belongsTo(db.Survey);
  }
};
