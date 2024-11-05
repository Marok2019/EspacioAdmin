const { CommonExpense } = require('../models');

exports.createCommonExpense = async (req, res) => {
  try {
    const commonExpense = await CommonExpense.create(req.body);
    res.status(201).json({
      success: true,
      data: commonExpense
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.getCommonExpenses = async (req, res) => {
  try {
    const commonExpenses = await CommonExpense.find()
      .populate('unit')
      .sort('-createdAt');
    
    res.json({
      success: true,
      data: commonExpenses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateCommonExpense = async (req, res) => {
  try {
    const commonExpense = await CommonExpense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!commonExpense) {
      return res.status(404).json({
        success: false,
        message: 'Gasto común no encontrado'
      });
    }

    res.json({
      success: true,
      data: commonExpense
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};