import React, { useState, useEffect } from 'react';

const ReporteMorosidad = () => {
    const [condominium, setCondominium] = useState('');
    const [rut, setRut] = useState('');
    const [morosidadData, setMorosidadData] = useState([]);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        // Simulate initial data load
        const initialMorosidad = [
            { residente: 'Juan Perez', rut: '55.555.555-5', condominio: 'Condominio 1', monto: '$100.000', estado: 'Sin Pagar', fecha: new Date().toLocaleDateString(), acciones: 'Contactar Residente' },
        ];
        setMorosidadData(initialMorosidad);

        // Set the current year
        setCurrentYear(new Date().getFullYear());
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (condominium && rut) {
            // Simulate searching (replace with actual API call)
            console.log(`Searching for RUT: ${rut} in ${condominium}`);
            // Here you can also update the morosidadData state based on the search
        } else {
            alert('Por favor, complete todos los campos.');
        }
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
                        <h1 className="text-center text-white">Reporte de Morosidad</h1>
                    </div>
                </div>

                {/* Search Filters */}
                <div className="card">
                    <div className="card-header text-white">Filtros de búsqueda</div>
                    <div className="card-body">
                        <form onSubmit={handleSearch}>
                            <div className="mb-3">
                                <label htmlFor="condominiumDropdown" className="form-label text-white">Seleccione el condominio:</label>
                                <select
                                    className="form-select"
                                    id="condominiumDropdown"
                                    aria-label="Condominio Selection"
                                    value={condominium}
                                    onChange={(e) => setCondominium(e.target.value)}
                                    required
                                >
                                    <option selected disabled>Seleccione un condominio...</option>
                                    <option value="condominio1">Condominio 1</option>
                                    <option value="condominio2">Condominio 2</option>
                                    <option value="condominio3">Condominio 3</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="rut" className="form-label text-white">RUT:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="rut"
                                    placeholder="Ej: 88.888.888-8"
                                    value={rut}
                                    onChange={(e) => setRut(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-warning w-100 mt-3">Buscar</button>
                        </form>

                        {/* Table */}
                        <div className="row justify-content-center mt-4">
                            <div className="col-md-12">
                                <table className="table table-dark table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>RUT</th>
                                            <th>Condominio</th>
                                            <th>Monto</th>
                                            <th>Estado del Pago</th>
                                            <th>Fecha de Vencimiento</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {morosidadData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.residente}</td>
                                                <td>{item.rut}</td>
                                                <td>{item.condominio}</td>
                                                <td>{item.monto}</td>
                                                <td>{item.estado}</td>
                                                <td>{item.fecha}</td>
                                                <td>{item.acciones}</td>
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
                    <p className="text-center text-white">&copy; {currentYear} Todos los derechos reservados</p>
                </div>
            </footer>
        </div>
    );
};

export default ReporteMorosidad;
