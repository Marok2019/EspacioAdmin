import React from 'react';

const RegistroResidente = () => {
    return (
        <div className="bg-dark">
            {/* Header */}
            <div className="header-container d-flex align-items-center">
                <img src="https://i.ibb.co/FW5SBG3/logo-no-background.png" alt="Logo" className="header-logo" />
                <button type="button" className="btn btn-danger logout-button">Volver</button>
            </div>

            {/* Body */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center">Registro de Nuevo Residente</h1>
                    </div>
                </div>

                {/* Formulario */}
                <div className="card">
                    <div className="card-header">Filtros de registro</div>
                    <div className="card-body">
                        <div className="row">
                            {/* Condominio Dropdown */}
                            <div className="mb-3">
                                <label htmlFor="condominiumDropdown" className="form-label text-white">Seleccione el condominio:</label>
                                <select className="form-select" id="condominiumDropdown" aria-label="Condominio Selection" required>
                                    <option selected disabled>Seleccione un condominio...</option>
                                    <option value="condominio1">Condominio 1</option>
                                    <option value="condominio2">Condominio 2</option>
                                    <option value="condominio3">Condominio 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            {/* Número de Apartamento */}
                            <div className="mb-3">
                                <label htmlFor="apartmentNumber" className="form-label text-white">Número de Departamento:</label>
                                <input type="text" className="form-control" id="apartmentNumber" placeholder="Ej: 101" required />
                            </div>

                            {/* Nombre de Residente */}
                            <div className="mb-3">
                                <label htmlFor="residentName" className="form-label text-white">Nombre del Residente:</label>
                                <input type="text" className="form-control" id="residentName" placeholder="Ej: Juan Pérez" required />
                            </div>

                            {/* RUT de Residente */}
                            <div className="mb-3">
                                <label htmlFor="rut" className="form-label text-white">RUT:</label>
                                <input type="text" className="form-control" id="rut" placeholder="Ej: 88.888.888-8" required />
                            </div>
                        </div>
                        <div className="row">
                            {/* Número de Residente */}
                            <div className="mb-3">
                                <label htmlFor="phoneNumber" className="form-label text-white">Número de Teléfono:</label>
                                <input type="text" className="form-control" id="phoneNumber" placeholder="Ej: +56912345678" required />
                            </div>

                            {/* Correo de Residente */}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label text-white">Correo Electrónico:</label>
                                <input type="email" className="form-control" id="email" placeholder="Ej: ejemplo@ejemplo.com" required />
                            </div>

                            {/* Estacionamiento de Residente */}
                            <div className="mb-3">
                                <label htmlFor="parkingSpot" className="form-label text-white">Estacionamiento (opcional):</label>
                                <input type="text" className="form-control" id="parkingSpot" placeholder="Ej: A1" />
                            </div>
                        </div>
                    </div>

                    {/* Botón de Guardar */}
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark py-3 mt-5">
                <div className="container">
                    <p className="text-center">&copy; <span id="current-year"></span> Todos los derechos reservados</p>
                </div>
            </footer>

            {/* Footer Script */}
            <script>
                document.getElementById('current-year').textContent = new Date().getFullYear();
            </script>
        </div>
    );
};

export default RegistroResidente;
