import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GestionGastosComunes = () => {
    const navigate = useNavigate();
    const [condominios, setCondominios] = useState([]);
    const [gastos, setGastos] = useState([]);
    const [selectedCondominio, setSelectedCondominio] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [rut, setRut] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    // Month names in Spanish
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Manejo de navegación basado en el rol
    const handleBack = () => {
        const userRole = localStorage.getItem('role');
        switch (userRole) {
            case 'admincondo':
                navigate('/admin-condominio');
                break;
           default:
                alert('Rol no válido o no definido.');
                navigate('/auth');
        }
    };

    // Manejo de Logout
    const handleLogout = () => {
        localStorage.clear();
        navigate('/auth');
    };

    // Cargar condominios
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [condominiosResponse, gastosResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/condominiums'),
                    axios.get('http://localhost:5000/api/common-expenses'),
                ]);

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

    // Manejo de búsqueda de gastos comunes
    const handleSearch = async () => {
        if (!selectedCondominio || !selectedMonth ) {
            alert('Por favor seleccione un condominio y mes.');
            return;
        }
    
        try {
            const response = await axios.get('http://localhost:5000/api/common-expenses', {
                params: {
                    condominiumId: selectedCondominio,
                    month: selectedMonth,
                    rut: rut
                }
            });
            
            if (response.data.length === 0) {
                alert('No se encontraron resultados para su búsqueda.');
            }

            const resultsWithCondoName = response.data.map(result => ({
                ...result,
                condoName: condominios.find(condo => condo._id === selectedCondominio).name,
                month: monthNames[parseInt(selectedMonth) - 1]
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

    // Manejo de cancelación de gasto común (si aplica)
    const handleCancelGasto = async (gastoId) => {
        if (!gastoId) {
            alert('ID de gasto común no válido');
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/common-expenses/${gastoId}`);
            setGastos(gastos.filter(gasto => gasto._id !== gastoId));
            alert('Gasto común cancelado exitosamente.');
        } catch (err) {
            alert('Error al cancelar el gasto común.');
            console.error(err);
        }
    };

    if (loading) return <div className="text-center">Cargando...</div>;
    if (error) return <div className="text-center text-danger">{error}</div>;

    return (
        <div className="bg-dark">
            <div className="header-container d-flex align-items-center">
                <img src="https://i.ibb.co/FW5SBG3/logo-no-background.png" alt="Logo" className="header-logo" />
                <button
                    type="button"
                    className="btn btn-danger logout-button"
                    onClick={handleBack}
                >
                    Volver
                </button>
            </div>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center">Gestión de Gastos Comunes</h1>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">Filtros de búsqueda</div>
                    <div className="card-body">
                        <div className="row">
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

                            <div className="col-md-6">
                                <label htmlFor="monthDropdown" className="form-label text-white">Seleccione el mes:</label>
                                <select
                                    className="form-select"
                                    id="monthDropdown"
                                    value={selectedMonth}
                                    onChange={e => setSelectedMonth(e.target.value)}
                                >
                                    <option value="">Seleccione un mes...</option>
                                    <option value="enero">Enero</option>
                                    <option value="febrero">Febrero</option>
                                    <option value="marzo">Marzo</option>
                                    <option value="abril">Abril</option>
                                    <option value="mayo">Mayo</option>
                                    <option value="junio">Junio</option>
                                    <option value="julio">Julio</option>
                                    <option value="agosto">Agosto</option>
                                    <option value="septiembre">Septiembre</option>
                                    <option value="octubre">Octubre</option>
                                    <option value="noviembre">Noviembre</option>
                                    <option value="diciembre">Diciembre</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
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

                <div className="mt-4 text-center" style={{color: 'white'}}>
                    <h3>Resultados de Gastos Comunes</h3>
                    {gastos.length > 0 ? (
                        <div className="table-responsive d-flex justify-content-center">
                            <table 
                                className="table table-dark" 
                                style={{maxWidth: '1000px', color: 'white', borderColor: 'white'}}
                            >
                                <thead>
                                    <tr>
                                        {['Condominio', 'RUT del Usuario', 'Mes', 'Monto', 'Descripción', 'Acciones'].map(header => (
                                            <th key={header} style={{color: 'white', borderColor: 'white'}}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {gastos.map(gasto => (
                                        <tr key={gasto._id} style={{color: 'white', borderColor: 'white'}}>
                                            <td>{gasto.condoName}</td>
                                            <td>{gasto.userId.email}</td>
                                            <td>{gasto.month}</td>
                                            <td>{gasto.amount}</td>
                                            <td>{gasto.description}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleCancelGasto(gasto._id)}
                                                >
                                                    Cancelar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No se encontraron resultados para los filtros seleccionados.</p>
                    )}
                </div>
            </div>

            <footer className="bg-dark py-3 mt-5">
                <div className="container">
                    <p className="text-center">&copy; {new Date().getFullYear()} Todos los derechos reservados</p>
                </div>
            </footer>
        </div>
    );
};

export default GestionGastosComunes;
