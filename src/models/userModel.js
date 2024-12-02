import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcypt from "bcrypt";

process.loadEnvFile();
const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      length: [4, "El nombre de usuario debe tener al menos 4 caracteres"],
    },
    password: {
      type: String,
      required: true,
      length: [8, "La contraseña debe tener al menos 8 caracteres"],
    },
  },
  { versionKey: false }
);

const User = mongoose.model("user", userSchema);

const register = async (dataUser) => {
  try {
    const hashedPassword = await bcypt.hash(dataUser.password, 10);
    const user = new User({
      username: dataUser.username,
      password: hashedPassword,
    });
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error al registrar el usuario");
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
    throw new Error("Error al iniciar sesión");
  }
};

export default { User, register, login };
