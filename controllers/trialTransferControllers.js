const Transfers = require('../models/trialTransfer');

const createTransfer = async (req, res) => {
  try {
    const newTransfer = await Transfers.create(req.body);
    res.status(201).json(newTransfer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateTransferById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTransfer = await Transfers.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedTransfer) {
      res.status(200).json(updatedTransfer);
    } else {
      res.status(404).json({ message: 'Transfer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteTransferById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTransfer = await Transfers.findByIdAndDelete(id);
    if (deletedTransfer) {
      res.status(200).json({ message: 'Transfer deleted successfully' });
    } else {
      res.status  (404).json({ message: 'Transfer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getTransferById = async (req, res) => {
  const { id } = req.params;
  try {
    const transfer = await Transfers.findById(id);
    if (transfer) {
      res.status(200).json(transfer);
    } else {
      res.status(404).json({ message: 'Transfer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllTransfers = async (req, res) => {
  try {
    const allTransfers = await Transfers.find();
    res.status(200).json(allTransfers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createTransfer,
  updateTransferById,
  deleteTransferById,
  getTransferById,
  getAllTransfers,
};
