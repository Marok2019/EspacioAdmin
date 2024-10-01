import React, { useEffect, useState } from 'react';


const ReporteGastosComunes = () => {
    const [condominiums, setCondominiums] = useState([]);
    const [years] = useState([2023, 2022, 2021]);
    const [months] = useState([
        { value: 1, label: 'Enero' },
        { value: 2, label: 'Febrero' },
        { value: 3, label: 'Marzo' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Mayo' },
        { value: 6, label: 'Junio' },
        { value: 7, label: 'Julio' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Septiembre' },
        { value: 10, label: 'Octubre' },
        { value: 11, label: 'Noviembre' },
        { value: 12, label: 'Diciembre' },
    ]);
    const [selectedCondominium, setSelectedCondominium] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [downloadEnabled, setDownloadEnabled] = useState(false);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        // Simular la carga de condominios desde un API (reemplazar con la llamada real)
        setCondominiums(['Condominio 1', 'Condominio 2', 'Condominio 3']);
    }, []);

    const handleSearch = async () => {
        // Simular llamada API (reemplazar con la llamada real)
        const response = await fetch(`/api/taxes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                condominio: selectedCondominium,
                anio: selectedYear,
                mes: selectedMonth,
            }),
        });

        if (response.ok) {
            const taxes = await response.json();
            displaySearchResults(taxes);
            setDownloadEnabled(true);
        } else {
            setSearchResults(["No se encontraron impuestos que coincidan con los criterios de búsqueda."]);
            setDownloadEnabled(false);
        }
    };

    const handleDownload = () => {
        // Simular descarga de log (reemplazar con la lógica de descarga real)
        alert("Descargando log de impuestos...");
    };

    const displaySearchResults = (taxes) => {
        if (taxes.length === 0) {
            setSearchResults(["No se encontraron impuestos que coincidan con los criterios de búsqueda."]);
        } else {
            const results = taxes.map(tax => (
                <li key={tax.id} className='list-group-item'>
                    <strong>Departamento:</strong> {tax.departamento}<br />
                    <strong>Propietario:</strong> {tax.propietario}<br />
                    <strong>Monto:</strong> ${tax.monto}<br />
                    <strong>Estado:</strong> {tax.estado}<br />
                    <strong>Fecha de vencimiento:</strong> {new Date(tax.fecha_vencimiento).toLocaleDateString()}<br />
                    <strong>Fecha de pago:</strong> {tax.fecha_pago ? new Date(tax.fecha_pago).toLocaleDateString() : 'No pagado'}
                </li>
            ));
            setSearchResults(results);
        }
    };

    return (
        <div className="bg-dark">
            <div className="header-container d-flex align-items-center">
                <img src="https://i.ibb.co/FW5SBG3/logo-no-background.png" alt="Logo" className="header-logo" />
                <button type="button" className="btn btn-danger logout-button">Cerrar Sesión</button>
            </div>

            <div className="container mt-5">
                <h1 className="text-center mb-4">Descargar Reporte de Gastos Comunes</h1>

                <div className="card">
                    <div className="card-header">Filtros de búsqueda</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="condominiumDropdown" className="form-label text-white">Seleccione el condominio:</label>
                                <select className="form-select" id="condominiumDropdown" value={selectedCondominium} onChange={(e) => setSelectedCondominium(e.target.value)} required>
                                    <option value="" disabled>Seleccione un condominio...</option>
                                    {condominiums.map((condo, index) => (
                                        <option key={index} value={condo}>{condo}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="yearDropdown" className="form-label text-white">Seleccione el año:</label>
                                <select className="form-select" id="yearDropdown" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} required>
                                    <option value="" disabled>Seleccione un año...</option>
                                    {years.map((year, index) => (
                                        <option key={index} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="monthDropdown" className="form-label text-white">Seleccione el mes:</label>
                            <select className="form-select" id="monthDropdown" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} required>
                                <option value="" disabled>Seleccione un mes...</option>
                                {months.map((month) => (
                                    <option key={month.value} value={month.value}>{month.label}</option>
                                ))}
                            </select>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleSearch}>Buscar</button>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">Resultados de la búsqueda</div>
                    <div className="card-body">
                        <ul className='list-group'>{searchResults}</ul>
                        <button type="button" className="btn btn-success" onClick={handleDownload} disabled={!downloadEnabled}>Descargar log</button>
                    </div>
                </div>
            </div>

            <footer className="bg-dark py-3 mt-5">
                <div className="container">
                    <p className="text-center text-white">&copy; {currentYear} Todos los derechos reservados</p>
                </div>
            </footer>
        </div>
    );
};

export default ReporteGastosComunes;
