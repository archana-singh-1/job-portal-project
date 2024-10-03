import { UserSchemaModel } from "../schema/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login_data = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserSchemaModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || "secretkey",
            { expiresIn: "1h" } 
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
};
export default login_data;
