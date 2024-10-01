// SuperAdminMain.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';


const SuperAdminMain = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aquí puedes manejar el cierre de sesión, como limpiar el estado de autenticación
        navigate('/auth'); // Cambia la ruta a la de tu componente Auth
    };

    return (
        <div className="bg-dark">
            {/* Header */}
            <div className="header-container d-flex align-items-center">
                <img src="https://i.ibb.co/FW5SBG3/logo-no-background.png" alt="Logo" className="header-logo" />
                <button type="button" className="btn btn-danger logout-button" onClick={handleLogout}>Cerrar Sesión</button>
            </div>

            {/* Body */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center">Bienvenido/a, SuperAdmin</h1>
                    </div>
                </div>

                {/* Cards */}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
                    {/* Administrar Usuarios Card */}
                    <div className="col">
                        <div className="card" onClick={() => navigate('/administrar-usuarios')}>
                            <img src="img-administrar.png" alt="Administrar - Usuarios" />
                            <div className="card-body">
                                <h5 className="card-title">Administrar - Usuarios</h5>
                                <p className="card-text">Gestiona la información y permisos de los usuarios del sistema.</p>
                            </div>
                        </div>
                    </div>

                    {/* Administrar Condominios Card */}
                    <div className="col">
                        <div className="card" onClick={() => navigate('/administrar-condominios')}>
                            <img src="img-gestionInstalaciones.png" alt="Administrar - Condominios" />
                            <div className="card-body">
                                <h5 className="card-title">Administrar - Condominios</h5>
                                <p className="card-text">Administra la información y configuraciones de los condominios.</p>
                            </div>
                        </div>
                    </div>

                    {/* Reportar Uso de Espacios Card */}
                    <div className="col">
                        <div className="card" onClick={() => navigate('/reportar-uso-espacios-comunes')}>
                            <img src="img-gestionEquipos.png" alt="Reportar Uso - Espacios Comunes" />
                            <div className="card-body">
                                <h5 className="card-title">Reportar Uso - Espacios Comunes</h5>
                                <p className="card-text">Genera reportes sobre el uso de los espacios comunes.</p>
                            </div>
                        </div>
                    </div>

                    {/* Reportar GGCC Card */}
                    <div className="col">
                        <div className="card" onClick={() => navigate('/reportar-gastos-comunes')}>
                            <img src="img-administrativo.png" alt="Reportar - Gastos Comunes" />
                            <div className="card-body">
                                <h5 className="card-title">Reportar - Gastos Comunes</h5>
                                <p className="card-text">Generación rápida de reportes de gastos comunes.</p>
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

            {/* Scripts */}
            <script>
                document.getElementById('current-year').textContent = new Date().getFullYear();
            </script>
        </div>
    );
};

export default SuperAdminMain;
