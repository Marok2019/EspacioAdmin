import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReservaEspaciosComunes = () => {
    const navigate = useNavigate();
    const [selectedCondominio, setSelectedCondominio] = useState('');
    const [selectedSpace, setSelectedSpace] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirección según rol
    const handleVolver = () => {
        const userRole = localStorage.getItem('role');
        switch (userRole) {
            case 'superadmin':
                navigate('/superadmin-main');
                break;
            case 'directive':
                navigate('/directiva');
                break;
            case 'resident':
                navigate('/residente-main');
                break;
            case 'admincondo':
                navigate('/admincondominio-main');
                break;
            case 'conserje':
                navigate('/conserje-main');
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedCondominio || !selectedSpace || !startDate || !endDate) {
            alert("Por favor, complete todos los campos para confirmar la reserva.");
            return;
        }

        // Validar fechas
        if (new Date(startDate) >= new Date(endDate)) {
            alert("La fecha de inicio debe ser anterior a la fecha de término.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/reservations', {
                userId: localStorage.getItem('userId'), // Suponiendo que el ID de usuario está en el localStorage
                commonSpaceId: selectedSpace,
                reservedAt: new Date(startDate).toISOString(),
            });

            if (response.status === 201) {
                alert('Reserva realizada con éxito');
            } else {
                alert('No se pudo realizar la reserva');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            alert('Error al realizar la solicitud');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-dark">
            {/* Header */}
            <div className="header-container d-flex align-items-center">
                <img src="https://i.ibb.co/FW5SBG3/logo-no-background.png" alt="Logo" className="header-logo" />
                <button
                    type="button"
                    className="btn btn-danger logout-button"
                    onClick={handleVolver}
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

            {/* Cuerpo Principal */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center text-white">Reservar Espacios Comunes</h1>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">Formulario de Reserva</div>
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            {/* Selección de Condominios */}
                            <div className="mb-3">
                                <label htmlFor="condominioDropdown" className="form-label text-white">Seleccione el condominio:</label>
                                <select
                                    className="form-select"
                                    id="condominioDropdown"
                                    value={selectedCondominio}
                                    onChange={(e) => setSelectedCondominio(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccione un condominio...</option>
                                    <option value="condominio1">Condominio 1</option>
                                    <option value="condominio2">Condominio 2</option>
                                    <option value="condominio3">Condominio 3</option>
                                </select>
                            </div>

                            {/* Selección de Espacios Comunes */}
                            <div className="mb-3">
                                <label htmlFor="espacioDropdown" className="form-label text-white">Seleccione el espacio común:</label>
                                <select
                                    className="form-select"
                                    id="espacioDropdown"
                                    value={selectedSpace}
                                    onChange={(e) => setSelectedSpace(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccione un espacio común...</option>
                                    <option value="gym">Gimnasio</option>
                                    <option value="cowork">Cowork</option>
                                    <option value="quincho">Quincho</option>
                                    <option value="estacionamientoVisitas">Estacionamiento de visitas</option>
                                    <option value="salonEventos">Salón de eventos</option>
                                </select>
                            </div>

                            {/* Fecha de Inicio y Fin */}
                            <div className="mb-3">
                                <label htmlFor="startDate" className="form-label text-white">Fecha de Inicio:</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="endDate" className="form-label text-white">Fecha de Término:</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Botón de Envío */}
                            <button type="submit" className="btn btn-warning w-100 mt-3" disabled={loading}>
                                {loading ? 'Procesando...' : 'Confirmar Reserva'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark py-3 mt-5">
                <div className="container">
                    <p className="text-center text-white">&copy; {new Date().getFullYear()} Todos los derechos reservados</p>
                </div>
            </footer>
        </div>
    );
};

export default ReservaEspaciosComunes;
