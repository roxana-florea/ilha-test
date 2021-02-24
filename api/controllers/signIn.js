const UserServices = require('../services/user');

const signIn = async (req, res) => {
    try {
        const payload = req.body;
        const token = await UserServices.signInUser(payload);
        res.status(200).json({
            success: true,
            token: token
        });
    } catch (error) {
        console.log(error)
        if (error !== null) {
            res.sendStatus(401)
        }
    }
};

module.exports = signIn;