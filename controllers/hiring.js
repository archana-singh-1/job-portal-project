import Company from '../schema/hiring-model.js';

const post_data = async (req, res) => {
    try {
        const user = new Company(req.body);
        await user.save();
        res.status(201).json({
            message: "Data successfully added",
            data: user
        });

    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Error",
            error: err.message
        });
    }
}

export default post_data;
