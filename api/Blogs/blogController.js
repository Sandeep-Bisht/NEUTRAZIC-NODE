const blogService = require('./blogService')
module.exports = {
    create : async(req,res) => {
      // console.log("inside create", req.body,"files", req.files)
        try {
            var data = {...req.body, featuredImage:req.files }
            blogService.create(data).then((result) => {
                if(result) {
                    res.json({
                        sucesss : 200,
                        messege : "Blog created successfully"
                    })
                } else{
                    res.json({
                        success : 200,
                        messege : "Something went wrong"
                    })
                }
            })
        } catch (error) {
            console.log(error)
            res.json({
                success : 400,
                message : "Please provide correct information"
            })
        }
    },
    find_all : async(req,res) => {
        try {
            blogService.find_all().then((result)=> {
                if(result){
                    res.json({
                        success : 200,
                        message : "Data found",
                        data : result
                    })
                } else {
                    res.json({
                        success : 200,
                        message : "Something went wrong"
                    })
                }
            })
        } catch (error) {
            console.log(error)
            res.json({
                success : 400,
                message : "Please provide correct information"
            })
        }
    },
    find_by_slug : async(req,res) => {
        const { slug } = req.body;
        try {
            blogService.find_by_slug(slug).then((result) => {
                if(result) {
                    res.json({
                        success : 200,
                        data : result,
                        message : "Data found"
                    })
                } else{
                    res.json({
                        success :200,
                        message : "Something went wrong"
                    })
                }
            })
        } catch (error) {
            console.log(error)
            res.json({
                success : 400,
                message : "Please provide correct information"
            })
        }
    },
    find_and_update:(req,res,next)=>{
        const{_id}=req.body;
        var images   
        if(req.files[0]){
          images = req.files    
        }
        else{
          images = req.body.image
        }
    
        const data={...req.body} 
        try{  
            blogService.find_and_update(_id,data).then((result) => {      
            if (result) {  
              res.json({
                success : 200,
                data: result,
                msg:'Data found'
              });
                   
            } else {
              res.json({
                error: 200,
                message: "Data Not Found",
              });
            }
          })
        }
         catch (err) {
            console.log(err);
            res.json({
                error: 400,
              message: "Please provide correct information",
            });
          }
        },
      find_and_delete:(req,res)=>{
        const {_id} = req.body
        
        try{  
            blogService.find_and_delete(_id).then((result) => {      
              if (result) {  
                res.json({
                    success:200,
                  data: result,
                  msg:'Blog deleted'
                });
                     
              } else {
                res.json({
                  error: 200,
                  message: "Data Not Found",
                });
              }
            })
          }
           catch (err) {
              console.log(err);
              res.json({
                error: 400,
                message: "Please provide correct information",
              });
            }     
      }

}