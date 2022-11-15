const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Forum extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        youtubeLink: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        updator: {
          type: DataTypes.INTEGER,
          allowNull: true, // 필수
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
        modelName: "Forum",
        tableName: "forum",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
