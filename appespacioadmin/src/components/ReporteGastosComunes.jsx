import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';

const ReporteGastosComunes = () => {
    const navigate = useNavigate();
    const [condominios, setCondominios] = useState([]);
    const [gastos, setGastos] = useState([]);
    const [selectedCondominio, setSelectedCondominio] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    // Generate years for dropdown (last 5 years)
    const yearsArray = Array.from(
        { length: 5 }, 
        (_, i) => new Date().getFullYear() - i
    );

    // Month names in Spanish
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

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
            'Mes': result.month,
            'Año': result.year,
            'Tipo de Gasto': result.description,
            'Monto': `$${result.amount.toLocaleString()}`,
            'Fecha de Registro': new Date(result.createdAt).toLocaleString()
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Gastos Comunes');

        // Generate and download file
        XLSX.writeFile(workbook, `Reporte_Gastos_Comunes_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    // Fetch condominiums and expenses on component load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [condominiosResponse, gastosResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/condominiums'),
                    axios.get('http://localhost:5000/api/common-expenses'),
                ]);

                // Combine expense data with condominium names
                const updatedGastos = gastosResponse.data.map(gasto => {
                    const condo = condominiosResponse.data.find(condo => condo._id === gasto.condominium);
                    return {
                        ...gasto,
                        condoName: condo ? condo.name : 'Desconocido',
                    };
                });

                setCondominios(condominiosResponse.data);
                setGastos(updatedGastos);
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
        if (!selectedCondominio || !selectedMonth || !selectedYear) {
          alert('Por favor, seleccione un condominio, mes y año.');
          return;
        }
      
        try {
          // Make the GET request to the common expenses endpoint
          const response = await axios.get('http://localhost:5000/api/common-expenses', {
            params: {
              condominiumId: selectedCondominio, // Enviar el ID del condominio
              month: selectedMonth,
              year: selectedYear
            }
          });
      
          // Check if results are empty
          if (response.data.length === 0) {
            alert('No se encontraron resultados para su búsqueda.');
          }
      
          // Map results to include condominium name
          const resultsWithCondoName = response.data.map(result => ({
            ...result,
            condoName: condominios.find(condo => condo._id === selectedCondominio).name,
            month: monthNames[parseInt(selectedMonth) - 1],
            year: selectedYear
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
                        <h1 className="text-center">Reporte de Gastos Comunes</h1>
                    </div>
                </div>

                {/* Search Form */}
                <div className="card">
                    <div className="card-header">Filtros de búsqueda</div>
                    <div className="card-body">
                        <div className="row">
                            {/* Condominio Dropdown */}
                            <div className="col-md-4">
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

                            {/* Month Selection */}
                            <div className="col-md-4">
                                <label htmlFor="mesDropdown" className="form-label text-white">Seleccione el mes:</label>
                                <select
                                    className="form-select"
                                    id="mesDropdown"
                                    value={selectedMonth}
                                    onChange={e => setSelectedMonth(e.target.value)}
                                >
                                    <option value="">Seleccione un mes...</option>
                                    {monthNames.map((month, index) => (
                                        <option key={month} value={index + 1}>{month}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Year Selection */}
                            <div className="col-md-4">
                                <label htmlFor="yearDropdown" className="form-label text-white">Seleccione el año:</label>
                                <select
                                    className="form-select"
                                    id="yearDropdown"
                                    value={selectedYear}
                                    onChange={e => setSelectedYear(e.target.value)}
                                >
                                    <option value="">Seleccione un año...</option>
                                    {yearsArray.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
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
                                        {['Condominio', 'Mes', 'Año', 'Tipo de Gasto', 'Monto', 'Fecha de Registro'].map(header => (
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
                                            <td style={{color: 'white', borderColor: 'white'}}>{result.month}</td>
                                            <td style={{color: 'white', borderColor: 'white'}}>{result.year}</td>
                                            <td style={{color: 'white', borderColor: 'white'}}>{result.description}</td>
                                            <td style={{color: 'white', borderColor: 'white'}}>
                                                ${result.amount.toLocaleString()}
                                            </td>
                                            <td style={{color: 'white', borderColor: 'white'}}>
                                                {new Date(result.createdAt).toLocaleString()}
                                            </td>
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

export default ReporteGastosComunes;