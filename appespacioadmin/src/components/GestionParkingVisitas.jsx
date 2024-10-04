import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GestionParkingVisitas = () => {
    const [reservas, setReservas] = useState([]);
    const [selectedCondominio, setSelectedCondominio] = useState('');
    const navigate = useNavigate();

    const reservasEjemplo = [
        { id: 1, titular: 'Juan Pérez', fecha_inicio: '2023-05-15', hora_inicio: '08:00', fecha_termino: '2023-05-16', hora_termino: '18:00' },
        { id: 2, titular: 'María García', fecha_inicio: '2023-05-16', hora_inicio: '09:30', fecha_termino: '2023-05-17', hora_termino: '19:30' },
        { id: 3, titular: 'Carlos López', fecha_inicio: '2023-05-17', hora_inicio: '11:00', fecha_termino: '2023-05-18', hora_termino: '21:00' },
    ];

    useEffect(() => {
        // Simular carga de datos
        setReservas(reservasEjemplo);
    }, []);

    const cancelBooking = (estacionamientoId) => {
        if (window.confirm(`¿Estás seguro de que quieres cancelar esta reserva? ID: ${estacionamientoId}`)) {
            // Lógica para cancelar la reserva (simulada)
            alert(`Reserva cancelada exitosamente. ID: ${estacionamientoId}`);
            setReservas(reservas.filter(reserva => reserva.id !== estacionamientoId));
        }
    };

    return (
        <div className="bg-dark">
            {/* Header */}
            <div className="header-container d-flex align-items-center">
                <img src="https://i.ibb.co/FW5SBG3/logo-no-background.png" alt="Logo" className="header-logo" />
                <div className="ml-auto">
                    <button type="button" className="btn btn-danger logout-button" onClick={() => navigate('/conserje-main')}>Volver</button>
                    <button type="button" className="btn btn-warning ml-2" onClick={() => navigate('/auth')}>Cerrar Sesión</button>
                </div>
            </div>

            {/* Body */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center">Gestión de Estacionamiento de Visitas</h1>
                    </div>
                </div>

                {/* Formulario */}
                <div className="card">
                    <div className="card-header">Filtros de búsqueda</div>
                    <div className="card-body">
                        <div className="row">
                            {/* Condominio Dropdown */}
                            <div className="mb-3">
                                <label htmlFor="condominioDropdown" className="form-label text-white">Seleccione el condominio:</label>
                                <select className="form-select" id="condominioDropdown" onChange={e => setSelectedCondominio(e.target.value)} required>
                                    <option selected disabled>Seleccione un condominio...</option>
                                    <option value="condominio1">Condominio 1</option>
                                    <option value="condominio2">Condominio 2</option>
                                    <option value="condominio3">Condominio 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            {/* Estacionamiento Dropdown */}
                            <div className="mb-3">
                                <label htmlFor="espacioDropdown" className="form-label text-white">Seleccione el estacionamiento:</label>
                                <select className="form-select" id="espacioDropdown" aria-label=".form-select-lg example">
                                    <option selected>Seleccione un estacionamiento...</option>
                                    <option value="space1">Espacio 1</option>
                                    <option value="space2">Espacio 2</option>
                                    <option value="space3">Espacio 3</option>
                                    <option value="space4">Espacio 4</option>
                                </select>
                            </div>
                        </div>
                        <div className="row justify-content-center text-center mt-4">
                            {/* Contenido Tabla */}
                            <div className="col-md-12">
                                <table className="table table-dark table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ID Reserva</th>
                                            <th>Titular</th>
                                            <th>Fecha y Hora Inicio</th>
                                            <th>Fecha y Hora Término</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservas.map(estacionamiento => (
                                            <tr key={estacionamiento.id}>
                                                <td>{estacionamiento.id}</td>
                                                <td>{estacionamiento.titular}</td>
                                                <td>{`${estacionamiento.fecha_inicio} ${estacionamiento.hora_inicio}`}</td>
                                                <td>{`${estacionamiento.fecha_termino} ${estacionamiento.hora_termino}`}</td>
                                                <td>
                                                    <button className="btn btn-warning btn-sm" onClick={() => cancelBooking(estacionamiento.id)}>Cancelar Reserva</button>
                                                </td>
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
                    <p className="text-center">&copy; <span id="current-year">{new Date().getFullYear()}</span> Todos los derechos reservados</p>
                </div>
            </footer>
        </div>
    );
};

export default GestionParkingVisitas;
