// DirectivaMain.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para manejar la navegación
import logo from '../images/logo-no-background.png'; // Actualiza la ruta según la ubicación de tu imagen
import imgGestionEspacios from '../images/img-gestionEquipos.png'; // Actualiza la ruta según la ubicación de tu imagen
import imgAdministrativo from '../images/img-administrativo.png'; // Actualiza la ruta según la ubicación de tu imagen
import imgDeudor from '../images/img-deudorCuenta.png'; // Actualiza la ruta según la ubicación de tu imagen
import imgGasto from '../images/img-gasto.png'; // Actualiza la ruta según la ubicación de tu imagen

const DirectivaMain = () => {
    const navigate = useNavigate();

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        navigate('/auth'); // Redirige a la ruta de autenticación
    };

    return (
        <div className="bg-dark">
            {/* Header */}
            <div className="header-container d-flex align-items-center justify-content-between">
                <img src={logo} alt="Logo" className="header-logo" />
                <button
                    type="button"
                    className="btn btn-danger logout-button"
                    onClick={handleLogout} // Llama a la función para cerrar sesión
                >
                    Cerrar Sesión
                </button>
            </div>

            {/* Body */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center">Bienvenido/a, Directiva</h1>
                    </div>
                </div>

                {/* Cards */}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
                    {/* Reportar Uso de Espacios Card */}
                    <div className="col">
                        <div className="card" onClick={() => navigate('/reporte-uso-espacios-comunes')}>
                            <img src={imgGestionEspacios} alt="Reportar Uso - Espacios Comunes" />
                            <div className="card-body">
                                <h5 className="card-title">Reportar Uso - Espacios Comunes</h5>
                                <p className="card-text">Genera reportes sobre el uso de los espacios comunes.</p>
                            </div>
                        </div>
                    </div>

                    {/* Reportar GGCC Card */}
                    <div className="col">
                        <div className="card" onClick={() => navigate('/reportar-gastos-comunes')}>
                            <img src={imgAdministrativo} alt="Reportar - Gastos Comunes" />
                            <div className="card-body">
                                <h5 className="card-title">Reportar - Gastos Comunes</h5>
                                <p className="card-text">Generación rápida de reportes de gastos comunes.</p>
                            </div>
                        </div>
                    </div>

                    {/* Reportar Morosidad Card */}
                    <div className="col">
                        <div className="card" onClick={() => navigate('/reporte-morosidad')}>
                            <img src={imgDeudor} alt="Reportar - Morosidad" />
                            <div className="card-body">
                                <h5 className="card-title">Reportar - Morosidad</h5>
                                <p className="card-text">Generar reportes sobre la morosidad de un residente.</p>
                            </div>
                        </div>
                    </div>

                    {/* Consultar GGCC Card */}
                    <div className="col">
                        <div className="card" onClick={() => navigate('/consulta-gastos-comunes')}>
                            <img src={imgGasto} alt="Consultar - Gastos Comunes" />
                            <div className="card-body">
                                <h5 className="card-title">Consultar - Gastos Comunes</h5>
                                <p className="card-text">Búsqueda eficiente de gastos comunes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark py-3 mt-5">
                <div className="container">
                    <p className="text-center">&copy; <span id="current-year"></span> Todos los derechos reservados</p>
                </div>
            </footer>
        </div>
    );
};

export default DirectivaMain;
