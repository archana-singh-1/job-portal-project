import Company from '../schema/hiringSchema.js';

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


const get_data = async (req,res)=>{
    try{
        const data = await Company.find({})
        res.send({
            message:"done",
            details:data
        })
        
    }
    catch{
        res.send({
            message:"err",
            err:err
        })

    }
}
export  {post_data,get_data};
