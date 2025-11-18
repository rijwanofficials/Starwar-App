const Brevo = require("@getbrevo/brevo");

let emailAPI = new Brevo.TransactionalEmailsApi();
emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

const sendEmail = async (toEmail, subject, htmlText, textText) => {
  try {
    const sendSmtpEmail = {
      sender: { name: "From Star Wars Team Creator Rijwan", email: "husainrijwan2001@gmail.com" },
      to: [{ email: toEmail }],
      subject,
      htmlContent: htmlText,
      textContent: textText,
    };

    const response = await emailAPI.sendTransacEmail(sendSmtpEmail);

    console.log("📧 Email sent successfully:", response?.messageId || response);
    return { success: true, response };
  } catch (error) {
    console.error("❌ Brevo Email Error");

    if (error?.response?.body) {
      console.error("API Error Body:", error.response.body);

      return {
        success: false,
        message: error.response.body.message || "Brevo API error occurred",
        details: error.response.body,
      };
    }
    if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      console.error("➡ Network Error:", error.code);
      return {
        success: false,
        message: "Network error: cannot reach Brevo servers",
        details: error.code,
      };
    }
    console.error("➡ Unknown Error:", error.message);
    return {
      success: false,
      message: error.message || "Unknown email error",
    };
  }
};

module.exports = { sendEmail };
