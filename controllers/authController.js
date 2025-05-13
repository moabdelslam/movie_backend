 const User = require('../models/User');
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');

// exports.register = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const register = async(req,res)=>{
    const {email, name, password } =req.body;
    if (!email || !name || !password ) {
      return res.status(400).json({
        status:400,
        data: {data:null , message: "missing data"}
      })
    }

    const checkExistUser = await User.findOne ({email});
    if (checkExistUser){
      return res.status(409).json({
        status:409,
        data : {data:null , message: "user already exist"},
      })
    }

    const hashedPassword = await bcrypt.hash(password,8);
    const registeredUser = new User({
      name,
      email,
      password :hashedPassword,
    });

    await registeredUser.save();
    return res.status(201).json({
      status:201,
      data: {data:null , message :"user register success "}

    })

}; 

const login =async (req,res) => {

   const {email, password } =req.body;
    if (!email  || !password ) {
      return res.status(400).json({
        status:400,
        data: {data:null , message: "missing data"}
      })
    }

    const loggedUser =await User.findOne({email});
     if (!loggedUser) {
      return res.status(400).json({
        status:400,
        data: {data:null , message: "invalid email"}
      });
    }

    const checkPassword= await bcrypt.compare(password,loggedUser.password)

     const token = jwt.sign({
      email,
      name:loggedUser.name,
      _id:loggedUser._id,

    },process.env.SECRET_KEY);

     return res.status(201).json({
        status:201,
        data: {token , message: "login successful"}
      });

};
module.exports = {
  register,
  login,
}