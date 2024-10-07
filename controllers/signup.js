import { UserSchemaModel } from "../schema/userSchema.js";
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken"; 

export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await UserSchemaModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new UserSchemaModel({
            name,
            email,
            password: hashedPassword,
            role
        });

        const savedUser = await newUser.save();

        const token = jwt.sign(
            { id: savedUser._id, role: savedUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ token, user: savedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password, name } = req.body; 

    try {
        
        const user = await UserSchemaModel.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        
        if (user.name !== name) {
            return res.status(400).json({ message: "Invalid name" });
        }


        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};
