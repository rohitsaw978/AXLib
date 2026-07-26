
const  {UserModel} = require("../model/UserModel");
const  {ContactModel} = require("../model/ContactModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const {OtpModel} = require("../model/OtpModel");
const userController = {};
const axios = require("axios");




userController.userRegistration = async (req, res) => {
    try {
        const { name, email, password, stream, year,role } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            name,
            email,
            password: hashedPassword,
            stream,
            year,
            role
        });
// console.log(user);
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

userController.login = async (req,res)=>{

    try {
        const {email,password} = req.body;
        // console.log(req.body);
        // const email="abc@gmail.com";
        // const password="123";
        const user = await UserModel.findOne({ email });
        // console.log(user);
        // console.log("print")
        // console.log(user);
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
          }

          if (user.isGoogleUser) {
  return res.status(400).json({
    success: false,
    message: "This account was created with Google. Please sign in with Google.",
  });
}

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
          }
          const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
          };
          const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
          res.json({ message: "Login successful", token, user: { name: user.name, email: user.email, role: user.role } });
        //   res.json({ message: "Login successful"});
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

userController.googleLogin = async (req, res) => {
  try {
    const { access_token } = req.body;

    // Google se user ki information lo
    const googleResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { name, email, picture } = googleResponse.data;

    // User already exist?
    let user = await UserModel.findOne({ email });

    if (!user) {
      // Naya Google user create karo
      user = await UserModel.create({
        name,
        email,
        password: "",
        role: "user",
        stream: "",
        year: null,
        isGoogleUser: true,
      });
    }

    // JWT Token
    const payload = {
  id: user._id,
  email: user.email,
  name: user.name,
  role: user.role,
};

const token = jwt.sign(payload, JWT_SECRET, {
  expiresIn: "24h",
});

    return res.status(200).json({
      success: true,
      token,
      user,
      picture,
    });

  } catch (err) {
    console.error("Google Login Error:", err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      message: "Google Login Failed",
    });
  }
};

userController.getUsers = async (req,res) => {
    try {
    const user = await UserModel.find({},"-password");
    const totalUser = user.length;
    res.status(200).json({error:false,message:"users fetched successfully",user,totalUser});        
    } catch (error) {
        res.status(500).json({error:false,message:"internal server error",error:error.message})
    }
}

userController.profile =async (req,res) => {
    try {
        const {id} = req.userInfo;
    const user = await UserModel.findById(id).select("-password");
    if(!user){
        return res.status(404).json({error:true,message:"no such user"});
    }
    res.json({error:false,message:"user fetched successfully",user});
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        res.status(500).json({error:true,message:"Internal Server error"})
    }
    

}

userController.addContact = async(req,res) => {
    const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newContact = new ContactModel({ name, email, subject, message });
    await newContact.save();
    // console.log(' Contact saved to DB:', newContact);

    res.status(200).json({ success: true, message: 'Your message has been sent! We will get back to you soon.' });
  } catch (error) {
    console.error('Error saving contact:', error.message);
    res.status(500).json({ error: 'Server error while saving message' });
  }

}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


userController.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OtpModel.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP for Password Reset",
      html: `<p>Your OTP is <strong>${otp}</strong>. It is valid for 10 minutes.</p>`,
    });

    res.json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


userController.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const record = await OtpModel.findOne({ email });
    if (!record || record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const otpAge = (new Date() - new Date(record.createdAt)) / (1000 * 60);
    if (otpAge > 10) return res.status(400).json({ message: "OTP expired" });

    res.json({ message: "OTP verified" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


userController.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.findOneAndUpdate({ email }, { password: hashedPassword });
    await OtpModel.deleteOne({ email }); // Clean up OTP

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete User / Librarian
userController.deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User Not Found",
      });
    }

    res.status(200).json({
      error: false,
      message: "User Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};



// Save Feedback
userController.addFeedback = async (req, res) => {
  try {
    const feedback = await ContactModel.create(req.body);

    res.status(201).json({
      error: false,
      message: "Feedback Sent",
      feedback,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

// Get All Feedback
userController.getFeedback = async (req, res) => {
  try {
    const feedback = await ContactModel.find().sort({ createdAt: -1 });

    res.json({
      error: false,
      feedback,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

// Delete Feedback
userController.deleteFeedback = async (req, res) => {
  try {
    await ContactModel.findByIdAndDelete(req.params.id);

    res.json({
      error: false,
      message: "Feedback Deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};


module.exports = {userController}