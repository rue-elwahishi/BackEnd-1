const nodemailer = require("nodemailer");
module.exports = async (email, user, n) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "communityusone@gmail.com",
      pass: "community12345678"
    }
  });
  const mailOptions = {
    from: "communityusone@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Verification Code", // Subject line
    html: `<h3> Hey ${user.firstname} </h3>
      <p> please enter this number to verify + '' + ${n} </p>` // plain text body
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};
