const express = require('express')
const router = express.Router()
const applyModel = require('./db_applys.js')
const moment = require('moment')

router.use(function timeLog (req, res, next) {
    console.log('=====================================================')
    console.log('Time: ', Date.now())
    console.log('请求参数：');
    console.log(req.baseUrl)
    console.log(req.method)
    console.log(req.body)
    // 解决跨域
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Token");
    next()
})

// 添加申请
router.post('/addApply', (req, res) => {
    //利用model对象对数据进行增删改查
    //增加（注意：这里增加是create而不是insert）
    let { name, age, sex, course, school, phone, parentsName, relationship, parentsPhone, mail, message  } = req.body;
    applyModel.create({ name, age, sex, course, school, phone, parentsName, relationship, parentsPhone, mail, message, createTime: moment().format('YYYY-MM-DD hh:mm:ss'), status: '0', desc: '' }, (error, doc) => {
        if (error) {
            console.log('报错信息：')
            console.log(error)
            res.send({ code: 0, msg: error.errmsg, data: null })
        } else {
            console.log('响应参数：')
            console.log(doc)
            res.send({ code: 1, msg: '申请报名成功', data: null })
        }
    });
})

// 删除申请
router.post('/removeApply', (req, res) => {
    applyModel.deleteOne({ _id: req.body.id }, (err, result) => {
        if (err) {
            console.log('报错信息：')
            console.log(err.errmsg);
            res.send({ code: 0, msg: err.errmsg, data: null })
        } else {
            console.log('响应参数：')
            if (result.deletedCount) {
                console.log({ code: 1, msg: '删除报名表成功', data: null })
                res.send({ code: 1, msg: '删除报名表成功', data: null })
            } else {
                console.log({ code: 1, msg: '删除报名表成功', data: null })
                res.send({ code: 0, msg: '您要删除的数据不存在', data: null })
            }
        }
    })
})

// 修改申请表
router.post('/updateApply', (req, res) => {
    applyModel.update({ _id: req.body.id,}, req.body, { multi: true }, (err, result) => {
        console.log('响应参数：')
        if (err) {
            console.log('修改申请表信息失败' + err.errmsg)
            res.send({ code: 0, msg: err.errmsg, data: null })
        } else {
            console.log({ code: 1, msg: '修改申请表信息成功', data: null })
            res.send({ code: 1, msg: '修改申请表信息成功', data: null })
        }
    })
})

// 查询申请表
router.post('/queryApply', (req, res) => {
    if (req.body.name && req.body.phone) {
        applyModel.find({ phone: req.body.phone, name: req.body.name }, (err, docs) => {
            console.log('响应参数：')
            if (err) {
                console.log('查询申请表信息失败' + err.errmsg)
                res.send({ code: 0, msg: err.errmsg, data: null })
            } else {
                console.log({ code: 1, msg: '查询申请表信息成功', data: docs })
                res.send({ code: 1, msg: '查询申请表信息成功', data: docs })
            }
        })
    } else if (req.body.phone) {
        applyModel.find({ phone: req.body.phone }, (err, docs) => {
            console.log('响应参数：')
            if (err) {
                console.log('查询申请表信息失败' + err.errmsg)
                res.send({ code: 0, msg: err.errmsg, data: null })
            } else {
                console.log({ code: 1, msg: '查询申请表信息成功', data: docs })
                res.send({ code: 1, msg: '查询申请表信息成功', data: docs })
            }
        })
    } else if (req.body.name) {
        applyModel.find({ name: req.body.name }, (err, docs) => {
            console.log('响应参数：')
            if (err) {
                console.log('查询申请表信息失败' + err.errmsg)
                res.send({ code: 0, msg: err.errmsg, data: null })
            } else {
                console.log({ code: 1, msg: '查询申请表信息成功', data: docs })
                res.send({ code: 1, msg: '查询申请表信息成功', data: docs })
            }
        })
    } else {
        applyModel.find({}, (err, docs) => {
            console.log('响应参数：')
            if (err) {
                console.log('查询申请表信息失败' + err.errmsg)
                res.send({ code: 0, msg: err.errmsg, data: null })
            } else {
                console.log({ code: 1, msg: '查询申请表信息成功', data: docs })
                res.send({ code: 1, msg: '查询申请表信息成功', data: docs })
            }
        })
    }
})

module.exports = router