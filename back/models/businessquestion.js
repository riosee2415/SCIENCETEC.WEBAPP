const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class BusinessQuestion extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING(50), // 신청자명
          allowNull: false,
        },
        company: {
          type: DataTypes.STRING(100), // 소속기관
          allowNull: true,
        },
        job: {
          type: DataTypes.STRING(50), // 직위
          allowNull: true,
        },
        mobile: {
          type: DataTypes.STRING(50), // 휴대전화번호
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(50), // 이메일
          allowNull: false,
        },
        serviceType: {
          type: DataTypes.STRING(50), // 서비스 유형
          allowNull: false,
        },
        etc: {
          type: DataTypes.STRING(2000), // 신청시 기타사항
          allowNull: true,
        },
        sector: {
          type: DataTypes.STRING(50), // 신청 기술 분야
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(2000), // 세부내역
          allowNull: true,
        },
        sectorEtc: {
          type: DataTypes.STRING(2000), // 신청기술분야 기타사항
          allowNull: true,
        },
        terms: {
          type: DataTypes.BOOLEAN, // 개인정보 수집 및 활용 동의
          allowNull: false,
          defaultValue: false,
        },
        file: {
          type: DataTypes.STRING(600), // 파일
          allowNull: true,
        },
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
        modelName: "BusinessQuestion",
        tableName: "businessQuestions",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.BusinessQuestion.belongsTo(db.User);
  }
};
