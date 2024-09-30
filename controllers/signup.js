
import { UserSchemaModel } from "../schema/userSchema";

const signup_data= async (req, res) => {
    try {
        const user = await UserSchemaModel.create(req.body);
        res.json({ message: "Signup successful!", user });
    } catch (err) {
        console.error("Signup error:", err); 
        res.status(500).json({ message: "Error signing up", error: err.message });
    }
};
export default signup_data;
