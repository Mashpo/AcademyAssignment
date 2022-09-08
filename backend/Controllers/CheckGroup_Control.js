const { response } = require("express")
var user = require("../Models/accounts")
/* */
function CheckGroup (username, callback) {
   
    user.getCurrentGroup(username, (err, check_res)=>{
        callback(null, check_res)
    })
   
}

module.exports = {CheckGroup}