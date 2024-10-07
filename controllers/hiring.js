import Company from '../schema/hiringSchema.js';
import { UserSchemaModel } from '../schema/userSchema.js';


const post_data = async (req, res) => {
    try {
        const { createdByUsername, Number_openings, ...otherFields } = req.body;

        const user = await UserSchemaModel.findOne({ username: createdByUsername });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const companyData = new Company({
            createdBy: user._id, 
            Number_openings,
            ...otherFields
        });

        await companyData.save();
        res.status(201).json({
            message: "Data successfully added",
            data: companyData
        });

    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Error",
            error: err.message
        });
    }
};

const get_data = async (req, res) => {
    try {
        const data = await Company.find({})
            .populate('createdBy') 
            .exec();

        res.send({
            message: "done",
            details: data
        });

    } catch (err) {
        res.send({
            message: "err",
            err: err.message
        });
    }
};

export { post_data, get_data };