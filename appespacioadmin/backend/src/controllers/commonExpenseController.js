const commonExpense = require('../models/CommonExpense');

exports.createExpense = async (req, res) => {
  const { condominiumId, userId, month, year, amount, description, status } = req.body;

  try {
    const newExpense = new commonExpense({
      condominiumId,
      userId,
      month,
      year,
      amount,
      description,
      status,
    });

    const savedExpense = await commonExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el gasto común', error });
  }
};

exports.getAllExpenses = async (req, res) => {
    try {
      const expenses = await commonExpense.find()
        .populate('condominiumId', 'name')
        .populate('userId', 'name email');
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los gastos comunes', error });
    }
  };

  exports.getExpenseById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const expense = await commonExpense.findById(id)
        .populate('condominiumId', 'name')
        .populate('userId', 'name email');
  
      if (!expense) {
        return res.status(404).json({ message: 'Gasto común no encontrado' });
      }
  
      res.json(expense);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el gasto común', error });
    }
  };

  exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { amount, description, status } = req.body;
  
    try {
      const updatedExpense = await commonExpense.findByIdAndUpdate(
        id,
        { amount, description, status },
        { new: true }
      );
  
      if (!updatedExpense) {
        return res.status(404).json({ message: 'Gasto común no encontrado' });
      }
  
      res.json(updatedExpense);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el gasto común', error });
    }
  };

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExpense = await commonExpense.findByIdAndDelete(id);  // Corrected this line

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Gasto común no encontrado' });
    }

    res.json({ message: 'Gasto común eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el gasto común', error });
  }
};

exports.deleteAllExpenses = async (req, res) => {
    try {
      await commonExpense.deleteMany({});
      res.status(200).json({ message: 'Todos los gastos comunes han sido eliminados con éxito' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  
  