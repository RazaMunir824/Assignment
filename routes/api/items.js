const express = require('express');
const router = express.Router()
// Item Model
const Item = require('../../models/Items');
const auth = require('../../middleware/auth')
/**
 * @route   GET api/items
 * @desc    Get All Items
 * @access  Public
 */

router.get('/',(req,res) => {
	Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
})

/**
 * @route   PUT api/items
 * @desc    PUT All Items
 * @access  Public
 */

router.put('/' , (req,res) => {
   const { id }= req.body;
   let found = false;
   Item.forEach(user => {
      if(user.id === id){
         found = true
         user.name = req.body.name
         return res.json(user.entries)
      }
   })
   if(!found){
      res.status(400).send("error not login")
   }

})



/**
 * @route   POST api/items
 * @desc    ADD NEW  Items
 * @access  Private
 */

router.post('/', auth, (req,res) => {
	const newItem = new Item({
		name: req.body.name
	})
	newItem.save().then(item => res.json(item))
})

/**
 * @route   Delete api/items
 * @desc    Delete  Items
 * @access  Private
 */

router.delete('/:id' , auth ,(req,res) => {
	Item.findById(req.params.id)
	  .then(item => item.remove().then(() => res.json({sucess: true})))
	  .catch(err => res.status(404).json({sucess: false}))
})

module.exports = router