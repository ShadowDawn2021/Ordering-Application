import userModel from "../model/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      userData: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isVerified: user.isVerified,
        _id: user._id,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `userController error: ${error.message}`,
    });
  }
};
