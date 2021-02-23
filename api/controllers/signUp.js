const { registerValidation } = require('../validation')
const UserServices = require('../services/user');

const signUp = async (req, res, next) => {
    try {
        // const { error } = registerValidation(req.body);
        // if (error) {
        //     return res.status(400).json({ error: error.message })
        // }
        const newUser = req.body;
        const savedUser = await UserServices.registerUser(newUser);

        res.status(200).json({
            success: true,
            data: savedUser,
        });
    } catch (error) {
        // res.status(400).json({ error: error.message })
        console.log(error)
    }
};

module.exports = signUp;