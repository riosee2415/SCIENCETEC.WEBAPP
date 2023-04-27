const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Festival extends Model {
  static init(sequelize) {
    return super.init(
      {
        festivalName: {
          type: DataTypes.STRING(300), // 행사명
          allowNull: false,
        },
        festivalStartDate: {
          type: DataTypes.DATE, // 행사 시작일
          allowNull: false,
        },
        festivalEndDate: {
          type: DataTypes.DATE, // 행사 마감일
          allowNull: false,
        },
        festivalLocation: {
          type: DataTypes.STRING(500), // 장소
          allowNull: false,
        },
        schedule: {
          type: DataTypes.STRING(30), // 참가 일정
          allowNull: false,
        },
        onOff: {
          type: DataTypes.BOOLEAN,
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
        modelName: "Festival",
        tableName: "festival",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
