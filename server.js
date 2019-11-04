var express = require('express')
var app = express();
const bodyParser = require('body-parser')
const applyRoute = require('./api/apply/apply.js')
const userRoute = require('./api/user/user.js')

// 解析POST请求中的json请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// 开启静态文件
app.use('/public', express.static('public'));

app.use('/apply', applyRoute)
app.use('/user', userRoute)

// get请求
app.get('/', function (req, res) {
  res.send('Hello World');
})
 
var server = app.listen(80, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})