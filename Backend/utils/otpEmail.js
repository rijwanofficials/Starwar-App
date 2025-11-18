const { sendEmail } = require("./emailHelper");

const sendOtpEmail = async (toEmail, otp) => {
  try {
    const htmlBody = `
      <div style="font-family: Arial; padding: 20px; text-align: center;">
        <h2>Your OTP Code</h2>
        <h1>${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
      </div>
    `;

    const textBody = `Your OTP is ${otp}. Valid for 10 minutes.`;

    const result = await sendEmail(toEmail, "Your OTP Code", htmlBody, textBody);

    return {
      success: true,
      message: "Email sent successfully",
      details: result
    };

  } catch (error) {
    return {
      success: false,
      message: error.message || "Email sending failed",
      details: error
    };
  }
};

module.exports = { sendOtpEmail };
