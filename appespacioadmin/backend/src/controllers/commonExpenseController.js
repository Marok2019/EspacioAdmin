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

    const savedExpense = await newExpense.save(); // Corrected save method
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el gasto común', error: error.message });
  }
};

exports.getAllExpenses = async (req, res) => {
  const { month, year, condominiumId } = req.query;

  console.log('Parámetros de entrada:', { month, year, condominiumId });

  try {
    // Inicializa un objeto de consulta vacío
    const query = {};

    // Añade el condominio a la consulta si está presente
    if (condominiumId) {
      query.condominiumId = condominiumId;
    }
    // Añade el mes a la consulta si está presente
    if (month) {
      query.month = month;
    }
    // Añade el año a la consulta si está presente
    if (year) {
      query.year = year;
    }

    // Log para verificar la consulta final
    console.log('Objeto de consulta:', query);

    // Realiza la búsqueda con los filtros aplicados
    const expenses = await commonExpense.find(query)
      .populate('condominiumId', 'name')
      .populate('userId', 'name email');
    
    // Log para verificar los resultados de la búsqueda
    console.log('Resultados encontrados:', expenses);
      
    // Responde con los resultados encontrados
    res.json(expenses);
  } catch (error) {
    console.error('Error durante la búsqueda:', error);
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

  
  
  