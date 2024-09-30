import React, { useState, useEffect } from 'react';
import '../css/adjuntarBoletaStyles.css'; // Custom CSS for the component

const AdjuntarBoleta = () => {
  const [formData, setFormData] = useState({
    condominium: '',
    apartmentNumber: '',
    residentName: '',
    file: null,
    comments: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.file) {
      alert('Por favor, adjunte una boleta.');
      return;
    }
    
    // Submit logic goes here. For now, we just reset the form.
    alert('Boleta adjuntada con éxito.');
    setFormData({
      condominium: '',
      apartmentNumber: '',
      residentName: '',
      file: null,
      comments: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    });
  };

  useEffect(() => {
    // Set current year in footer dynamically
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
  }, []);

  return (
    <div>
      {/* Header Section */}
      <div className="header-container">
        <div className="d-flex justify-content-between align-items-center">
          <button type="button" className="btn btn-danger">Cerrar Sesión</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
              <div className="card-header text-white text-center">
                <h2>Adjuntar Boleta de Gastos Comunes</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* Condominium Selection */}
                  <div className="mb-3">
                    <label htmlFor="condominiumSelect" className="form-label text-white">Condominio</label>
                    <select
                      className="form-select"
                      id="condominiumSelect"
                      name="condominium"
                      value={formData.condominium}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Seleccione el condominio</option>
                      <option value="condominio1">Condominio 1</option>
                      <option value="condominio2">Condominio 2</option>
                      <option value="condominio3">Condominio 3</option>
                    </select>
                  </div>

                  {/* Apartment Number */}
                  <div className="mb-3">
                    <label htmlFor="apartmentNumber" className="form-label text-white">Número de Departamento</label>
                    <input
                      type="text"
                      className="form-control"
                      id="apartmentNumber"
                      name="apartmentNumber"
                      value={formData.apartmentNumber}
                      onChange={handleInputChange}
                      placeholder="Ej: 101"
                      required
                    />
                  </div>

                  {/* Resident Name */}
                  <div className="mb-3">
                    <label htmlFor="residentName" className="form-label text-white">Nombre del Residente</label>
                    <input
                      type="text"
                      className="form-control"
                      id="residentName"
                      name="residentName"
                      value={formData.residentName}
                      onChange={handleInputChange}
                      placeholder="Ej: Juan Pérez"
                      required
                    />
                  </div>

                  {/* Attach Receipt */}
                  <div className="mb-3">
                    <label htmlFor="receiptFile" className="form-label text-white">Adjuntar Boleta (PDF o Imagen)</label>
                    <input
                      type="file"
                      className="form-control"
                      id="receiptFile"
                      name="file"
                      accept=".pdf, .jpg, .jpeg, .png"
                      onChange={handleFileChange}
                      required
                    />
                  </div>

                  {/* Optional Comments */}
                  <div className="mb-3">
                    <label htmlFor="comments" className="form-label text-white">Comentarios (Opcional)</label>
                    <textarea
                      className="form-control"
                      id="comments"
                      name="comments"
                      value={formData.comments}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Escriba algún comentario adicional"
                    />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary w-100">Adjuntar Boleta</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>&copy; <span id="current-year"></span> Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

export default AdjuntarBoleta;
