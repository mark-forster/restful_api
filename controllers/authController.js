const User=require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const{userSchema}=require('../validations/user');

const addUser=async (req,res)=>{
    try{
        //get user Input
    const {name,email,password}=req.body;
    //validate uerinput
    const validator=await userSchema.validateAsync(req.body);
    if(!name && email && password){
        res.status(400).json({message:"All Input is required"});
    }
    //checking user alerady exist
    const olduser=await User.findOne({email:email});
    if(olduser){
        res.status(400).json({message:"User aready exist please enter different email address"});
    }
    //encrypting user password
    const hashpw=await bcrypt.hash(password,12);
   
    //adding user
    const user =new User({
        name:name,
        email:email,
        password:hashpw
    });

    await user.save();
    res.status(200).json({message:user});

    }
    catch(err){
        res.status(401).json({message:"Something went wrong"});
    }
        
}

const login=async (req,res)=>{
                        // login
                    try {
                        // Get user input
                        const {name,email, password } = req.body;

                        // Validate user input
                        if (!(name && email && password)) {
                        res.status(400).send("All input is required");
                        }
                        // Validate if user exist
                        const user = await User.findOne({ email:email });

                        
                        if(user){
                            const checkpw= await bcrypt.compare(password, user.password)
                            .then(domatch=>{
                                // Create token
                                const token = jwt.sign(
                                    { user_id: user._id, email },
                                    process.env.secret,
                                    {
                                    expiresIn: "2h",
                                    }
                                );
                                // save user token
                                user.token = token;
                            res.status(200).json({message:user,token});
                            })
                            .catch(err=>{
                                res.send('passworddoesnot match')
                            })  
                        }
                      
                            res.send('wrong');
                        
                    }
                     catch (err) {
                        res.status(400).json({message:'Invalid Credentials'})
                    }
}


module.exports={
    addUser,
    login
}