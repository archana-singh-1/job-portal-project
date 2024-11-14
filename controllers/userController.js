import { User } from "../schema/userSchema.js"; 
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken"; 


export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        const savedUser = await newUser.save();

        res.status(201).json({ message: "Signup successfully", user: savedUser }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export const login = async (req, res) => {
    const { email, password } = req.body; 
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        user.token = token;
        await user.save();

        res.status(200).json({ message: "Login successfully", token, user: { name: user.name, email: user.email, role: user.role }});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const logout = async (req, res) => {
    const userId = req.user.id; 

    try {
        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: "User data deleted successfully and logged out." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
