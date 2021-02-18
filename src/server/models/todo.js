import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

class Todo extends Model {}

Todo.init(
  {
    // Model attributes are defined here
    explanation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    done: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    sequelize,
    modelName: "Todo",
    timestamps: true
  }
);

export default Todo;
