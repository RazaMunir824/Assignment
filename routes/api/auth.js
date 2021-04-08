const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')

//User Model
const User = require('../../models/Users');


router.post('/' , (req, res) => {
   const {email , password} = req.body

   if(!email || !password ){
   	return res.status(400).json({msg: 'Field Are Empty'})
   }

   //Checking for non-Exiting user
   User.findOne({email})
    .then(user => {
    	if(!user) return res.status(400).json({msg: 'User NOt exit'})

      bcrypt.compare(password,user.password)
          .then(isMatch => {
            if(!isMatch) return res.status(400).json({msg: 'Password NOt Match'})
          
              jwt.sign(
                         {id : user.id},
                         config.get('jwtSecret'),
                         { expiresIn: 3600},
                         (err , token) => {
                            if (err) throw err
                            res.json({
                                  token,
                              user:{
                                id:user.id,
                                name:user.name,
                                email:user.email
                              }
                            })  
                          }
                      )
             })
    })

    
})      
         
/**
 * @route   GET api/items/user
 * @desc    GET USER
 * @access  Private
*/ 

router.get('/user' ,auth, (req,res) => {
  User.findById(req.user.id)
  .select('-password')
  .then(user => res.json(user))
})       


module.exports = router;