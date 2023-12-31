const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const OTPCode = require("../models/OtpCode");
const transporter = require("../utilities/transporter");
require("dotenv").config();


/////// 6 DIGIT CODE GENERATOR
// const generateOTPCode = () => {
//     const digits = "0123456789";
//     let otpCode = "";
//     for (let i = 0; i < 6; i++) {
//       otpCode += digits[Math.floor(Math.random() * 10)];
//     }
//     return otpCode;
//   };

  // const registerUser = async (req, res) => {
  //   const { fullname,username, email, password } = req.body;
  
  //   try {
  //     // Check if the user with the given email already exists
  //     let user = await User.findOne({ email });
  
  //     if (user) {
  //       if (user.verifiedEmail) {
  //         // User already exists and is verified
  //         return res.status(400).json({
  //           status: 'fail',
  //           message: 'Email Exist, use another one',
  //         });
  //       // } else {

  //         // User exists but is not verified
  //         // Resend OTP for account verification
  //         // const otpCode = generateOTPCode();
  
  //         // Set the expiration time to 10 minutes from now
  //         // const expirationTime = new Date(Date.now() + 10 * 60 * 1000);
  
  //         // // Save OTP code to the database
  //         // const otpCodeRecord = new OTPCode({
  //         //   userId: user._id,
  //         //   code: otpCode,
  //         //   createdAt: Date.now(),
  //         //   expiresAt: expirationTime,
  //         // });
  //         // await otpCodeRecord.save();
  
  //         // Prepare and send the email using the transporter and sendEmail function
  //         // const mailOptions = {
  //         //   from: process.env.AUTH_EMAIL,
  //         //   to: user.email,
  //         //   subject: 'Verify Your Email',
  //         //   html: `
  //         //     <h1>Email Verification</h1>
  //         //     <h3>Welcome ${fullname}, </h3>
  //         //     <p>Please enter the verification code to continue.</p>
  //         //     <h2><strong>${otpCode}</strong></h2>
  //         //   `,
  //         // };
  
  //         // await transporter.sendMail(mailOptions);
  
  //         // return res.status(200).json({
  //         //   status: 'success',
  //         //   message: 'Account already registered, new OTP sent for verification.',
  //         // });
  //       }
  //     }
  
  //     // If the user does not exist, create a new user and set their verified status to false
  //     const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
  //     const newUser = new User({
  //       fullname,
  //       username,
  //       email, // Ensure email uniqueness is enforced in your database schema
  //       password: hashedPassword,
  //       verifiedEmail: false,
  //     });
  
  //     const savedUser = await newUser.save();

  //     const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SEC_KEY, {
  //       expiresIn: "24h",
  //     });
      
  
  //     // Send OTP code to the user's email
  //     // const otpCode = generateOTPCode();
  
  //     // Set the expiration time to 10 minutes from now
  //     // const expirationTime = new Date(Date.now() + 10 * 60 * 1000);
  
  //     // // Save OTP code to the database
  //     // const otpCodeRecord = new OTPCode({
  //     //   userId: savedUser._id,
  //     //   code: otpCode,
  //     //   createdAt: Date.now(),
  //     //   expiresAt: expirationTime,
  //     // });
  //     // await otpCodeRecord.save();

      
  
  //     // Prepare and send the email using the transporter and sendEmail function
  //     // const mailOptions = {
  //     //   from: process.env.AUTH_EMAIL,
  //     //   to: savedUser.email,
  //     //   subject: 'Verify Your Email',
  //     //   html: `
  //     //     <h1>Email Verification</h1>
  //     //     <p> Hello, ${fullname}, Welcome to Center Kick Community. Please enter the verification code to continue.</p>
  //     //     <h3><strong>${otpCode}</strong></h3>
  //     //   `,
  //     // };
  
  //     // await transporter.sendMail(mailOptions);
  
  //     return res.status(200).json({
  //       status: 'success',
  //       // message: 'Sign up successful, OTP sent for verification.',
  //       message: 'Sign up successful, ',
  //       user_id: savedUser._id,
  //       token: token,
  //     });

  //   } catch (error) {
  //     console.error('Error while registering user:', error);
  //     return res.status(500).json({
  //       status: 'failed',
  //       message: 'An error occurred while signing up. Please try again.',
  //     });
  //   }
  // };

  const registerUser = async (req, res) => {
    const { fullname, username, email, password } = req.body;
  
    try {
      // Check if the user with the given email already exists
      let user = await User.findOne({ email });
  
      if (user) {
        if (user.verifiedEmail) {
          // User already exists and is verified
          return res.status(400).json({
            status: 'fail',
            message: 'Email already exists, please use another one.',
          });
        } else {
          // User exists but is not verified
          // You can add OTP and email verification logic here if needed
  
          // For now, let's skip OTP and verification logic
          return res.status(400).json({
            status: 'fail',
            // message: 'User created but not verified. Check your email or request a new OTP.',
            message: 'Email already exists, please use another one'
          });
        }
      }
  
      // If the user does not exist, create a new user and set their verified status to false
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
      const newUser = new User({
        fullname,
        username,
        email, // Ensure email uniqueness is enforced in your database schema
        password: hashedPassword,
        verifiedEmail: false,
      });
  
      const savedUser = await newUser.save();
  
      const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SEC_KEY, {
        expiresIn: "24h",
      });
  
      // For simplicity, skipping OTP and email verification logic here
  
      return res.status(200).json({
        status: 'success',
        message: 'Sign up successful.',
        user_id: savedUser._id,
        token: token,
      });
  
    } catch (error) {
      console.error('Error while registering user:', error);
      return res.status(500).json({
        status: 'failed',
        message: 'An error occurred while signing up. Please try again.',
      });
    }
  };
  
  
  


  

  //////////SIGN-IN USER
  const loginUser = async (req, res, next) => {
    try {
      const {  email, password } = req.body;
      if (!email) {
        return res.status(400).json({
          status: "failed",
          message: "Username or Email field is required",
        });
      }
      let user;
      if (email) {
        // If an email is provided, find the user by email
        user = await User.findOne({ email });
      }
      if (!user) {
        return res.status(404).json({
          status: "failed",
          message: "User not found",
        });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          status: "failed",
          message: "Invalid password",
        });
      }
      // Set the user's activeStatus to "online"
      // user.activeStatus = "online";
      await user.save();
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SEC_KEY, {
        expiresIn: "24h",
      });
      // Create a user details object with the desired fields
      let userDetails = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,        
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      return res.status(200).json({
        status: "success",
        message: "Successfully signed in",
        token,
        user: userDetails,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: "Internal server error",
      });
    }
  };
  
/////////////////////////// reques otp
  const requestOTP = async (req, res) => {
    const { email } = req.body;
  
    // Check if the email is provided
    if (!email) {
      return res.status(400).json({
        status: "failed",
        message: "Email cannot be blank",
      });
    }
  
    try {
      // Check if the user with the provided email exists and is unverified
      const existingUser = await User.findOne({ email, verifiedEmail: false });
  
      if (!existingUser) {
        return res.status(400).json({
          status: "failed",
          message: "User with the provided email not found or already verified.",
        });
      }
  
      // Regenerate a new OTP for the existing unverified user
      const otpCode = generateOTPCode();
      const expirationTime = new Date(Date.now() + 10 * 60 * 1000);
  
      // Save the new OTP code to the database
      const newOTPCode = new OTPCode({
        userId: existingUser._id,
        code: otpCode,
        createdAt: Date.now(),
        expiresAt: expirationTime,
      });
      await newOTPCode.save();
  
      // Resend the OTP to the user's email
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: existingUser.email,
        subject: "Verify Your Email",
        html: `
            <h1>Email Verification</h1>
            <p><strong>${otpCode}</strong></p>
            <p>Please enter the verification code in your account settings to verify your email.</p>
          `,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            status: "failed",
            message: "An error occurred while resending the verification code.",
          });
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json({
            status: "success",
            message:
              "Verification code has been resent. Please check your email.",
          });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: "An error occurred while resending the verification code.",
      });
    }
  };
  
  ///////////////////verify otp
  const verifyOTP = async (req, res) => {
    // Extract the userId and the verification code from the request body
    const { userId, verificationCode } = req.body;
  
    try {
      const otpCodeRecord = await OTPCode.findOne({ userId });
  
      if (!otpCodeRecord) {
        return res.status(400).json({
          status: "failed",
          message: "Invalid verification code.",
        });
      }
  
      if (otpCodeRecord.expiresAt < Date.now()) {
        await OTPCode.deleteOne({ userId });
        return res.status(400).json({
          status: "failed",
          message: "Verification code has expired. Please request a new one.",
        });
      }
  
      const isMatch = verificationCode === otpCodeRecord.code;
  
      if (!isMatch) {
        return res.status(400).json({
          status: "failed",
          message: "Invalid verification code.",
        });
      }
  
      // Mark the user as verified (you can add this field to your User model)
      await User.updateOne({ _id: userId }, { verifiedEmail: true });
  
      // Retrieve the user data after successful account verification
      const user = await User.findOne({ _id: userId });
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SEC_KEY, {
        expiresIn: "24h",
      });
  
      return res.status(200).json({
        status: "success",
        message: "Account verification successful.",
        token,
        user,
      });
    } catch (error) {
      console.error("Error while verifying the account:", error);
      return res.status(500).json({
        status: "failed",
        message: "An error occurred while verifying the account.",
      });
    }
  };
  
  /////// CHNGE PASSWORD
  const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId; // Make sure 'userId' matches the property name in req.user
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({
          status: 'failed',
          message: 'User not found. Please log in again.',
        });
      }
  
      // Verify the current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({
          status: 'failed',
          message: 'Invalid current password. Please enter the correct password.',
        });
      }
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      // Update the user's password
      user.password = hashedPassword;
      await user.save();
  
      return res.status(200).json({
        status: 'success',
        message: 'Password changed successfully.',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'failed',
        message: 'An error occurred while processing your request.',
      });
    }
  };
  

  //////// RESET PASSWORD 
  const resetPassword = async (req, res) => {
    const { identifier } = req.body;
  
    try {
      // Check if the provided identifier is an email, username, or phone number
      const user = await User.findOne({
        $or: [
          { email: identifier },
          { username: identifier },
          { phoneNumber: identifier },
        ],
      });
  
      if (!user) {
        return res.status(404).json({
          status: 'failed',
          message: 'User not found. Please enter a valid email, username, or phone number.',
        });
      }
  
      // Generate OTP code
      const otpCode = generateOTPCode();
  
      // Set the expiration time to 10 minutes from now
      const expirationTime = new Date(Date.now() + 10 * 60 * 1000);
  
      // Save the OTP code record in the database
      const otpCodeRecord = new OTPCode({
        userId: user._id,
        code: otpCode,
        createdAt: Date.now(),
        expiresAt: expirationTime,
      });
      await otpCodeRecord.save();
  
      // Send OTP code to user's email
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: user.email,
        subject: 'Password Reset OTP',
        html: `
          <h1>Password Reset OTP</h1>
          <p><strong>${otpCode}</strong></p>
          <p>Please enter the OTP code to reset your password.</p>
        `,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  
      return res.status(200).json({
        status: 'success',
        message: 'OTP code has been sent to your email. Please check your inbox.',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'failed',
        message: 'An error occurred while processing your request.',
      });
    }
  };
  

  //////// VERIFY PSSWORD RESET OTP
  const verifyPasswordOtp = async (req, res) => {
    const { userId, email, otpCode } = req.body;
  
    try {
      // Find the user by email or userId
      const user = await User.findOne({ $or: [{ email }, { _id: userId }] });
  
      if (!user) {
        return res.status(404).json({
          status: 'failed',
          message: 'User not found. Please enter a valid email address or userId.',
        });
      }
  
      // Find the OTP code record associated with the user
      const otpCodeRecord = await OTPCode.findOne({ userId: user._id, code: otpCode });
  
      if (!otpCodeRecord) {
        return res.status(400).json({
          status: 'failed',
          message: 'Invalid OTP code. Please enter the correct code.',
        });
      }
  
      // Check if the OTP code has expired
      if (otpCodeRecord.expiresAt < Date.now()) {
        // If the OTP code has expired, delete the OTP record and inform the user
        await OTPCode.deleteOne({ userId: user._id });
  
        return res.status(400).json({
          status: 'failed',
          message: 'OTP code has expired. Please request a new one.',
        });
      }
  
      // If the OTP code is valid and not expired, proceed with the reset password flow
      return res.status(200).json({
        status: 'success',
        message: 'Valid OTP code. You can now proceed to reset your password.',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'failed',
        message: 'An error occurred while processing your request.',
      });
    }
  };
  
  ////// CHANGE BPASSWORD 
  const newPassword = async (req, res) => {
    const { email, username, phoneNumber, newPassword } = req.body;
  
    try {
      // Find the user by email, username, or phoneNumber
      const user = await User.findOne({
        $or: [
          { email },
          { username },
          { phoneNumber },
        ],
      });
  
      if (!user) {
        return res.status(404).json({
          status: 'failed',
          message: 'User not found. Please enter a valid email, username, or phone number.',
        });
      }
  
      // Check if the user has a valid OTP code record (OTP code has been verified)
      const otpCodeRecord = await OTPCode.findOne({ userId: user._id });
  
      if (!otpCodeRecord) {
        return res.status(400).json({
          status: 'failed',
          message: 'OTP verification is required before resetting the password.',
        });
      }
  
      // Check if the OTP code has expired
      if (otpCodeRecord.expiresAt < Date.now()) {
        // If the OTP code has expired, delete the OTP record and inform the user
        await OTPCode.deleteOne({ userId: user._id });
  
        return res.status(400).json({
          status: 'failed',
          message: 'OTP code has expired. Please request a new one.',
        });
      }
  
      // If the OTP code is valid and not expired, proceed with updating the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      // Update the user's password
      await User.updateOne({ _id: user._id }, { password: hashedPassword });
  
      // Delete the OTP record
      await OTPCode.deleteOne({ userId: user._id });
  
      return res.status(200).json({
        status: 'success',
        message: 'Password reset successful. You can now log in with your new password.',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'failed',
        message: 'An error occurred while processing your request.',
      });
    }
  };
  
  
   
  const authController = {
    loginUser,
    registerUser,
    requestOTP,
    verifyOTP,
    changePassword,
    resetPassword,
    verifyPasswordOtp,
    newPassword
  };
  
  module.exports = authController;