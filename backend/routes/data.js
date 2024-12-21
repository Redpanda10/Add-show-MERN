const express = require('express');
const Data = require('../models/data');
const router = express.Router();

// Save data
router.post('/', async (req, res) => {
    const text = req.body;
    const newData = new Data(text);
    try {
        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
        if (error.code === 11000) {
            console.error('Error : Duplicate data')
            res.status(400).json({ message: 'Duplicate data' });
        }
        else
        res.status(400).json({ message: error.message });
    }
});

// Get all data
router.get('/', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


 // Delete data
router.delete('/:id', async (req, res) => {
    
    try {
        const {id} = req.params;
        const deletedData = await Data.findByIdAndDelete(id);
        if(!deletedData)
        {return res.status(404).json({ message: 'Data not found' })}
        
        res.status(200).json({ message: 'Data deleted successfully' });
        
    } catch (err) {
        console.error(err)
        res.status(500).json({ err:"server error" });
    }
})

// Update data
router.put('/:id', async (req, res) => {
  
  try {
    const {id} = req.params.id;
    const  {text}  = req.body;

    if(!text){
        return res.status(400).json({ message: 'Please enter a text' });
    }
      const updatedData = await Data.findByIdAndUpdate(id, { text }, { new: true });
      if (!updatedData) {
        return res.status(404).json({ message: 'Data not found' });
      }

        res.status(200).json({ message: 'Data updated successfully' });
      
  } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
  }
});

module.exports = router;