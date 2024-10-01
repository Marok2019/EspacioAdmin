// src/components/ConserjeMain.js
import React, { useEffect } from 'react';
import '../css/conserjeMainStyles.css'; // Ensure your CSS file is imported
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ConserjeMain = () => {
    useEffect(() => {
        // Set the current year in the footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }, []);

    const handleLogout = () => {
        window.location.href = 'auth.html'; // Redirect to the login page
    };

    const handleCardClick = (link) => {
        window.location.href = link; // Redirect to the appropriate page
    };

    return (
        <div className="bg-dark">
            {/* New header section */}
            <div className="header-container d-flex align-items-center">
                <img
                    src="https://i.ibb.co/FW5SBG3/logo-no-background.png"
                    alt="Logo"
                    className="header-logo"
                />
                <button type="button" className="btn btn-danger logout-button" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center">Bienvenido/a, Conserje</h1>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
                    <div className="col" onClick={() => handleCardClick('gestionUsoEspaciosComunes.html')}>
                        <div className="card">
                            <img src="gestion-de-equipos.png" alt="Gestionar uso - Espacios Comunes" />
                            <div className="card-body">
                                <h5 className="card-title">Gestionar uso - Espacios Comunes</h5>
                                <p className="card-text">Acceso rápido a la gestión de espacios comunes.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col" onClick={() => handleCardClick('gestionParkingVisitas.html')}>
                        <div className="card">
                            <img src="ajuste.png" alt="Gestionar uso - Estacionamiento Visitas" />
                            <div className="card-body">
                                <h5 className="card-title">Gestionar uso - Estacionamiento Visitas</h5>
                                <p className="card-text">Administración rápida del estacionamiento visitas.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col" onClick={() => handleCardClick('reservaEspaciosComunes.html')}>
                        <div className="card">
                            <img src="cita.png" alt="Reserva - Espacios Comunes" />
                            <div className="card-body">
                                <h5 className="card-title">Reserva - Espacios Comunes</h5>
                                <p className="card-text">Facilidad para reservar espacios comunes.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col" onClick={() => handleCardClick('reportarGastosComunes.html')}>
                        <div className="card">
                            <img src="administrativo.png" alt="Reportar - Gastos Comunes" />
                            <div className="card-body">
                                <h5 className="card-title">Reportar - Gastos Comunes</h5>
                                <p className="card-text">Generación rápida de reportes de gastos comunes.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col" onClick={() => handleCardClick('gestionGastosComunes.html')}>
                        <div className="card">
                            <img src="gasto.png" alt="Buscar - Gastos Comunes" />
                            <div className="card-body">
                                <h5 className="card-title">Buscar - Gastos Comunes</h5>
                                <p className="card-text">Búsqueda eficiente de gastos comunes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-dark py-3 mt-5">
                <div className="container">
                    <p className="text-center">&copy; <span id="current-year"></span> Todos los derechos reservados</p>
                </div>
            </footer>
        </div>
    );
};

export default ConserjeMain;
