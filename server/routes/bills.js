const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');

// Get all bills
router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a bill by ID
router.get('/:id', async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new billrouter.post('/', async (req, res) => {
  const { customerName, contactNumber, selectedProducts, totalAmount, serialNumber, printDetails } = req.body;

  if (!customerName || !contactNumber || !selectedProducts || !totalAmount || !serialNumber || !printDetails) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const createdAt = new Date(); // Current date and time
    const newBill = new Bill({
      customerName,
      contactNumber,
      selectedProducts,
      totalAmount,
      serialNumber,
      createdAt,
      printDetails,

    const savedBill = await newBill.save();
    res.status(201).json(savedBill);
  } catch (error) {
    console.error('Error storing bill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Delete a bill
router.delete('/:id', async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);
    res.status(204).end();  // No content
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
