const express = require('express')
const router = express.Router()
const userModel = require('./db_user.js')

router.use(function timeLog (req, res, next) {
    console.log('=====================================================')
    console.log('Time: ', Date.now())
    console.log('请求参数：');
    console.log(req.url)
    console.log(req.method)
    console.log(req.body)
    // 解决跨域
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Token");
    next()
})

// 添加用户
router.post('/addUser', (req, res) => {
    //利用model对象对数据进行增删改查
    //增加（注意：这里增加是create而不是insert）
    let { name, nickname, password, avatar, role  } = req.body;
    userModel.create({ name, nickname, password, avatar, role, createTime: new Date() }, (error, doc) => {
        if (error) {
            console.log('报错信息：')
            console.log(error)
            res.send({ code: 0, msg: error.errmsg, data: null })
        } else {
            console.log('响应参数：')
            console.log({ code: 1, msg: '申请报名成功', data: null })
            res.send({ code: 1, msg: '申请报名成功', data: null })
        }
    });
})

// 登录
router.post('/login', (req, res) => {
    let { name, password  } = req.body;
    userModel.find({ name, name }, (error, docs) => {
        if (error) {
            console.log('报错信息：')
            console.log(error)
            res.send({ code: 0, msg: error.errmsg, data: null })
        } else {
            if (docs.length === 0) return res.send({ code: 0, msg: '用户名不存在', data: null })
            if (docs.length > 1) return res.send({ code: 0, msg: '用户名重复', data: null })
            if (password === docs[0].password) {
                console.log('响应参数：')
                console.log({ code: 1, msg: '登录成功', data: {
                    name: docs[0].name,
                    nickname: docs[0].nickname,
                    avatar: docs[0].avatar,
                    role: docs[0].role
                } })
                res.send({ code: 1, msg: '登录成功', data: {
                    name: docs[0].name,
                    nickname: docs[0].nickname,
                    avatar: docs[0].avatar,
                    role: docs[0].role,
                    token: 'token123'
                } })
            } else {
                console.log({ code: 0, msg: '用户名或密码不正确', data: null })
                res.send({ code: 0, msg: '用户名或密码不正确', data: null })
            }
        }
    });
})

// 登出
router.post('/logout', (req, res) => {
    console.log(1)
    let { name } = req.body;
    userModel.find({ name, name }, (error, docs) => {
        if (error) {
            console.log('报错信息：')
            console.log(error)
            res.send({ code: 0, msg: error.errmsg, data: null })
        } else {
            if (docs.length === 0) return res.send({ code: 0, msg: '用户名不存在', data: null })
            if (docs.length > 1) return res.send({ code: 0, msg: '用户名重复', data: null })
            console.log({ code: 1, msg: '登出成功', data: null })
            res.send({ code: 1, msg: '登出成功', data: null })
        }
    });
})

module.exports = router