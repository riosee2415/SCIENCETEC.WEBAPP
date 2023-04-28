const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class FestivalTicket extends Model {
  static init(sequelize) {
    return super.init(
      {
        participantName: {
          type: DataTypes.STRING(50), // 참가자
          allowNull: false,
        },
        belong: {
          type: DataTypes.STRING(300), // 소속
          allowNull: false,
        },
        jobPosition: {
          type: DataTypes.STRING(100), // 직위
          allowNull: false,
        },
        mobile: {
          type: DataTypes.STRING(50), // 연락처
          allowNull: false,
        },
      },
      {
        modelName: "FestivalTicket",
        tableName: "festivalTicket",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.FestivalTicket.belongsTo(db.Festival);
    db.FestivalTicket.belongsTo(db.User);
  }
};
