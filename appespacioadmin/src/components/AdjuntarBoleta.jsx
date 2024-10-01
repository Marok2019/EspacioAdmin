import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AdjuntarBoleta = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Actualiza el año en el footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const fileInput = document.getElementById('receiptFile');
        if (fileInput.files.length === 0) {
            alert('Por favor, adjunte una boleta.');
            return;
        }

        alert('Boleta adjuntada con éxito.');
        e.target.reset(); // Reinicia el formulario
    };

    return (
        <div className="bg-dark">
            {/* Header */}
            <div className="header-container d-flex align-items-center">
                <img src="https://i.ibb.co/FW5SBG3/logo-no-background.png" alt="Logo" className="header-logo" />
                <button type="button" className="btn btn-danger logout-button" onClick={() => navigate('/auth')}>Volver</button>
            </div>

            {/* Body */}
            <div className="container mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h3>Adjuntar Boleta</h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {/* Condominio Dropdown */}
                                <div className="col-md-6">
                                    <label htmlFor="condominioDropdown" className="form-label text-white">Seleccione el condominio:</label>
                                    <select className="form-select" id="condominioDropdown" aria-label="Condominio Selection" required>
                                        <option selected disabled>Seleccione un condominio...</option>
                                        <option value="condominio1">Condominio 1</option>
                                        <option value="condominio2">Condominio 2</option>
                                        <option value="condominio3">Condominio 3</option>
                                    </select>
                                </div>

                                {/* Número de departamento */}
                                <div className="col-md-6">
                                    <label htmlFor="apartmentNumber" className="form-label text-white">Número de Departamento</label>
                                    <input type="text" className="form-control" id="apartmentNumber" placeholder="Ej: 101" required />
                                </div>
                            </div>
                            <div className="row mt-2">
                                {/* Nombre del residente */}
                                <div className="col-md-6">
                                    <label htmlFor="residentName" className="form-label text-white">Nombre del Residente</label>
                                    <input type="text" className="form-control" id="residentName" placeholder="Ej: Juan Pérez" required />
                                </div>

                                {/* Adjuntar boleta */}
                                <div className="col-md-6">
                                    <label htmlFor="receiptFile" className="form-label text-white">Adjuntar Boleta (PDF o Imagen)</label>
                                    <input type="file" className="form-control" id="receiptFile" accept=".pdf, .jpg, .jpeg, .png" required />
                                </div>
                            </div>
                            <div className="row mt-2">
                                {/* Comentarios opcionales */}
                                <div className="mb-3">
                                    <label htmlFor="comments" className="form-label text-white">Comentarios (Opcional)</label>
                                    <textarea className="form-control" id="comments" rows="3" placeholder="Escriba algún comentario adicional"></textarea>
                                </div>
                            </div>

                            {/* Botón para adjuntar boleta */}
                            <div className="mt-3">
                                <button type="submit" className="btn btn-warning w-100">Adjuntar Boleta</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Footer */}
            <footer className="bg-dark py-3 mt-5">
                <div className="container">
                    <p className="text-center">&copy; <span id="current-year"></span> Todos los derechos reservados</p>
                </div>
            </footer>
        </div>
    );
};

export default AdjuntarBoleta;
