const { loginValidation } = require('../validation')
const UserServices = require('../services/user');

const signIn = async (req, res, next) => {
    try{
        const payload = req.body;
        const { error } = loginValidation(payload);
        if (error)
        return res.status(400).send({ error: error.message });

        const token = await UserServices.signInUser(payload);
        console.log(`this is in the token: ${token}`)
        res.status(200).json({
            success: true,
            token: token
        });
    } catch (error) {
        console.log(error)
        next()
    }
}

module.exports = signIn;