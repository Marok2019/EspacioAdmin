// ResidenteMain.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import imgCalendario from '../images/img-calendario.png'; // Adjust the path as necessary
import imgGasto from '../images/img-gasto.png'; // Adjust the path as necessary
import imgMano from '../images/img-mano.png'; // Adjust the path as necessary
import imgFactura from '../images/img-factura.png'; // Adjust the path as necessary

const ResidenteMain = () => {
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
                        <h1 className="text-center">Bienvenido/a, Residente</h1>
                    </div>
                </div>

                {/* Cards */}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
                    {/* Reserva Espacios Comunes Card */}
                    <div className="col">
                        <div className="card" onClick={() => navigate('/reservar-espacio-comun')}>
                            <img src={imgCalendario} alt="Reservar - Espacios Comunes" />
                            <div className="card-body">
                                <h5 className="card-title">Reservar - Espacios Comunes</h5>
                                <p className="card-text">Facilidad para reservar espacios comunes.</p>
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

                    {/* Pagar GGCC Card */}
                    <div className="col">
                        <div className="card" onClick={() => navigate('/pago-gastos-comunes')}>
                            <img src={imgMano} alt="Pagar - Gastos Comunes" />
                            <div className="card-body">
                                <h5 className="card-title">Pagar - Gastos Comunes</h5>
                                <p className="card-text">Plataforma de pago de tus gastos comunes.</p>
                            </div>
                        </div>
                    </div>

                    {/* Cargar Boleta GGCC Card */}
                    <div className="col">
                        <div className="card" onClick={() => navigate('/adjuntar-boleta')}>
                            <img src={imgFactura} alt="Cargar - Boleta de Gastos Comunes" />
                            <div className="card-body">
                                <h5 className="card-title">Cargar - Boleta de Gastos Comunes</h5>
                                <p className="card-text">Sube aquí de manera rápida y segura tu boleta de pago de gastos comunes.</p>
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

export default ResidenteMain;
