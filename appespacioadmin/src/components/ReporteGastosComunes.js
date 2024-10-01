import React, { useState, useEffect } from 'react';

const ReporteGastosComunes = () => {
    const [condominium, setCondominium] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (condominium && year && month) {
            // Simulate a search action (replace with actual API call)
            console.log(`Searching for expenses in ${condominium} for ${month}/${year}`);
            // Here you can also update the state or perform any necessary actions
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
                        <h1 className="text-center text-white">Reporte de Gastos Comunes</h1>
                    </div>
                </div>

                {/* Search Filters */}
                <div className="card">
                    <div className="card-header text-white">Filtros de búsqueda</div>
                    <div className="card-body">
                        <form onSubmit={handleSearch}>
                            <div className="row">
                                {/* Condominio Dropdown */}
                                <div className="col-md-6">
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

                                {/* Year Dropdown */}
                                <div className="col-md-6">
                                    <label htmlFor="yearDropdown" className="form-label text-white">Seleccione el año:</label>
                                    <select
                                        className="form-select"
                                        id="yearDropdown"
                                        aria-label="Year Selection"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        required
                                    >
                                        <option selected disabled>Seleccione un año...</option>
                                        <option value="2024">2024</option>
                                        <option value="2023">2023</option>
                                        <option value="2022">2022</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mt-3">
                                {/* Month Dropdown */}
                                <div className="col-md-12">
                                    <label htmlFor="monthDropdown" className="form-label text-white">Seleccione el mes:</label>
                                    <select
                                        className="form-select"
                                        id="monthDropdown"
                                        aria-label="Mes Selection"
                                        value={month}
                                        onChange={(e) => setMonth(e.target.value)}
                                        required
                                    >
                                        <option selected disabled>Seleccione un mes...</option>
                                        <option value="1">Enero</option>
                                        <option value="2">Febrero</option>
                                        <option value="3">Marzo</option>
                                        <option value="4">Abril</option>
                                        <option value="5">Mayo</option>
                                        <option value="6">Junio</option>
                                        <option value="7">Julio</option>
                                        <option value="8">Agosto</option>
                                        <option value="9">Septiembre</option>
                                        <option value="10">Octubre</option>
                                        <option value="11">Noviembre</option>
                                        <option value="12">Diciembre</option>
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-warning w-100 mt-3">Buscar</button>
                        </form>
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

export default ReporteGastosComunes;
