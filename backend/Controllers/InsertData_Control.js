var user = require("../Models/accounts")
const bcrypting = require("./security/bcrypting")

function insertG (req, res) {
    //Unpack Data
    let newGroup = req.body.newGroup

    user.insertG(newGroup, (err, results)=>{
        // return (results)
        res.send({errMsg:err, success: results})
    })

}

async function insertCreatedUser (req, res) {

    //Unpack Data
    let username = req.body.username
    let password = req.body.password;
    let email = req.body.email
    let active_status = req.body.active_status
    let group_name = req.body.group_name
    
    //hashing
    if(password){
    password = await bcrypting.hash_password(password)
    }

    user.insertCreatedUser(username, password, email, active_status, group_name, (err, results)=>{
        res.send({errMsg:err, success: results})
    })

}

module.exports = {insertG, insertCreatedUser}
