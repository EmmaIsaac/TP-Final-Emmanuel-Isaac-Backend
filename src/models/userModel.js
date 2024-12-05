import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcypt from "bcryptjs";

process.loadEnvFile();
const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("user", userSchema);

const register = async (dataUser) => {
  try {
    const user = await User.findOne({ username: dataUser.username });
    if (user) {
      throw new Error("El usuario ya existe");
    }

    const hashedPassword = await bcypt.hash(dataUser.password, 10);

    const newUser = new User({
      username: dataUser.username,
      password: hashedPassword,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

const login = async (dataUser) => {
  try {
    const user = await User.findOne({ username: dataUser.username });
    const validPassword = await bcypt.compare(dataUser.password, user.password);

    if (!user || !validPassword) {
      throw new Error("El usuario o la contraseña son incorrectos");
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    return token;
  } catch (error) {
    throw error;
  }
};

export default { User, register, login };
