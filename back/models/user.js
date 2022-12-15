const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: DataTypes.INTEGER, // [1. 개인 | 2. 조합]
          allowNull: false,
        },
        userId: {
          type: DataTypes.STRING(60), // 아이디
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(100), // 비밀번호
          allowNull: false,
        },
        combiName: {
          type: DataTypes.STRING(100), // 조합명
          allowNull: true,
        },
        combiHomepage: {
          type: DataTypes.STRING(100), // 조합 홈페이지
          allowNull: true,
        },
        combiEstimateDate: {
          type: DataTypes.DATE, // 설립날짜
          allowNull: true,
        },
        combiArea: {
          type: DataTypes.STRING(100), // 지역 (8개 도만 들어옵니다.) 강원도, 충청남도, 충청북도, 경기도, 경상남도, 경상북도, 전라남도, 전라북도
          allowNull: true,
        },
        corporationCnt: {
          type: DataTypes.INTEGER, // 법인 조합원수
          allowNull: true,
        },
        personalCnt: {
          type: DataTypes.INTEGER, // 개인 조합원수
          allowNull: true,
        },
        repreName: {
          type: DataTypes.STRING(100), // 이사장명
          allowNull: true,
        },
        postCode: {
          type: DataTypes.STRING(10), // 우편번호
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING(500), // 주소
          allowNull: true,
        },
        detailAddress: {
          type: DataTypes.STRING(500), // 상세주소
          allowNull: true,
        },
        mobile: {
          type: DataTypes.STRING(30), // 전화
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(60), // 이메일
          allowNull: false,
          unique: true,
        },
        username: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        importantBusiness1: {
          type: DataTypes.STRING(100), // 주요사업 1
          allowNull: true,
        },
        importantBusiness2: {
          type: DataTypes.STRING(100), // 주요사업 2
          allowNull: true,
        },
        importantBusiness3: {
          type: DataTypes.STRING(100), // 주요사업 3
          allowNull: true,
        },
        importantBusinessCapital: {
          type: DataTypes.INTEGER, // 주요사업 자본금
          allowNull: true,
        },
        importantBusinessPrice: {
          type: DataTypes.INTEGER, // 주요사업 매출액
          allowNull: true,
        },
        level: {
          // 사용자 권한 [1 : 일반회원, 2 : 비어있음, 3: 운영자, 4: 최고관리자, 5: 개발사]
          type: DataTypes.INTEGER,
          allowNull: false, //
          defaultValue: 1,
        },
        secret: {
          type: DataTypes.STRING(10),
          allowNull: true,
          defaultValue: null,
        },
        kakaoId: {
          type: DataTypes.STRING(50), // 카카오톡 ID
          allowNull: true,
        },
        isKakao: {
          type: DataTypes.BOOLEAN, // 카카오 수신 동의 여부
          allowNull: false, //
          defaultValue: false,
        },
        isPremium: {
          type: DataTypes.BOOLEAN, // 유료회원 여부
          allowNull: false, //
          defaultValue: false,
        },
        terms: {
          // 이용약관동의
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        // 관리자 메뉴 권환 제어
        menuRight1: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight2: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight3: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight4: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight5: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight6: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight7: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight8: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight9: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight10: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight11: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        menuRight12: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isExit: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        exitReason: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        exitedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "User",
        tableName: "users",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Question);
  }
};
