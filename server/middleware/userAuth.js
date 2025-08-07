import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "User Not Authorized, Please Login",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken.id) {
      return res.status(401).status({
        success: false,
        message: "User Not Authorize, Please Login",
      });
    }

    req.userId = decodedToken.id;
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `userAuth Error: ${error.message}`,
    });
  }
};

export default userAuth;
