import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GestionUsoEspaciosComunes = () => {
    const [reservas, setReservas] = useState([]);
    const [condominio, setCondominio] = useState('');
    const [espacio, setEspacio] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Datos de reserva inicial
        const reservaEspacioComun = [
            { id: 1, residente: 'Juan Pérez', fecha_inicio: '2023-05-15T08:00', fecha_termino: '2023-05-16T18:00' },
            { id: 2, residente: 'María García', fecha_inicio: '2023-05-16T09:30', fecha_termino: '2023-05-17T19:30' },
            { id: 3, residente: 'Carlos López', fecha_inicio: '2023-05-17T11:00', fecha_termino: '2023-05-18T21:00' }
        ];
        setReservas(reservaEspacioComun);
    }, []);

    const llenarTabla = () => {
        return reservas.map((reserva) => (
            <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td>{reserva.residente}</td>
                <td>{new Date(reserva.fecha_inicio).toLocaleString()}</td>
                <td>{new Date(reserva.fecha_termino).toLocaleString()}</td>
                <td>
                    <button className="btn btn-warning btn-sm" onClick={() => cancelBooking(reserva.id)}>Cancelar Reserva</button>
                </td>
            </tr>
        ));
    };

    const cancelBooking = (bookingId) => {
        if (window.confirm(`¿Estás seguro de que quieres cancelar esta reserva? ID: ${bookingId}`)) {
            // Simular una solicitud de fetch
            setReservas(reservas.filter(reserva => reserva.id !== bookingId));
            alert('Reserva cancelada exitosamente.');
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
                        <h1 className="text-center">Gestión de Uso de Espacios Comunes</h1>
                    </div>
                </div>

                {/* Formulario */}
                <div className="card">
                    <div className="card-header">Filtros de búsqueda</div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="condominioDropdown" className="form-label text-white">Seleccione el condominio:</label>
                            <select className="form-select" id="condominioDropdown" aria-label="Condominio Selection" onChange={(e) => setCondominio(e.target.value)} required>
                                <option selected disabled>Seleccione un condominio...</option>
                                <option value="condominio1">Condominio 1</option>
                                <option value="condominio2">Condominio 2</option>
                                <option value="condominio3">Condominio 3</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="espacioDropdown" className="form-label text-white">Seleccione el espacio común:</label>
                            <select className="form-select" id="espacioDropdown" onChange={(e) => setEspacio(e.target.value)} required>
                                <option selected>Seleccione un espacio común</option>
                                <option value="space1">Espacio 1</option>
                                <option value="space2">Espacio 2</option>
                                <option value="space3">Espacio 3</option>
                                <option value="space4">Espacio 4</option>
                            </select>
                        </div>

                        {/* Contenido Tabla */}
                        <div className="col-md-12">
                            <table className="table table-dark table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID Reserva</th>
                                        <th>Residente</th>
                                        <th>Fecha y Hora Inicio</th>
                                        <th>Fecha y Hora Término</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {llenarTabla()}
                                </tbody>
                            </table>
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

export default GestionUsoEspaciosComunes;
