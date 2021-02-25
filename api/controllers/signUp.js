const UserServices = require('../services/user');

const signUp = async (req, res) => {
    try {
        const newUser = req.body;
        const savedUser = await UserServices.registerUser(newUser);

        res.status(200).json({
            success: true,
            data: savedUser,
        });
    } catch (error) {
        if (error !== null) {
            res.sendStatus(400);
        }
        console.log(error)
    }
};

module.exports = signUp;