const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class UnderShareProject extends Model {
  static init(sequelize) {
    return super.init(
      {
        imagePath: {
          type: DataTypes.STRING(600), // 이미지
          allowNull: false,
        },
        link: {
          type: DataTypes.STRING(300), // 링크
          allowNull: false,
        },
        repreName: {
          type: DataTypes.STRING(30), // 대표자명
          allowNull: false,
        },
        estimateDate: {
          type: DataTypes.DATE, // 설립연도
          allowNull: false,
        },
        empCnt: {
          type: DataTypes.INTEGER, // 직원수
          allowNull: false,
        },
        jobType: {
          type: DataTypes.STRING(100), // 업종
          allowNull: false,
        },
        importantWork: {
          type: DataTypes.STRING(1000), // 주업무
          allowNull: false,
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
      },
      {
        modelName: "UnderShareProject",
        tableName: "underShareProjects",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.UnderShareProject.belongsTo(db.ShareProject);
  }
};
