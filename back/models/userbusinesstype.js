const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class UserBusinessType extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
      },
      {
        modelName: "UserBusinessType",
        tableName: "userBusinessTypes",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.UserBusinessType.belongsTo(db.User);
  }
};
