const otpModalModule = require('./ForgetPasswordModal');
const nodemailer = require("nodemailer");

module.exports = {
  create: (req, res) => {
    const  email  = req.body.email;
     if(!email)
     {
        res.json({
            success:400,
            message:"Email is not register"
        })
     }
     else{
     const otp = Math.floor(100000 + Math.random() * 900000);
     otpModalModule.create({otp}).then((result)=>{
        if(result)
        {
          res.json({
            success:200,
            otp:result,
            message:"Your Otp is sent please go throw the your mail id"
          })
          const transporter = nodemailer.createTransport({
            host: "smtppro.zoho.com",
            port: 587,
            auth: {
              user: "admin@nutrazik.com",
              pass: "Nutrazik@123",
            },
          });
          const mailOptions = {
            from: "admin@nutrazik.com",
            to: email,
            subject: "OTP for Login",
            html: `<p>Your OTP is ${result.otp}. It is valid for 5 minutes.</p>`,
          };
          try {
            transporter.sendMail(mailOptions);
            console.log("email send")
            res.json({
              sucess: 200,
              message: "We have shared Login Otp.",
            });
          } catch (error) {
            console.error(error);
          }
          setTimeout(() => {
            otpModalModule.deleteOne({ otp: otp }).then((result) => {
              if (result) {
              }
            }).catch((err) => {
              console.log(err);
            });
          }, 1 * 60 * 1000);
        }
        
        else{
            res.json({
                success:400,
                message:"somthing wrong"
            })
        }
     })
     }
  },

  verifyotp: (req, res) => {
    const { otp } = req.body;
    if(!otp){
      return res.json({message:"Please provide otp"})
    }
    try{
        otpModalModule.findOne({ otp: otp }, (err, userOtp) => {
            if (err) {
              // handle err
              res.json({
                success: 400,
                message: "Something not found.",
              });
            }
            if(userOtp)
            {
               res.json({
                success: 200,
                message: "verified otp.",
               })
               otpModalModule.deleteOne({ otp: otp },(err,userOtp)=>{
                if(err){
                    console.log(err);
                }                
               })
            }  
            else{
              res.json({
                success:400,
                message:"otp not found"
              })
            } 
          })
    }catch(error)
    {
        res.json({
            subject:400,
            message:"somthing wrong"
        })
    }
    
  }
}