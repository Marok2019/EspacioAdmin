// src/components/Login.js
import React from 'react';
import '../css/auth.css'; // Ensure your CSS file is imported
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Login = () => {
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        window.location.href = 'conserjeMain.html'; // Redirect to conserjeMain.html
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
            </div>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">EspacioAdmin</div>
                            <div className="card-body">
                                <form id="loginForm" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Usuario:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            name="username"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Contraseña:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="remember"
                                            name="remember"
                                        />
                                        <label className="form-check-label" htmlFor="remember">Recuérdame</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                                    <button
                                        type="button"
                                        className="btn btn-warning"
                                        onClick={() => window.location.href = '/reset-password'}
                                    >
                                        Reiniciar contraseña
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-dark text-white text-center py-3 mt-5">
                <p>&copy; <span id="current-year">{new Date().getFullYear()}</span> Todos los derechos reservados</p>
            </footer>
        </div>
    );
};

export default Login;
