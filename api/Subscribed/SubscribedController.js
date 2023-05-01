const subscribedService = require("./SubscribedService");
const tokenModalModule = require('./TokenModal');
const SubscribedModalModule = require('./SubscribedModal');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

module.exports = {
  create: (req, res) => {
    const { email } = req.body;
    subscribedService.findByEmail(email)

     // email check
    SubscribedModalModule.findOne({ email: email }, (err, userMail) => {
      if (err) {
        // handle err
        res.json({
          success: 400,
          message: "Something not found.",
        });
      }

      if (userMail) {
        // token not found
        return res.json({
          success: 400,
          message: "Email already exist.",
        });
      }


      const token = jwt.sign(
        {
          email: email,
        },
        "this is my medzone key",
        { expiresIn: "1h" }
      );
      tokenModalModule.create({
        token,
      }).then((result) => {
        if (result) {
          // Send email to user
          // console.log(result,"inside the result")
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
            subject: "Join our community and subscribe for exclusive updates and offers!",
            html: `<p>Hi </p><p>Great! Just click on the link below to complete your subscription and stay up-to-date with all our latest news, promotions, and exclusive content.</p>
                        <a href="${process.env.CLIENT_URL}/subscribed/${token}" target="_blank"?>Click here</a>
                        <p>Thank you for your interest in our community!</p><p> Best regards</p>
               <p>Nutrazik</p><p>+91-7500872014</p>`,
          };
          try {
            transporter.sendMail(mailOptions);
            console.log("email send")
            res.json({
              sucess: 200,
              message: "We have shared a susbscibe link to verify your email. Please verify within a hour It will expire after a hour.",
            });
          } catch (error) {
            console.error(error);
          }
        }
      })
        .catch((err) => {

          console.log(err);
          res.json({
            success: 400,
            message: "Please provide correct information",
          });
        })


    })
  },

  verify: (req, res) => {
    const { token } = req.body;

    tokenModalModule.findOne({ token: token }, (err, userToken) => {
      if (err) {
        // handle err
        return res.json({
          success: 400,
          message: "Something not found.",
        });
      }

      if (!userToken) {
        // token not found
        return res.json({
          success: 400,
          message: "token not found.",
        });
      }

      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          // token not found
          res.json({
            success: 401,
            message: "unauthorised.",
          });
        }
        else {
          let { email } = decoded

          tokenModalModule.findOneAndDelete({ token: token }, (err, deletedToken) => {
            if (err) {
              console.error(err);
            } else {
              console.log(deletedToken);
            }
          });
          // tokenModalModule.findOneAndDelete({token:token.token});

          subscribedService.create({ email }).then((result) => {
            if (result) {
              res.json({
                success: 200,
                message: "Your subscribed successfully.",
              });
            }
          }).catch((err) => {
            if (err.code === 11000) {
              res.status(400).json({
                success: 400,
                message: "Email already exits",
              });
            } else {
              console.log(err);
              res.json({
                success: 400,
                message: "somthing went wrong retry again",
              });
            }
          });
        }
      })
    })
  }
}