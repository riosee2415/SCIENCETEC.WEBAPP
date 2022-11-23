const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Survey extends Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: DataTypes.INTEGER, // [1. 사업수행 현황조사 | 2. 사업 수요조사 | 3. 기술매칭서비스 신청]
          allowNull: false,
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        modelName: "Survey",
        tableName: "survey",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
