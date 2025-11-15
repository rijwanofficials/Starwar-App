const { UserModel } = require("../../../models/userSchema");

const getProfileController = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ isSuccess: false, message: "User not found" });

    res.status(200).json({ isSuccess: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ isSuccess: false, message: "Internal Server Error" });
  }
};
module.exports = { getProfileController };
