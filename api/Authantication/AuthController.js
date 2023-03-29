const AuthService = require("./AuthService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  create: (req, res) => {
    const { password } = req.body;
    bcrypt.hash(password, 10, (error, hash) => {
      if (error) {
        res.status(500).json({
          msg: "internal Server Error",
        });
      } else {
        try {
          var data = {
            username: req.body.username,
            password: hash,
            email: req.body.email,
            phonenumber:req.body.phonenumber,
            role:req.body.role,
            userStatus:req.body.userStatus,
            organization:req.body.organization
          };
          AuthService.create(data).then((result) => {
            if (result) {              
              res.json({
                sucess: 200,
                message: "User Created succefully",
              });
            } else {
              res.json({
                sucess: 400,
                message: "Please provide correct information",
              });
            }
          }).catch((err) => {
            if (err.code === 11000) {
              res.status(400).json({
                success: 400,
                message: "User already exists",
              });
            } else {
              console.log(err);
              res.json({
                success: 400,
                message: "Please provide correct information",
              });
            }
          });
        } catch (err) {
          console.log(err);
          res.json({
            sucess: 400,
            message: "Please provide correct information",
          });
        }
      }
    });
  },
  isuser: (req, res, next) => {
    try {
      var data = { username: req.body.username };
      AuthService.isuser(data).then((result) => {
        if (result.length>0) {          
          bcrypt.compare(
            req.body.password,
            result[0].password,
            (err, response) => {              
              if (response) {
                var token = jwt.sign(
                  {
                    username: req.body.username,
                  },
                  "this is my medzone key",
                  { expiresIn: "1h" }
                )
                res.status(200).json({
                  token: token,                  
                  ...result[0]._doc
                });
              }
              if (err) {
                return res.json({
                  success:400,
                  message: "Invalid Password",
                });
              }
            }
      )} else{
        res.json({
          success:401,
          message:"invalid username and password",
        })
      }        
        
      });
      
    } catch (err) {
      res.json({
        sucess: 400,
        message: "Please provide correct information",
      });
    }
  },
  
  find_all: (req, res, next) => {
    try {            
      AuthService.find_all().then((result) => {
        if (result) {  
          res.status(200).json({
            data: result,
            msg:'data found'
          });
               
        } else {
          res.json({
            sucess: 400,
            message: "Data Not Found",
          });
        }
      });
    } catch (err) {
      res.json({
        sucess: 400,
        message: "Please provide correct information",
      });
    }
  },

  find_by_id:(req,res,next) =>{
    const{_id}=req.body
    try {            
      AuthService.find_by_id(_id).then((result) => {
        console.log(result)
        if (result) {  
          res.status(200).json({
            success : 200,
            data: result,
            msg:'User found'
          });
               
        } else {
          res.json({
            error: 400,
            message: "Data Not Found",
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.json({
        success: 400,
        message: "Please provide correct information",
      });
    }
  },

  find_and_update : (req,res) => {
    const {_id} = req.body;
    const { password } = req.body;
    bcrypt.hash(password, 10, (error, hash) => {
      if (error) {
        res.status(500).json({
          msg: "internal Server Error",
        });
        console.log(error);
      } else {
        try {
          var data = {
            username: req.body.username,
            password: hash,
            email: req.body.email,
            phonenumber:req.body.phonenumber,
            role:req.body.role,
            userStatus:req.body.userStatus,
            organization:req.body.organization
          };
          AuthService.find_and_update(_id,data).then((result) => {
            if (result) {              
              res.json({
                sucess: 200,
                message: "User Updated succefully",
              });
            } else {
              res.json({
                sucess: 400,
                message: "Please provide correct",
              });
            }
          });
        } catch (err) {
          console.log(err);
          res.json({
            sucess: 400,
            message: "Please provide correct information",
          });
        }
      }
    });
  },

  find_and_delete:(req,res)=>{
    const {_id} = req.body
    try{  
      AuthService.find_and_delete(_id).then((result) => {   
          if (result) {  
            res.status(200).json({
              data: result,
              msg:'User deleted'
            });
                 
          } else {
            res.json({
              error: 400,
              message: "User Not Found",
            });
          }
        })
      }
       catch (err) {
          console.log(err);
          res.json({
            success: 400,
            message: "Please provide correct information",
          });
        }     
  }
};


