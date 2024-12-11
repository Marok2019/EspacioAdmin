import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';

const ReporteUsoEspaciosComunes = () => {
    const navigate = useNavigate();
    const [condominios, setCondominios] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [selectedCondominio, setSelectedCondominio] = useState('');
    const [selectedSpace, setSelectedSpace] = useState('');
    const [rut, setRut] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    // Validate RUT format
    const isValidRut = (rutValue) => {
        return rutValue === '' || /^\d{7,8}-[0-9kK]$/.test(rutValue);
    };

    // Handle navigation based on user role
    const handleBack = () => {
        const userRole = localStorage.getItem('role');
        switch (userRole) {
            case 'superadmin':
                navigate('/superadmin-main');
                break;
            case 'directive':
                navigate('/directiva');
                break;
            default:
                alert('Rol no válido o no definido.');
                navigate('/auth');
        }
    };

    // Logout handler
    const handleLogout = () => {
        localStorage.clear();
        navigate('/auth');
    };

    // Export search results to Excel
    const handleExport = () => {
        if (searchResults.length === 0) {
            alert('No hay resultados para exportar.');
            return;
        }

        // Transform results for export (flatten nested objects)
        const exportData = searchResults.map(result => ({
            'Condominio': result.condoName,
            'Espacio Común': result.commonSpace,
            'RUT Usuario': result.userRut,
            'Fecha de Reserva': new Date(result.reservedAt).toLocaleString(),
            'Fecha de Inicio': new Date(result.startDate).toLocaleString(),
            'Fecha de Fin': new Date(result.endDate).toLocaleString()
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Reservas');

        // Generate and download file
        XLSX.writeFile(workbook, `Reporte_Reservas_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    // Fetch condominiums and reservations on component load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [condominiosResponse, reservationsResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/condominiums'),
                    axios.get('http://localhost:5000/api/reservations'),
                ]);

                // Combine reservation data with condominium names
                const updatedReservations = reservationsResponse.data.map(reservation => {
                    const condo = condominiosResponse.data.find(condo => condo._id === reservation.condominium);
                    return {
                        ...reservation,
                        condoName: condo ? condo.name : 'Desconocido',
                    };
                });

                setCondominios(condominiosResponse.data);
                setReservations(updatedReservations);
                setLoading(false);
            } catch (err) {
                // Comprehensive error handling
                if (err.response) {
                    setError(err.response.data.message || 'Error al cargar los datos.');
                } else if (err.request) {
                    setError('No se pudo conectar con el servidor.');
                } else {
                    setError('Error en la configuración de la solicitud.');
                }
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle search functionality
    const handleSearch = async () => {
        // Validate inputs before search
        if (!selectedCondominio || !selectedSpace) {
            alert('Por favor, seleccione un condominio y un espacio común.');
            return;
        }

        // Validate RUT if provided
        if (!isValidRut(rut)) {
            alert('Por favor, ingrese un RUT válido (formato: 12345678-K).');
            return;
        }

        try {
            // Find the condominium by its _id
            const condominium = condominios.find(condo => condo._id === selectedCondominio);
            
            // Make the GET request to the reservations endpoint
            const response = await axios.get('http://localhost:5000/api/reservations', {
                params: {
                    condominio: condominium.name,
                    espacio: selectedSpace,
                    rut: rut
                }
            });

            // Check if results are empty
            if (response.data.length === 0) {
                alert('No se encontraron resultados para su búsqueda.');
            }

            // Map results to include condominium name and user RUT
            const resultsWithCondoName = response.data.map(result => ({
                ...result,
                condoName: condominium.name,
                userRut: result.user.rut // Assuming the backend populates user.rut
            }));

            setSearchResults(resultsWithCondoName);
        } catch (err) {
            // Comprehensive error handling
            if (err.response) {
                setError(err.response.data.message || 'Error al realizar la búsqueda.');
                alert(err.response.data.message || 'Error al realizar la búsqueda.');
            } else if (err.request) {
                setError('No se pudo conectar con el servidor.');
                alert('No se pudo conectar con el servidor.');
            } else {
                setError('Error en la configuración de la solicitud.');
                alert('Error en la configuración de la solicitud.');
            }
            console.error(err);
        }
    };

    if (loading) return <div className="text-center">Cargando...</div>;
    if (error) return <div className="text-center text-danger">{error}</div>;

    return (
        <div className="bg-dark">
            {/* Header */}
            <div className="header-container d-flex align-items-center">
                <img src="https://i.ibb.co/FW5SBG3/logo-no-background.png" alt="Logo" className="header-logo" />
                <button
                    type="button"
                    className="btn btn-danger logout-button"
                    onClick={handleBack}
                >
                    Volver
                </button>
                <button
                    type="button"
                    className="btn btn-danger logout-button ms-2"
                    onClick={handleLogout}
                >
                    Cerrar Sesión
                </button>
            </div>

            {/* Body */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center">Reporte Uso de Espacios Comunes</h1>
                    </div>
                </div>

                {/* Search Form */}
                <div className="card">
                    <div className="card-header">Filtros de búsqueda</div>
                    <div className="card-body">
                        <div className="row">
                            {/* Condominio Dropdown */}
                            <div className="col-md-6">
                                <label htmlFor="condominioDropdown" className="form-label text-white">Seleccione el condominio:</label>
                                <select
                                    className="form-select"
                                    id="condominioDropdown"
                                    value={selectedCondominio}
                                    onChange={e => setSelectedCondominio(e.target.value)}
                                >
                                    <option value="">Seleccione un condominio...</option>
                                    {condominios.map(condo => (
                                        <option key={condo._id} value={condo._id}>{condo.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Common Space Selection */}
                            <div className="col-md-6">
                                <label htmlFor="espacioDropdown" className="form-label text-white">Seleccione el espacio común:</label>
                                <select
                                    className="form-select"
                                    id="espacioDropdown"
                                    value={selectedSpace}
                                    onChange={e => setSelectedSpace(e.target.value)}
                                >
                                    <option value="">Seleccione un espacio común...</option>
                                    <option value="gym">Gimnasio</option>
                                    <option value="cowork">Cowork</option>
                                    <option value="quincho">Quincho</option>
                                    <option value="estacionamientoVisitas">Estacionamiento de visitas</option>
                                    <option value="salonEventos">Salón de eventos</option>
                                    <option value="canchaDeportes">Cancha de deportes</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            {/* RUT Search */}
                            <div className="mt-3">
                                <label htmlFor="rutInput" className="form-label text-white">Buscar por RUT (opcional):</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="rutInput"
                                    placeholder="Ingrese el RUT (12345678-K)"
                                    value={rut}
                                    onChange={e => setRut(e.target.value)}
                                />
                                {rut && !isValidRut(rut) && (
                                    <small className="text-danger">
                                        RUT inválido. Usar formato 12345678-K
                                    </small>
                                )}
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btn btn-warning w-100 mt-3"
                            onClick={handleSearch}
                        >
                            Buscar
                        </button>
                    </div>
                </div>

{/* Search Results Section */}
<div className="mt-4 text-center" style={{color: 'white'}}>
    <div className="d-flex justify-content-center align-items-center mb-3">
        <h3 style={{color: 'white'}}>Resultados de Búsqueda</h3>
        {searchResults.length > 0 && (
            <button 
                className="btn btn-success ms-3" 
                onClick={handleExport}
                style={{color: 'white'}}
            >
                Exportar Resultados
            </button>
        )}
    </div>
    
    {searchResults.length > 0 ? (
        <div className="table-responsive d-flex justify-content-center">
            <table 
                className="table table-dark" 
                style={{
                    maxWidth: '1000px', 
                    color: 'white', 
                    borderColor: 'white'
                }}
            >
                <thead>
                    <tr>
                        {['Condominio', 'Espacio Común', 'RUT del Usuario', 'Fecha de Reserva', 'Fecha de Inicio', 'Fecha de Fin'].map(header => (
                            <th key={header} style={{color: 'white', borderColor: 'white'}}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {searchResults.map(result => (
                        <tr key={result._id} style={{color: 'white', borderColor: 'white'}}>
                            <td style={{color: 'white', borderColor: 'white'}}>{result.condoName}</td>
                            <td style={{color: 'white', borderColor: 'white'}}>{result.commonSpace}</td>
                            <td style={{color: 'white', borderColor: 'white'}}>{result.userRut}</td>
                            <td style={{color: 'white', borderColor: 'white'}}>{new Date(result.reservedAt).toLocaleString()}</td>
                            <td style={{color: 'white', borderColor: 'white'}}>{new Date(result.startDate).toLocaleString()}</td>
                            <td style={{color: 'white', borderColor: 'white'}}>{new Date(result.endDate).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : (
        <p style={{color: 'white'}}>No se encontraron resultados para los filtros seleccionados.</p>
    )}
    
    {searchResults.length > 0 && (
        <div style={{color: 'white'}} className="text-center mt-2">
            Total de Resultados: {searchResults.length}
        </div>
    )}
</div>
            </div>

            {/* Footer */}
            <footer className="bg-dark py-3 mt-5">
                <div className="container">
                    <p className="text-center">&copy; {new Date().getFullYear()} Todos los derechos reservados</p>
                </div>
            </footer>
        </div>
    );
};

export default ReporteUsoEspaciosComunes;