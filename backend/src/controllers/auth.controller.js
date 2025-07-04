import { OTP } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import { sendOTPEmail } from "../utils/sendEmail.js";
import bcrypt from "bcrypt";

export const sendOTP = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "Email not registered." });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await OTP.create({ email, otp });

  try {
    await sendOTPEmail(email, otp);
    res.status(200).json({ message: "OTP sent to email." });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP." });
  }
};

export const verifyOTPAndReset = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const valid = await OTP.findOne({ email, otp });
  if (!valid) return res.status(400).json({ message: "Invalid or expired OTP." });

  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashed });

  await OTP.deleteMany({ email }); // clean old OTPs
  res.status(200).json({ message: "Password reset successful." });
};
