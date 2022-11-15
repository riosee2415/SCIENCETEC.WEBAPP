const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class UserCombiType extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
      },
      {
        modelName: "UserCombiType",
        tableName: "userCombiTypes",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.UserCombiType.belongsTo(db.User);
  }
};
