const config = require('config');
const jwt = require('jsonwebtoken')

function auth(req, res, next){
  const token = req.header('x-auth-token')

  //Check for token
  if(!token){
  	return res.status(401).json({msg: 'NO tokenn , authorization denied'})
  }

  //Verufy Token
  try{
  	const decode = jwt.verify(token , config.get('jwtSecret'))
	//Add userfrom payload
    req.user= decode
    next();
  }
  catch(e){
  	return res.status(400).json({msg: 'Token is not valid'})
  }
	  	

}

module.exports = auth