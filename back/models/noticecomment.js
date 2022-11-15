const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class NoticeComment extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.STRING(2000),
          allowNull: false, // 필수
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
        modelName: "NoticeComment",
        tableName: "noticeComments",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.NoticeComment.belongsTo(db.User);
    db.NoticeComment.belongsTo(db.Notice);
  }
};
