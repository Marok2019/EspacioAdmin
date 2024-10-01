// src/components/Auth.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Auth = () => {
    const navigate = useNavigate(); // Inicializa navigate

    useEffect(() => {
        // Actualiza el año en el footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevenir el envío del formulario
        navigate('/conserje-main'); // Usar navigate para redirigir a conserjeMain
    };

    return (
        <div className="bg-dark">
            {/* Header */}
            <div className="header-container d-flex align-items-center">
                <img src="https://i.ibb.co/FW5SBG3/logo-no-background.png" alt="Logo" className="header-logo" />
            </div>

            {/* Body */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        {/* Card */}
                        <div className="card">
                            <div className="card-header">EspacioAdmin</div>
                            <div className="card-body">
                                {/* Formulario */}
                                <form id="loginForm" onSubmit={handleSubmit}>
                                    {/* Ingresar Usuario */}
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Usuario:</label>
                                        <input type="text" className="form-control" id="username" name="username" required />
                                    </div>

                                    {/* Ingresar Clave */}
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Contraseña:</label>
                                        <input type="password" className="form-control" id="password" name="password" required />
                                    </div>

                                    {/* Check de Recordar Usuario */}
                                    <div className="mb-3 form-check">
                                        <input className="form-check-input" type="checkbox" id="remember" name="remember" />
                                        <label className="form-check-label" htmlFor="remember">Recuérdame</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                                    <button type="button" className="btn btn-warning">Reiniciar contraseña</button>
                                </form>
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

export default Auth;
