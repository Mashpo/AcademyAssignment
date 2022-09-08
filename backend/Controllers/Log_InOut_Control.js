var passport = require("passport")
var CheckGroup_Control = require("./CheckGroup_Control")

//To test passport authentication
const loginUser = (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        // Error handling
        if (!user) {
            if (err === 22) {
                res.status(400).send({message: 'Disabled'})
            }
            else {
                res.status(400).send({message: 'Incorrect'})}
            }
        // Authenticated, send username as token
        if (user) {
            req.logIn(user, (err)=> {
                // Error handling
                if (err) {next(err);}

                //Setting token data for frontend
                let username = user.username
                //Check User Group if admin
                CheckGroup_Control.CheckGroup(username, (err, check_result)=> {

                    let admin_status = check_result

                    let tokenData = {
                        username: username,
                        admin: admin_status
                    }
                    //Sending token data to frontend
                    res.status(200).send({token: tokenData})
                    })
                })
            };
        }) (req, res, next);
}

const logoutUser = (req,res,next) => {
    req.logout((err)=>{
        if (err) {return next(err);}
        console.log('Successfully logged out from backend.');
    });
}

module.exports = {loginUser, logoutUser}