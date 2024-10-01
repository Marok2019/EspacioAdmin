import React from 'react';
import { useNavigate } from 'react-router-dom';

// Importa las imágenes
import imgRegistrarResidente from '../images/img-administrar.png'; 
import imgGestionGastos from '../images/img-financiero.png'; 
import imgReportarMorosidad from '../images/img-deudorCuenta.png'; 

const AdminCondominioMain = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-dark">
            {/* Header */}
            <div className="header-container d-flex align-items-center">
                <img
                    src="https://i.ibb.co/FW5SBG3/logo-no-background.png"
                    alt="Logo"
                    className="header-logo"
                />
                <button type="button" className="btn btn-danger logout-button" onClick={() => navigate('/auth')}>
                    Cerrar Sesión
                </button>
            </div>

            {/* Body */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center text-white">Bienvenido/a, Administrador de Condominio</h1>
                    </div>
                </div>

                {/* Cards */}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
                    {/* Registro Residente Card */}
                    <div className="col">
                        <div className="card" onClick={() => navigate('/registro-residente')}>
                            <img src={imgRegistrarResidente} alt="Registrar - Residentes" />
                            <div className="card-body">
                                <h5 className="card-title">Registrar - Residentes</h5>
                                <p className="card-text">Plataforma para agregar a los nuevos residentes.</p>
                            </div>
                        </div>
                    </div>

                    {/* Gestionar GGCC Card */}
                    <div className="col">
                        <div className="card" onClick={() => navigate('/gestion-gastos-comunes')}>
                            <img src={imgGestionGastos} alt="Gestionar - Gastos Comunes" />
                            <div className="card-body">
                                <h5 className="card-title">Gestionar - Gastos Comunes</h5>
                                <p className="card-text">Gestiona con detalle los gastos comunes de cada residente.</p>
                            </div>
                        </div>
                    </div>

                    {/* Reportar Morosidad Card */}
                    <div className="col">
                        <div className="card" onClick={() => navigate('/reporte-morosidad')}>
                            <img src={imgReportarMorosidad} alt="Reportar - Morosidad" />
                            <div className="card-body">
                                <h5 className="card-title">Reportar - Morosidad</h5>
                                <p className="card-text">Generar reportes sobre la morosidad de un residente.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark py-3 mt-5">
                <div className="container">
                    <p className="text-center text-white">&copy; <span id="current-year"></span> Todos los derechos reservados</p>
                </div>
            </footer>
        </div>
    );
};

export default AdminCondominioMain;
