import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

export const register = async (req, res) => {
  const { firstName, lastName, address, email, password } = req.body;

  if (!firstName || !lastName || !address || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing Credentials" });
  }

  try {
    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      firstName,
      lastName,
      address,
      email,
      password: hashedPassword,
    });

    await user.save();

    //Cookie
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Register Success, Welcome to Sushi House!",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Error register, ${error.message}` });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing Creedentials" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ success: true, message: "Login Success" });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Login Failed" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      //in env if changed to production the strict mode will be removed
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logged Out Successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Logout Error" });
  }
};

export const passwordReset = async (req, res) => {
  const { OTP, email, newPassword } = req.body;

  if (!OTP || !email || !newPassword) {
    res.status(400).json({ success: false, message: "Missing Credentials" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Error Reseting Password" });
  }
};

export const updateProfile = async (req, res) => {
  const { firstName, lastName, address, email } = req.body;
  const userId = req.userId;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.address = address;
    user.email = email;
    await user.save();
    res.status(200).json({ success: true, message: "Profile Updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to updated profile" });
  }
};

//Checks if the user is authenitcated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
