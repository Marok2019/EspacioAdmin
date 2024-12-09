import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReporteUsoEspaciosComunes = () => {
    const navigate = useNavigate();
    const [condominios, setCondominios] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [selectedCondominio, setSelectedCondominio] = useState('');
    const [selectedSpace, setSelectedSpace] = useState('');
    const [rut, setRut] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Manejar navegación según rol
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

    const handleLogout = () => {
        localStorage.clear();
        navigate('/auth');
    };

    // Obtener datos de condominios y reservas al cargar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [condominiosResponse, reservationsResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/condominios'),
                    axios.get('http://localhost:5000/api/reservations'),
                ]);

                setCondominios(condominiosResponse.data);
                setReservations(reservationsResponse.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error al cargar los datos.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Manejar la búsqueda
    const handleSearch = () => {
        const filteredReservations = reservations.filter(reservation => {
            return (
                (selectedCondominio ? reservation.condominio === selectedCondominio : true) &&
                (selectedSpace ? reservation.commonSpace === selectedSpace : true) &&
                (rut ? reservation.userRut === rut : true)
            );
        });

        console.log('Resultados filtrados:', filteredReservations);
        alert('Búsqueda realizada. Consulta la consola para ver los resultados.');
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

                {/* Formulario */}
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
                                    aria-label="Condominio Selection"
                                    value={selectedCondominio}
                                    onChange={e => setSelectedCondominio(e.target.value)}
                                >
                                    <option value="">Seleccione un condominio...</option>
                                    {condominios.map(condo => (
                                        <option key={condo._id} value={condo._id}>{condo.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Selección de Espacio Común */}
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
                                <label htmlFor="rutInput" className="form-label text-white">Buscar por RUT:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="rutInput"
                                    placeholder="Ingrese el RUT"
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
