const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class MailSendHistory extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(30), // 메일 발송 or 문자 발송
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING(500), // 메일 제목 or 문자 제목
          allowNull: false,
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        modelName: "MailSendHistory",
        tableName: "mailSendHistory",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
