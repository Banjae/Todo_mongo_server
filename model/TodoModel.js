// 몽구스 모듈
const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    completd: Boolean,
  },
  { collection: "todos" }
);
const Todo = mongoose.model("Todo", todoSchema);
module.exports = { Todo };
