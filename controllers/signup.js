import { UserSchemaModel } from "../schema/userSchema.js";
import bcrypt from "bcryptjs"; 

const signup_data = async (req, res) => {
    try {
        const { username, email, password } = req.body;

       
        const existingUser = await UserSchemaModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserSchemaModel.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "Signup successful!", user });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Error signing up", error: err.message });
    }
};

export default signup_data;
