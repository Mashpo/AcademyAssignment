const { response } = require("express")
var user = require("../Models/accounts")
/* */
function CheckGroup (username, callback) {
   
    user.getCurrentGroup_Admin(username, (err, check_res)=>{
        callback(null, check_res)
    })
   
}

function getPermitCheck (req, res) {

    let username = req.body.username
    let permitToCheck = req.body.permitToCheck
   
    user.getPermitCheck(username, permitToCheck, (err, check_res)=>{
        res.send({errMsg: err, PermitBoolean: check_res})
    })
   
}

module.exports = {CheckGroup, getPermitCheck}