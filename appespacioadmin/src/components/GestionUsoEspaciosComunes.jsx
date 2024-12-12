import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GestionUsoEspaciosComunes = () => {
    const navigate = useNavigate();
    const [condominios, setCondominios] = useState([]);
    const [reservations, setReservations] = useState([]); // Inicializamos vacío
    const [selectedCondominio, setSelectedCondominio] = useState('');
    const [selectedSpace, setSelectedSpace] = useState('');
    const [rut, setRut] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Manejo de navegación basado en el rol
    const handleBack = () => {
        const userRole = localStorage.getItem('role');
        switch (userRole) {
            case 'superadmin':
                navigate('/superadmin-main');
                break;
            case 'directive':
                navigate('/directiva');
                break;
            case 'conserje':
                navigate('/conserje-main');
                break;
            default:
                alert('Rol no válido o no definido.');
                navigate('/auth');
        }
    };

    // Cargar condominios
    useEffect(() => {
        const fetchData = async () => {
            try {
                const condominiosResponse = await axios.get('http://localhost:5000/api/condominiums');
                setCondominios(condominiosResponse.data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los datos de condominios.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Manejo de búsqueda
    const handleSearch = async () => {
        if (!selectedCondominio || !selectedSpace) {
            alert('Por favor seleccione un condominio y un espacio común.');
            return;
        }

        try {
            // Encuentra el condominio por su _id
            const condominium = condominios.find(condo => condo._id === selectedCondominio);

            // Realiza la búsqueda de reservas
            const response = await axios.get('http://localhost:5000/api/reservations', {
                params: {
                    condominio: condominium.name,
                    espacio: selectedSpace,
                    rut: rut
                }
            });

            // Asignamos el nombre del condominio y RUT del usuario a los resultados
            const resultsWithCondoName = response.data.map(result => ({
                ...result,
                condoName: condominium.name,
                userRut: result.user.rut
            }));

            setReservations(resultsWithCondoName);
        } catch (err) {
            setError('Error al realizar la búsqueda.');
        }
    };

    const handleCancelReservation = async (reservationId) => {
        if (!reservationId) {
            alert('ID de reserva no válido');
            return;
        }
        console.log("ID de reserva a cancelar:", reservationId); // Verifica el ID en la consola
        try {
            await axios.delete(`http://localhost:5000/api/reservations/${reservationId}`);
            setReservations(reservations.filter(reservation => reservation._id !== reservationId));
            alert('Reserva cancelada exitosamente.');
        } catch (err) {
            alert('Error al cancelar la reserva.');
            console.error(err);  // Muestra el error para obtener más detalles
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
                        <h1 className="text-center">Gestión de Uso de Espacios Comunes</h1>
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
                    <h3 style={{color: 'white'}}>Resultados de Búsqueda</h3>
                    {reservations.length > 0 ? (
                        <div className="table-responsive d-flex justify-content-center">
                            <table 
                                className="table table-dark" 
                                style={{maxWidth: '1000px', color: 'white', borderColor: 'white'}}
                            >
                                <thead>
                                    <tr>
                                        {['Condominio', 'Espacio Común', 'RUT del Usuario', 'Fecha de Reserva', 'Fecha de Inicio', 'Fecha de Fin', 'Acciones'].map(header => (
                                            <th key={header} style={{color: 'white', borderColor: 'white'}}>
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map(result => (
                                        <tr key={result._id} style={{color: 'white', borderColor: 'white'}}>
                                            <td>{result.condoName}</td>
                                            <td className="text-center">{result.commonSpace}</td>
                                            <td>{result.userRut}</td>
                                            <td>{new Date(result.reservedAt).toLocaleString()}</td>
                                            <td>{new Date(result.startDate).toLocaleString()}</td>
                                            <td>{new Date(result.endDate).toLocaleString()}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleCancelReservation(result._id)}
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
                        <p style={{color: 'white'}}>No se encontraron resultados para los filtros seleccionados.</p>
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

export default GestionUsoEspaciosComunes;
