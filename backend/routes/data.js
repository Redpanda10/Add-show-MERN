const express = require('express');
const Data = require('../models/Data');
const router = express.Router();

// Save data
router.post('/', async (req, res) => {
    const text = req.body;
    const newData = new Data(text);
    try {
        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
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

module.exports = router;