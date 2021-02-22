const { registerValidation } = require('../validation')
const UserServices = require('../services/user');

const signUp = async (req, res, next) => {
    try {
        console.log(req.body)
        const { error } = registerValidation(req.body);
        if (error) {
            return res.status(400).json({ error: error.message })
            // throw new Error(`${error.message}`);
        }
        const newUser = req.body;
        const savedUser = await UserServices.registerUser(newUser);

        res.status(200).json({
            success: true,
            data: savedUser,
        });
    } catch (error) {
        console.log(`this is the error from line 20 in signUp: ${error}`)
        res.status(400).json({ error: error.message })
        next(new Error(`${error.message}`))
    }
};

module.exports = signUp;