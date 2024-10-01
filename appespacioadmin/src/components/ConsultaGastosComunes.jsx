import React, { useState } from 'react';

const ConsultaGastosComunes = () => {
    const [gastosComunes] = useState([
        { residente: 'Juan Pérez', rut: '88.888.888-8', condominio: 'Condominio 1', impAgua: 5000, impGas: 3000, impElectricidad: 4000, total: 12000 },
        { residente: 'María García', rut: '99.999.999-9', condominio: 'Condominio 2', impAgua: 6000, impGas: 3500, impElectricidad: 4500, total: 14000 },
        { residente: 'Carlos López', rut: '77.777.777-7', condominio: 'Condominio 3', impAgua: 5500, impGas: 3200, impElectricidad: 4200, total: 12900 }
    ]);
    const [filteredGastos, setFilteredGastos] = useState(gastosComunes);
    const [selectedCondominio, setSelectedCondominio] = useState('');
    const [rut, setRut] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = gastosComunes.filter(gasto => 
            (selectedCondominio ? gasto.condominio === selectedCondominio : true) &&
            (rut ? gasto.rut === rut : true)
        );
        setFilteredGastos(filtered);
    };

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
                        <h1 className="text-center">Consulta de Gastos Comunes</h1>
                    </div>
                </div>

                {/* Formulario */}
                <div className="card">
                    <div className="card-header">Filtros de búsqueda</div>
                    <div className="card-body">
                        <form onSubmit={handleSearch}>
                            <div className="row">

                                {/* Condominio Dropdown */}
                                <div className="mb-3">
                                    <label htmlFor="condominiumDropdown" className="form-label text-white">Seleccione el condominio:</label>
                                    <select
                                        className="form-select"
                                        id="condominiumDropdown"
                                        aria-label="Condominio Selection"
                                        required
                                        onChange={(e) => setSelectedCondominio(e.target.value)}
                                    >
                                        <option selected disabled>Seleccione un condominio...</option>
                                        <option value="Condominio 1">Condominio 1</option>
                                        <option value="Condominio 2">Condominio 2</option>
                                        <option value="Condominio 3">Condominio 3</option>
                                    </select>
                                </div>

                                {/* RUT de Residente */}
                                <div className="mb-3">
                                    <label htmlFor="rut" className="form-label text-white">RUT:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="rut"
                                        placeholder="Ej: 88.888.888-8"
                                        required
                                        value={rut}
                                        onChange={(e) => setRut(e.target.value)}
                                    />
                                </div>

                                {/* Botón Buscar */}
                                <button type="submit" className="btn btn-warning w-100 mt-1 mx-auto">Buscar</button>
                            </div>
                        </form>

                        <div className="row justify-content-center text-center mt-4">

                            {/* Contenido Tabla */}
                            <div className="col-md-12">
                                <table className="table table-dark table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>RUT</th>
                                            <th>Condominio</th>
                                            <th>Impuesto Agua</th>
                                            <th>Impuesto Gas</th>
                                            <th>Impuesto Luz</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody id="impTableBody">
                                        {filteredGastos.map((gastoComun, index) => (
                                            <tr key={index}>
                                                <td>{gastoComun.residente}</td>
                                                <td>{gastoComun.rut}</td>
                                                <td>{gastoComun.condominio}</td>
                                                <td>{gastoComun.impAgua}</td>
                                                <td>{gastoComun.impGas}</td>
                                                <td>{gastoComun.impElectricidad}</td>
                                                <td>{gastoComun.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
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

export default ConsultaGastosComunes;
