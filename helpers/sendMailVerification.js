const nodemailer = require("nodemailer");
module.exports = async (email, n) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rubawahishi@gmail.com",
      pass: "beyourselfmeme"
    }
  });
  const mailOptions = {
    from: "rubawahishi@email.com", // sender address
    to: email, // list of receivers
    subject: "Community", // Subject line
    html: `<h3> Verification Email </h3>
      <p> please enter this number to verify${n} </p>` // plain text body
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};
