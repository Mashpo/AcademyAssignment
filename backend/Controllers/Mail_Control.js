const nodemailer = require("nodemailer");
const { user } = require("../Models/db_config");

// async..await is not allowed in global scope, must use a wrapper
module.exports = async (req) => {
  let mailData = req.body

  let username = mailData.Username
  let task_name = mailData.Task_name

  let message = username + " has promted " + task_name + " from Doing to Done"


  // Generate test SMTP service account from ethereal.email
  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "42103c78a43d58",
      pass: "b69d46365d8048"
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: 'powig76210@ploneix.com', // list of receivers
    subject: "Task "  + task_name + " done ✔", // Subject line
    text: message, // plain text body
  });

}

