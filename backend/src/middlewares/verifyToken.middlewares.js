import { auth } from "../config/firebase.js";

export const verifyToken = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).send({ message: "No token provided." });
    }

    const token = header.split(" ")[1];

    const decodedToken = await auth.verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      // include other info if needed
    };

    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized", error: error.message });
  }
};
