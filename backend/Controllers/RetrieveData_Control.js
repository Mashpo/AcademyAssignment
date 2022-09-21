var user = require("../Models/accounts")

function GetUserData (req, res) {

    //Unpack Data
    let username = req.body.username
    let getWhich = req.body.getWhich

    user.GetUserData(username, getWhich, (err, results)=>{
        res.send({UserData: results})
    })

}

function getAllExceptSelf (req, res) {

    //Unpack Data
    let username = req.body.username

    user.getAllExceptSelf(username, (err, results)=>{
        res.send({UserData: results})
    })

}

function getAllG (req, res) {

    user.getAllG((err, results)=>{
        res.send({errMsg: err, GroupData: results})
    })

}

function getAllKBApp (req, res) {

    user.getAllKBApp((err, results)=>{
        res.send({errMsg: err, KBAppData: results})
    })

}

function getAllKBPlan (req, res) {

    user.getAllKBPlan((err, results)=>{
        res.send({errMsg: err, KBPlanData: results})
    })

}

module.exports = {GetUserData, getAllExceptSelf, getAllG, getAllKBApp, getAllKBPlan}