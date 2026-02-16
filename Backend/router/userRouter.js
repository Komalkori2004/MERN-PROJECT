const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const User = require("../model/user");

const {protect,isAdmin }=require("../middlewere/protect")

require("dotenv").config();
// ========Signup========
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  const exist = await User.findOne({ email });

  if (exist) {
    return res.status(409).json({ message: "User already exist" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hash,
    role,
  });

  res.json({ message: "Signup successful" });
});

// =========Login========

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
     return res.status(401).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password,user.password);
  if (!match) {
     return  res.status(401).json({ message: "Invalid Password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  // console.log("JWT_SECRET:", process.env.JWT_SECRET);


  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});


router.get("/profile",protect, (req,res)=>{
          res.json({ message: "Welcome user",user:req.user });
})


router.get("/admin",protect,isAdmin ,(req,res)=>{
      res.json({ message: "Welcome Admin" });
})


module.exports=router