const express = require('express');
const router = express.Router();


//Item Model
const Item = require('../../models/Items')

/**
 * @route   GET api/items
 * @desc    Get All Items
 * @access  Public
 */
 router.get('/' , (req , res) => {
    Item.find()
     .sort({date : -1})
     .then(items => res.json(items))
 })

 /**
 * @route   POST api/items
 * @desc    ADD NEW  Items
 * @access  Private
 */
 router.post('/' , (req , res) => {
    const newItem = new Item({
    	name: req.body.name
    })
    newItem.save().then(items => res.json(items))
 })

 /**
 * @route   Delete api/items
 * @desc    Delete  Items
 * @access  Private
 */
 router.delete('/:id' , (req , res) => {
    Item.findById(req.params.id)
     .then(items => items.remove().then(() => res.json({sucess: true})))
     .catch(err => res.status(404).json({sucess: false}))


 })

 module.exports = router