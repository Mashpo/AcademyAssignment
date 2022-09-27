// NPM modules
var mysql = require('mysql');
// Custom modules
const DATABASECONNECTION = require("./db_config");
var bcrypting = require("../Controllers/security/bcrypting");
const { response } = require('express');

// Creating db connection
var db = mysql.createConnection(DATABASECONNECTION);

module.exports.getOneUser = (username, callback) => {

    // Query
    let query = mysql.format(
        'select * from accounts where username = ?',
        [username]
        )

    // Querying
    db.query(query, (err,result)=>{
        //Error
        if (err) {
            response.send(err.sqlMessage);
        }
        
        //No user found
        if (result.length === 0) {
            return callback(null, false)
        }

        // //If user found
        // if (result.length === 1) {
        //     let user = result[0]
        //     callback(null, user)
        // }
    })
}

module.exports.checkLogin = (username, password, callback) => { 
    // console.log(username)
    let query =  `SELECT * FROM accounts WHERE username = '${username}'`;

    db.query(query, (err, results) => {
        //error handling
        if(err){
            console.log(err);
        }

        //if user found
        if(results.length === 1) {
            let user = results[0]
            let hashed_password = user.password


            let bcrypt_res = bcrypting.compare_passwords(password, hashed_password)

            //User account inactive
            if (bcrypt_res === true && user.active_status === 0)
            {
            console.log("User account inactive")
            return callback(22, false)
            }

            //correct username/password && active
            if (bcrypt_res === true && user.active_status === 1)
                {
                console.log("login successful")
                return callback(null, user)
            }
            // Incorrect password
            else {
                console.log("login unsuccessful")
                return callback(err, false)
            }
        
        }
        // Incorrect username
        else {
            console.log("login unsuccessful")
            return callback(err, false)
        }
    })
    
}

module.exports.getCurrentGroup_Admin = (username, callback) => {

    // Query
    let query = mysql.format(
        'select group_name from accounts where username = ?',
        [username]
        )

    // Querying
    db.query(query, (err,result)=>{
        //Error
        if (err) {
            callback(err.sqlMessage, null);
        } 

        //No user group found
        if (result.length === 0) {
            callback(null, false)
        }

        let user = result[0]
        let user_groups = user.group_name

        //User group found
        if (user_groups.includes("admin")) {
            callback(null, true)
        }

        else  {
            callback(null, false)
        }

    })
}

module.exports.getPermitCheck = (username, permitToCheck, callback) => {

    // Query
    let query = mysql.format(
        'select group_name from accounts where username = ?',
        [username]
        )

    // Querying
    db.query(query, (err,result)=>{
        //Error
        if (err) {
            callback(err.sqlMessage, null);
        } 

        //No user group found
        if (result.length === 0) {
            callback(null, false)
        }
        
        let user = result[0]
        let user_groups = user.group_name

        //User group found
        if (user_groups.includes(permitToCheck)) {
            callback(null, true)
        }

        else if(!user_groups.includes(permitToCheck)) {
            callback(null, false)
        }

    })
}

module.exports.GetUserData = (username, getWhich, callback) => {

     // Query
     let query = mysql.format(
        'select ' + getWhich + ' from accounts where username = ?',
        [username]
    )

    // Querying
    db.query(query, (err,result)=>{
        //Error
        if (err) {
            callback(err.sqlMessage, null);
        } 
        else{
           callback(null, result[0])
        }
    })
}

module.exports.getAllExceptSelf = (username, callback) => {

    // Query
    let query = mysql.format(
        `SELECT * FROM accounts where username != ?`,
       [username]
   )

   // Querying
   db.query(query, (err,result)=>{
       //Error
       if (err) {
           callback(err.sqlMessage, null);
       } 
       else{
          callback(null, result)
       }
   })
}

module.exports.updateOwnEmail = (username, email, callback) => {
    
     // Query
     let query = mysql.format(
        'UPDATE accounts SET email=? WHERE username=?',
        [email, username]
    )

    // Querying
    db.query(query, (err,result)=>{
        if (err) {
            callback(err.sqlMessage, false);
        } else {
            callback(null, true)
        }
    })  
}

module.exports.updateOwnPassword = (username, hashedpassword, callback) => {
    
    // Query
    let query = mysql.format(
       'UPDATE accounts SET password=? WHERE username=?',
       [hashedpassword, username]
   )

   // Querying
   db.query(query, (err,result)=>{
       if (err) {
           callback(err.sqlMessage, false);
       } else {
           callback(null, true)
       }
   })  
}

module.exports.updateAllUsers = (username, password, email, active_status, group_name, callback) => {
    
    //String and variables if required
    var set_fields = []
    var set_vars = []
   
    // Password
    if(password){
        set_fields.push("password = ?")
        set_vars.push(password)
    }
    
    //Email
    if(email){
        set_fields.push("email = ?")
        set_vars.push(email)
    }

    //Active Status
    if(active_status){
        set_fields.push("active_status = ?")
        set_vars.push(active_status)
    }

    //Group Name
    if(group_name){
        set_fields.push("group_name = ?")
        set_vars.push(group_name)
    }

    if(!group_name){
        group_name=""
        set_fields.push("group_name = ?")
        set_vars.push(group_name)
    }
    
    set_vars.push(username)

    let query = mysql.format(
        "UPDATE nodelogin.accounts SET " + set_fields.toString() + " WHERE username = ?",
        set_vars
    )

    db.query(query, (err,result)=>{
        if (err) {
            callback(err.sqlMessage, false);
        } else {
            callback(null, true)
        }
        
    })
}

module.exports.EditKBApp = (ActiveApp,AppDescription,AppStartDate,AppEndDate,AppPermit_Create,AppPermit_Open,AppPermit_toDoList,AppPermit_Doing,AppPermit_Done, callback) => {
    
    //String and variables if required
    var set_fields = []
    var set_vars = []
    
    //App_Description
    if(AppDescription){
        set_fields.push("App_Description = ?")
        set_vars.push(AppDescription)
    }
    if(!AppDescription){
        AppDescription = ""
        set_fields.push("App_Description = ?")
        set_vars.push(AppDescription)
    }

    //App_startDate
    if(AppStartDate){
        set_fields.push("App_startDate = ?")
        set_vars.push(AppStartDate)
    }

    //App_endDate
    if(AppEndDate){
        set_fields.push("App_endDate = ?")
        set_vars.push(AppEndDate)
    }

    //App_permit_Create
    if(AppPermit_Create){
        set_fields.push("App_permit_Create = ?")
        set_vars.push(AppPermit_Create)
    }

    //App_permit_Open
    if(AppPermit_Open){
        set_fields.push("App_permit_Open = ?")
        set_vars.push(AppPermit_Open)
    }

    //App_permit_toDoList
    if(AppPermit_toDoList){
        set_fields.push("App_permit_toDoList = ?")
        set_vars.push(AppPermit_toDoList)
    }

    //App_permit_Doing
    if(AppPermit_Doing){
        set_fields.push("App_permit_Doing = ?")
        set_vars.push(AppPermit_Doing)
    }

    //App_permit_Done
    if(AppPermit_Done){
        set_fields.push("App_permit_Done = ?")
        set_vars.push(AppPermit_Done)
    }

    set_vars.push(ActiveApp)

    let query = mysql.format(
        "UPDATE nodelogin.application SET " + set_fields.toString() + " WHERE App_Acronym = ?",
        set_vars
    )

    console.log(query)

    db.query(query, (err,result)=>{
        if (err) {
            callback(err.sqlMessage, false);
        } else {
            callback(null, true)
        }
        
    })
}

module.exports.updateTaskState_LeftRightBTN = (Username, Task_name, TaskStateToSet, Task_notes_updated, callback) => {
    
    // Query
    let query = mysql.format(
       'UPDATE task SET Task_owner=?, Task_state=?, Task_notes=? WHERE Task_name=?',
       [Username, TaskStateToSet, Task_notes_updated, Task_name]
   )

   // Querying
   db.query(query, (err,result)=>{
       if (err) {
           callback(err.sqlMessage, false);
       } else {
           callback(null, true)
       }
   })  
}

module.exports.updateAppRnumber = (App_Rnumber, TaskAppAcronym, callback) => {
    
    // Query
    let query = mysql.format(
       'UPDATE application SET App_Rnumber=? WHERE App_Acronym=?',
       [App_Rnumber, TaskAppAcronym]
   )

   // Querying
   db.query(query, (err,result)=>{
       if (err) {
           callback(err.sqlMessage, false);
       } else {
           callback(null, true)
       }
   })  
}

module.exports.insertG = (newGroup, callback) => {
   
    // Query
    let query = mysql.format(
        'INSERT INTO user_group(group_name, group_active_status) VALUES (?, "1")',
        [newGroup]
    )
 
    // Querying
    db.query(query, (err, result)=>{

        if (err === null) {
            return callback(null, true)
        }

        if (err.errno === 1062) {
            return callback("duplicated", false)
        }

        if (err && !err.errno === 1062) {
            callback(err.sqlMessage, false);
        }
        
    })  
}

module.exports.insertCreatedUser = (username, password, email, active_status, group_name, callback) => {

    // Query
    let query = mysql.format(
        'INSERT INTO accounts(username, password, email, active_status, group_name) VALUES (?, ?, ?, ?, ?)',
        [username, password, email, active_status, group_name]
    )
 
    // Querying
    db.query(query, (err,result)=>{

            if (err === null) {
                return callback(null, true)
            }

            if (err.errno === 1062) {
                return callback("duplicated", false)
            }

            if (err && !err.errno === 1062) {
                callback(err.sqlMessage, false);
            }
            
        })  
}

module.exports.CreateKBApp = (AppAcronym,AppDescription,AppRNumber,AppStartDate,AppEndDate,AppPermit_Create,AppPermit_Open,AppPermit_toDoList,AppPermit_Doing,AppPermit_Done, callback) => {

    // Query
    let query = mysql.format(
        'INSERT INTO application(App_Acronym,App_Description,App_Rnumber,App_startDate,App_endDate,App_permit_Create,App_permit_Open,App_permit_toDoList,App_permit_Doing,App_permit_Done) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [AppAcronym,AppDescription,AppRNumber,AppStartDate,AppEndDate,AppPermit_Create,AppPermit_Open,AppPermit_toDoList,AppPermit_Doing,AppPermit_Done]
    )
 
    // Querying
    db.query(query, (err,result)=>{

            if (err === null) {
                return callback(null, true)
            }

            if (err.errno === 1062) {
                return callback("duplicated", false)
            }

            if (err && !err.errno === 1062) {
                callback(err.sqlMessage, false);
            }
            
        })  
}

module.exports.CreateKBPlan = (PlanMVPName,PlanStartDate,PlanEndDate,PlanAppAcronym, callback) => {

    // Query
    let query = mysql.format(
        'INSERT INTO plan(Plan_MVP_name,Plan_startDate,Plan_endDate,Plan_app_Acronym) VALUES (?, ?, ?, ?)',
        [PlanMVPName,PlanStartDate,PlanEndDate,PlanAppAcronym]
    )
 
    // Querying
    db.query(query, (err,result)=>{

            if (err === null) {
                return callback(null, true)
            }

            if (err.errno === 1062) {
                return callback("duplicated", false)
            }

            if (err && !err.errno === 1062) {
                callback(err.sqlMessage, false);
            }
            
        })  
}

module.exports.CreateKBTask = (TaskName,TaskDescription,TaskNotes,TaskID,TaskPlan,TaskAppAcronym,TaskState,TaskCreator,TaskOwner,TaskCreateDate, callback) => {

    // Query
    let query = mysql.format(
        'INSERT INTO task(Task_name,Task_description,Task_notes,Task_id,Task_plan,Task_app_Acronym,Task_state,Task_creator,Task_owner,Task_createDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [TaskName,TaskDescription,TaskNotes,TaskID,TaskPlan,TaskAppAcronym,TaskState,TaskCreator,TaskOwner,TaskCreateDate]
    )

    // Querying
    db.query(query, (err,result)=>{

            if (err === null) {
                return callback(null, true)
            }

            if (err.errno === 1062) {
                return callback("duplicated", false)
            }

            if (err && !err.errno === 1062) {
                callback(err.sqlMessage, false);
            }
            
        })  
}

module.exports.getAllG = (callback) => {

    // Query
    let query = mysql.format(
        `SELECT group_name FROM user_group`
    )
 
    // Querying
    db.query(query, (err, result) => {
        if (err) {
            callback(err.sqlMessage, null);
        } else {
            callback(null, result)
        }
    })
}

module.exports.getAllKBApp = (callback) => {

    // Query
    let query = mysql.format(
        `SELECT App_Acronym,App_Description,App_Rnumber,App_startDate,App_endDate,App_permit_Create,App_permit_Open,App_permit_toDoList,App_permit_Doing,App_permit_Done FROM application`
    )
 
    // Querying
    db.query(query, (err, result) => {
        if (err) {
            callback(err.sqlMessage, null);
        } else {
            callback(null, result)
        }
    })
}

module.exports.getAllKBPlan = (callback) => {

    // Query
    let query = mysql.format(
        `SELECT Plan_MVP_name, Plan_startDate, Plan_endDate, Plan_app_Acronym FROM plan`
    )
 
    // Querying
    db.query(query, (err, result) => {
        if (err) {
            callback(err.sqlMessage, null);
        } else {
            callback(null, result)
        }
    })
}

module.exports.getAllKBTask = (callback) => {

    // Query
    let query = mysql.format(
        `SELECT Task_name, Task_description, Task_notes, Task_id, Task_plan, Task_app_Acronym, Task_state, Task_creator, Task_owner, Task_createDate FROM task`
    )
 
    // Querying
    db.query(query, (err, result) => {
        if (err) {
            callback(err.sqlMessage, null);
        } else {
            callback(null, result)
        }
    })
}