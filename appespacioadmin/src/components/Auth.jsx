import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'; // Asegúrate de que este archivo esté correctamente configurado

const Auth = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Llama al backend con las credenciales
            const response = await axios.post('/auth/login', { email, password });
            
            // Guarda el token en el almacenamiento local o sesión
            localStorage.setItem('token', response.data.token);
            
            // Redirige al usuario dependiendo de su rol (ejemplo)
            if (response.data.role === 'conserje') {
                navigate('/conserje-main');
            } else {
                navigate('/dashboard'); // Ajusta según tu aplicación
            }
        } catch (err) {
            setError('Credenciales inválidas o error en el servidor.');
        }
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
                                    {/* Mostrar error si existe */}
                                    {error && <p className="text-danger">{error}</p>}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Correo:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Contraseña:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Iniciar sesión</button>
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
