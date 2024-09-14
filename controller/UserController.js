const User = require("../model/UserModel")
const bcrypt = require('bcryptjs')

 const signUp = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        console.log('email: ', email);
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const createUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
        });  
        await createUser.save();
        res.status(201).json({
            message: "User created Successfully",
            user: {
                _id: createUser._id,
                fullname: fullname,
                email: email,
            }
        })
    }
    catch (error) {
        console.log("Error:" + error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}
//Login 
 const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        else {
            res.status(200).json({
                message: "Login successfull",
                user: {
                    id: user._id,
                    fullname: user.fullname,
                    email: user.email
                },
            });

        } 
    }
    catch (error) {
        console.log("Error" + error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}
module.exports = { signUp, Login }  