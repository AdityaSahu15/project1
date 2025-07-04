import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: `"ShopVerse Support" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your OTP for Password Reset",
    html: `
      <div style="font-family:sans-serif">
        <h2>OTP Verification</h2>
        <p>Your OTP is:</p>
        <h1 style="color:#333">${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
