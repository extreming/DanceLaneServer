const mongoose = require("mongoose");
//test为数据库名
const db_str = "mongodb://localhost:27017/dance";

mongoose.set('useCreateIndex', true)
mongoose.connect(db_str, { useNewUrlParser: true, useUnifiedTopology: true });

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
  age: { type: Number, require: true },
  sex: { type: String, require: true },
  course: { type: String, require: true },
  school: { type: String, require: false },
  phone: { type: String, require: true },
  parentsName: { type: String, require: true },
  relationship: { type: String, require: false },
  parentsPhone: { type: String, require: true },
  mail: { type: String, require: false },
  address: { type: String, require: false },
  message: { type: String, require: false },
  createTime: { type: String, required: true },
  status: { type: String, required: true },
  desc: { type: String, required: true },
});

// 创建唯一索引
schema.index({name: 1, course: 1, phone: 1 },{unique: true});

//定义模型对象，数据库会自动二次命名，将apply命名为applies
const apply = new mongoose.model("apply", schema);

module.exports = apply;