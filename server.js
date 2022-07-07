const express = require("express");
const dotenv = require("dotenv");
const app = express();

const nodemailer = require("nodemailer");

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/contactform.html");
});

app.post("/", (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth : {
      user:'tempmail@gmail.com',
      pass:'12345@#&'
    }
  })

  const mailOptions = {
    from:req.body.email,
    to:'tempmail',
    subject:`Message from ${req.body.email}: ${req.body.subjetc}`,
    text:req.body.message
  }

  transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
      console.log(error);
      res.send(error);
    }
    else{
      console.log('Email sent :' + info.response);
      res.send('success');
    }
  })

});

app.listen(PORT, () => {
  console.log(`Server is running at Port ${PORT}`);
});
