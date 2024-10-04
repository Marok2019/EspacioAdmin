import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReservaEspaciosComunes = () => {
    const navigate = useNavigate();

    const handleVolver = () => {
        navigate('/residente-main'); // Cambia la ruta a la de tu componente ResidenteMain
    };

    const handleLogout = () => {
        navigate('/auth'); // Cambia la ruta a la de tu componente Auth
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const selectedCondominium = event.target.condominioDropdown.value;
        const selectedSpace = event.target.espacioDropdown.value;
        const startDate = event.target.startDateInput.value;
        const endDate = event.target.endDateInput.value;

        // Valida Fechas
        if (new Date(startDate) >= new Date(endDate)) {
            alert("La fecha de inicio debe ser anterior a la fecha de término.");
            return;
        }

        // Simula llamado API
        const response = await fetch(`/api/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                condominio: selectedCondominium,
                espacio_comun: selectedSpace,
                fecha_inicio: startDate,
                fecha_fin: endDate
            })
        });

        if (response.ok) {
            const result = await response.json();
            alert(`Reserva confirmada con éxito. ID Reserva: ${result.id_reserva}`);
        } else {
            alert("Error al realizar la reserva. Por favor, inténtelo nuevamente.");
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

            {/* Body */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center">Reservar Espacios Comunes</h1>
                    </div>
                </div>

                {/* Formulario */}
                <div className="card">
                    <div className="card-header">Filtros de búsqueda</div>
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="row">
                                {/* Condominio Dropdown */}
                                <div className="mb-3">
                                    <label htmlFor="condominioDropdown" className="form-label text-white">Seleccione el condominio:</label>
                                    <select className="form-select" id="condominioDropdown" required>
                                        <option selected disabled>Seleccione un condominio...</option>
                                        <option value="condominio1">Condominio 1</option>
                                        <option value="condominio2">Condominio 2</option>
                                        <option value="condominio3">Condominio 3</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                {/* Common Space Selection */}
                                <div className="mb-3">
                                    <label htmlFor="espacioDropdown" className="form-label text-white">Seleccione el espacio común:</label>
                                    <select className="form-select" id="espacioDropdown" required>
                                        <option selected>Seleccione un espacio común...</option>
                                        <option value="space1">Sala de reuniones</option>
                                        <option value="space2">Área de descanso</option>
                                        <option value="space3">Salón de eventos</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row justify-content-between text-center mt-auto">
                                {/* Starting Date */}
                                <div className="col-6 ms-auto">
                                    <div className="card p-auto ms-3">
                                        <div className="card-header">Fecha y hora de inicio</div>
                                        <div className="card-body">
                                            <input type="datetime-local" id="startDateInput" required />
                                        </div>
                                    </div>
                                </div>

                                {/* Ending Date */}
                                <div className="col-6">
                                    <div className="card p-auto me-3">
                                        <div className="card-header">Fecha y hora de término</div>
                                        <div className="card-body">
                                            <input type="datetime-local" id="endDateInput" required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-warning w-100 mt-3">Confirmar Reserva</button>
                        </div>
                    </form>
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

export default ReservaEspaciosComunes;
