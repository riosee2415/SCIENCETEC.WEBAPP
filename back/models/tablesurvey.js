const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class TableSurvey extends Model {
  static init(sequelize) {
    return super.init(
      {
        combiName: {
          type: DataTypes.STRING(100), // 조합명
          allowNull: false,
        },
        businessType: {
          type: DataTypes.STRING(30), // 사업구분 ( 신규형 | 성장형 )
          allowNull: false,
        },
        subjectName: {
          type: DataTypes.STRING(300), // 과제명
          allowNull: false,
        },
        businessRepName: {
          type: DataTypes.STRING(50), // 사업책임자
          allowNull: false,
        },
        estimateDate: {
          type: DataTypes.STRING(50), // 설립년도
          allowNull: false,
        },
        workRepName: {
          type: DataTypes.STRING(50), // 실무책임자
          allowNull: false,
        },
        corporationCnt: {
          type: DataTypes.INTEGER, // 법인 조합원수
          allowNull: false,
        },
        personalCnt: {
          type: DataTypes.INTEGER, // 개인 조합원수
          allowNull: false,
        },
        businessPriceLastYear: {
          type: DataTypes.INTEGER, // 매출액 (전년)
          allowNull: false,
        },
        businessPriceThisYear: {
          type: DataTypes.INTEGER, // 매출액 (금년(추정))
          allowNull: false,
        },
        plan: {
          type: DataTypes.STRING(100), // 계획
          allowNull: false,
        },
        completePercentage: {
          type: DataTypes.STRING(50), // 달성률
          allowNull: false,
        },
        pExpense1: {
          type: DataTypes.INTEGER, // 인건비 1
          allowNull: false,
        },
        pExpense2: {
          type: DataTypes.INTEGER, // 인건비 2
          allowNull: false,
        },
        pFacility1: {
          type: DataTypes.INTEGER, // 시설장비비 1
          allowNull: false,
        },
        pFacility2: {
          type: DataTypes.INTEGER, // 시설장비비 2
          allowNull: false,
        },
        pMaterial1: {
          type: DataTypes.INTEGER, // 재료비 1
          allowNull: false,
        },
        pMaterial2: {
          type: DataTypes.INTEGER, // 재료비 2
          allowNull: false,
        },
        pResearch1: {
          type: DataTypes.INTEGER, // 연구활동비 1
          allowNull: false,
        },
        pResearch2: {
          type: DataTypes.INTEGER, // 연구활동비 2
          allowNull: false,
        },
        pIndirect1: {
          type: DataTypes.INTEGER, // 간접비 1
          allowNull: false,
        },
        pIndirect2: {
          type: DataTypes.INTEGER, // 간접비 2
          allowNull: false,
        },
        //// 만족도 조사///////////
        // 1. 본 지원사업이 귀 협동조합의 기술사업화 추진 등에 도움이 되었다.
        range1: {
          type: DataTypes.INTEGER, //1. 전혀 그렇지 않다  2. 그렇지 않다  3. 보통이다  4. 그렇다  5. 매우 그렇다
          allowNull: false,
        },

        // 2. 본 지원사업이 귀 협동조합의 참여 전 요구 및 기대 등에 부합하였다.
        range2: {
          type: DataTypes.INTEGER, //1. 전혀 그렇지 않다  2. 그렇지 않다  3. 보통이다  4. 그렇다  5. 매우 그렇다
          allowNull: false,
        },

        // 3. 본 지원사업의 지원내역(신규, 성장/ 시제품 개발 지원, 기술 사업화 등)에 만족한다.
        range3: {
          type: DataTypes.INTEGER, //1. 전혀 그렇지 않다  2. 그렇지 않다  3. 보통이다  4. 그렇다  5. 매우 그렇다
          allowNull: false,
        },

        // 4. 본 지원사업은 과학기술 분야 발전 및 협동조합 육성 등에 있어 기여하는 바가 있다.
        range4: {
          type: DataTypes.INTEGER, //1. 전혀 그렇지 않다  2. 그렇지 않다  3. 보통이다  4. 그렇다  5. 매우 그렇다
          allowNull: false,
        },

        // 5. 본 지원사업은 지속적으로 추진될 필요가 있다.
        range5: {
          type: DataTypes.INTEGER, //1. 전혀 그렇지 않다  2. 그렇지 않다  3. 보통이다  4. 그렇다  5. 매우 그렇다
          allowNull: false,
        },

        // 6. 추후에도 지원사업에 참여 기회가 주어진다면 재참여할 의향이 있다.
        range6: {
          type: DataTypes.INTEGER, //1. 전혀 그렇지 않다  2. 그렇지 않다  3. 보통이다  4. 그렇다  5. 매우 그렇다
          allowNull: false,
        },

        // 7. 본 지원사업을 타 협동조합 등에게 추천할 의향이 있다.
        range7: {
          type: DataTypes.INTEGER, //1. 전혀 그렇지 않다  2. 그렇지 않다  3. 보통이다  4. 그렇다  5. 매우 그렇다
          allowNull: false,
        },

        // 8. 본 지원사업 관련 전문기관(한국연구재단)의 지원에 만족한다.
        range8: {
          type: DataTypes.INTEGER, //1. 전혀 그렇지 않다  2. 그렇지 않다  3. 보통이다  4. 그렇다  5. 매우 그렇다
          allowNull: false,
        },

        // 9. 본 지원사업 원영주관기관의 지원에 만족한다.
        range9: {
          type: DataTypes.INTEGER, //1. 전혀 그렇지 않다  2. 그렇지 않다  3. 보통이다  4. 그렇다  5. 매우 그렇다
          allowNull: false,
        },

        // 10. 본 지원 사업 운영주관기관의 워크숍 및 지원 프로그램에 만족한다.
        range10: {
          type: DataTypes.INTEGER, //1. 전혀 그렇지 않다  2. 그렇지 않다  3. 보통이다  4. 그렇다  5. 매우 그렇다
          allowNull: false,
        },

        // 11. 상기 요건들을 모두 고려할 때, 사업 성과 등에 전반적으로 만족한다.
        range11: {
          type: DataTypes.INTEGER, //1. 전혀 그렇지 않다  2. 그렇지 않다  3. 보통이다  4. 그렇다  5. 매우 그렇다
          allowNull: false,
        },
      },
      {
        modelName: "TableSurvey",
        tableName: "tableSurvey",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.TableSurvey.belongsTo(db.User);
  }
};
