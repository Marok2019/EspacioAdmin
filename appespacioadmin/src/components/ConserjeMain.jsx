// ConserjeMain.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

// Importa las imágenes
import imgGestionEspacios from '../images/img-gestionEquipos.png'; 
import imgEstacionamiento from '../images/img-ajuste.png'; 
import imgReservarEspacios from '../images/img-calendario.png'; 
import imgReportarGastos from '../images/img-administrativo.png'; 
import imgConsultarGastos from '../images/img-gasto.png'; 

const ConserjeMain = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-dark d-flex flex-column min-vh-100">
            {/* Header */}
            <div className="header-container d-flex align-items-center">
                <img
                    src="https://i.ibb.co/FW5SBG3/logo-no-background.png"
                    alt="Logo"
                    className="header-logo"
                />
                <button type="button" className="btn btn-danger logout-button" onClick={() => navigate('/auth')}>
                    Cerrar sesión
                </button>
            </div>

            {/* Body */}
            <div className="container mt-5 flex-grow-1">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center text-white">Bienvenido/a, Conserje</h1>
                    </div>
                </div>

                {/* Cards */}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
                    {/* Gestionar Espacios Comunes Card */}
                    <div className="col">
                        <div className="card transparent-card" onClick={() => navigate('/gestion-uso-espacios-comunes')}>
                            <img src={imgGestionEspacios} alt="Gestionar Uso - Espacios Comunes" />
                            <div className="card-body">
                                <h5 className="card-title">Gestionar Uso - Espacios Comunes</h5>
                                <p className="card-text">Acceso rápido a la gestión de espacios comunes.</p>
                            </div>
                        </div>
                    </div>

                    {/* Gestionar Estacionamiento Visitas Card */}
                    <div className="col">
                        <div className="card transparent-card" onClick={() => navigate('/gestion-parking-visitas')}>
                            <img src={imgEstacionamiento} alt="Gestionar Uso - Estacionamiento Visitas" />
                            <div className="card-body">
                                <h5 className="card-title">Gestionar Uso - Estacionamiento Visitas</h5>
                                <p className="card-text">Administración rápida del estacionamiento visitas.</p>
                            </div>
                        </div>
                    </div>

                    {/* Reserva Espacios Comunes Card */}
                    <div className="col">
                        <div className="card transparent-card" onClick={() => navigate('/reservar-espacio-comun')}>
                            <img src={imgReservarEspacios} alt="Reservar - Espacios Comunes" />
                            <div className="card-body">
                                <h5 className="card-title">Reservar - Espacios Comunes</h5>
                                <p className="card-text">Facilidad para reservar espacios comunes.</p>
                            </div>
                        </div>
                    </div>

                    {/* Reportar GGCC Card */}
                    <div className="col">
                        <div className="card transparent-card" onClick={() => navigate('/reportar-gastos-comunes')}>
                            <img src={imgReportarGastos} alt="Reportar - Gastos Comunes" />
                            <div className="card-body">
                                <h5 className="card-title">Reportar - Gastos Comunes</h5>
                                <p className="card-text">Generación rápida de reportes de gastos comunes.</p>
                            </div>
                        </div>
                    </div>

                    {/* Consultar GGCC Card */}
                    <div className="col">
                        <div className="card transparent-card" onClick={() => navigate('/consulta-gastos-comunes')}>
                            <img src={imgConsultarGastos} alt="Consultar - Gastos Comunes" />
                            <div className="card-body">
                                <h5 className="card-title">Consultar - Gastos Comunes</h5>
                                <p className="card-text">Búsqueda eficiente de gastos comunes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark py-3 mt-auto">
                <div className="container">
                    <p className="text-center text-white">&copy; <span id="current-year"></span> Todos los derechos reservados</p>
                </div>
            </footer>
        </div>
    );
};

export default ConserjeMain;
