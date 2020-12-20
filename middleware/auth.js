const jwt = require("jsonwebtoken")
const jwtSecret = "passwordjwt123"

function auth(req,res,next){
    const authToken = req.headers['authorization'];
    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];
        jwt.verify(token, jwtSecret,(err, data)=>{
            if(err){
                res.status(401);
                res.json({err:"Token inválido"})
            }else{
                req.token = token;
               // req.loggedUser = {id: data.id, email: data.email}
                next();
            }
        })

    }else{
        res.status(401);
        res.json({err :"Token inválido"})

    }
    
    //token in console
    //console.log(authToken);
  
}

module.exports = auth;