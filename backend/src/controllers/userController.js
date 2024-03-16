import user from "../../schema/userSchema.js"
import bcrypt from "bcrypt"
import {nanoid} from "nanoid"
import jwt from "jsonwebtoken"

const loginUser = async (req,res) => {

    const {email,password} = req.body

    if(!email || !password){
        return res.send("please enter email or password")
    }

    try {
        const checkedEmail = await user.findOne({email})

        if(!checkedEmail){
            res.send("account not registered")
        }

        else{
            bcrypt.compare(password, checkedEmail.password, function(err, result) {

                if (err) {
                    return res.send("invalid password or email"); // Handle bcrypt error
                }
    
                if (!result) {
                    return res.send("invalid password or email"); // Passwords do not match
                }

                const token = jwt.sign(
                    {
                        userID: checkedEmail._id,
                        userEmail: checkedEmail.email,
                    },
                    "RANDOM-TOKEN",
                    { expiresIn: "24h" }
                );

                res.status(200).send({
                message: "Login Successful",
                data : {
                    userID: checkedEmail._id,
                    email: checkedEmail.email,
                    token,
                }
                });

                
            });
        }

    } 
    catch (error) {
        
    }

}

const registerUser = async (req,res) => {

    const {email,password} = req.body

    if(!email && !password){
        return res.send("please enter email and password")
    }

    try {
        
        const checkedEmail = await user.findOne({email})

        if(checkedEmail){
            res.send("Account with this username already existed. PLease try again with different email")
        }

        else{
            const saltRounds = 10

            bcrypt.genSalt(saltRounds, function(err, salt) {

                if(err){
                    return res.send("failed generating salts")
                }

                bcrypt.hash(password, salt, async function(err, hash) {


                    if(err){
                        return res.send("hashing password failed")
                    }

                    const requestBody =  {
                        email : email,
                        password : hash
                    }

                    const registeredUser = await user.create(requestBody)
                    res.status(201).send({
                        message: "User Created Successfully",
                        data:{
                            user : registeredUser

                        }
                    });


                });
            });

        }   


    } 

    catch (error) {
        res.send(error)
    }

}

export {registerUser,loginUser}