const mongoose = require("mongoose");
//test为数据库名
const db_str = "mongodb://localhost:27017/dance";

mongoose.connect(db_str, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

mongoose.connection.on("connected", () => {
  console.log("连接success");
});

mongoose.connection.on("error", () => {
  console.log("连接error");
});

mongoose.connection.on("disconnected", () => {
  console.log("断开连接");
});

//插入时遵循的数据结构
const schema = new mongoose.Schema({
  name: { type: String, require: true },
  nickname: { type: String, require: true },
  password: { type: String, require: true },
  avatar: { type: String, require: true },
  role: { type: String, require: true },
});

// 创建唯一索引
schema.index({name: 1},{unique: true});

//定义模型对象，数据库会自动二次命名，将user命名为users
const user = new mongoose.model("user", schema);

module.exports = user;