const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const nodemailer = require('nodemailer');
const JWT = "Ashwani is a good man";
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("gender").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success=false; 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success,error: "This Email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
        gender: req.body.gender
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const hashcode = jwt.sign(data, JWT);
    
      success=true;
      res.status(200).json(hashcode);
     
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error Occured");
    }
  }
);
//sendMail
router.post('/sendmail', async (req, res) => {
  const {name,email,message}=req.body;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure:false,
    auth: {
      user: 'ashwanix2749@gmail.com',
      pass: 'jvhuuryeuxcyecks'
    }
  });
  let mailOptions = {
    from: "ashwanix2749@gmail.com",
    to: email,
    subject: 'Email from '+ "Ashwani",
    text:message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(400).json({});
    } else {
      res.status(200).json({});
    }
  })})
//login
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be Blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false;
        return res.status(400).send({ success,error: "Please login with correct credentials" });
      }
      const passcomp = await bcrypt.compare(password, user.password);
      if (!passcomp) {
        success=false;
        return res.status(400).send({success,error: "Plese login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id
        }
      }
      const hashcode = jwt.sign(data, JWT);
      success=true;
      res.json({ success,hashcode });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error Occured");
    }
  }
);
//fetchUser
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("password")
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error Occured");
  }
});
module.exports = router;
