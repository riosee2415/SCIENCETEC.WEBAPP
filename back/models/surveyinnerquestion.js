const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class SurveyInnerQuestion extends Model {
  static init(sequelize) {
    return super.init(
      {
        innerType: {
          type: DataTypes.INTEGER, // [1.단답 | 2.장문 | 3.체크박스 | 4. 스케일형 질문]
          allowNull: false,
        },
        sort: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        questionValue: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        placeholderValue: {
          type: DataTypes.STRING(300),
          allowNull: true,
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
        modelName: "SurveyInnerQuestion",
        tableName: "surveyInnerQuestion",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.SurveyInnerQuestion.belongsTo(db.SurveyQuestion);
  }
};
