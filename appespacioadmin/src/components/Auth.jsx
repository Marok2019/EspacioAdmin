import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'; // Asegúrate de que este archivo está correctamente configurado

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Mostrar el año actual en el pie de página
  useEffect(() => {
    document.getElementById('current-year').textContent = new Date().getFullYear();
  }, []);

  // Navegar según el rol en función de la respuesta
  const navigateToRole = (role) => {
    switch (role) {
      case 'resident':
        navigate('/residente-main');
        break;
      case 'admincondo':
        navigate('/admin-condominio');
        break;
      case 'conserje':
        navigate('/conserje-main');
        break;
      case 'superadmin':
        navigate('/superadmin-main');
        break;
      case 'directive':
        navigate('/directiva');
        break;
      default:
        alert('Rol no reconocido');
        navigate('/auth');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await axios.post('/api/users/login', { email, password });
  
      console.log('Respuesta completa del servidor: ', response);
  
      const { token, role, id } = response?.data || {};
  
      if (token && role && id) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('userId', id);
  
        navigateToRole(role);
      } else {
        throw new Error('Datos inválidos en la respuesta');
      }
    } catch (err) {
      console.error('Error en la solicitud de inicio de sesión:', err);
      setError(err.message || 'Credenciales inválidas o error en el servidor');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="bg-dark">
      {/* Header */}
      <div className="header-container d-flex align-items-center">
        <img
          src="https://i.ibb.co/FW5SBG3/logo-no-background.png"
          alt="Logo"
          className="header-logo"
        />
      </div>

      {/* Body */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            {/* Card con formulario de inicio de sesión */}
            <div className="card">
              <div className="card-header text-center">EspacioAdmin</div>
              <div className="card-body">
                {/* Formulario */}
                <form id="loginForm" onSubmit={handleSubmit}>
                  {/* Mostrar error si existe */}
                  {error && <p className="text-danger">{error}</p>}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico:</label>
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
                  <button
                    type="submit"
                    className={`btn ${loading ? 'btn-secondary' : 'btn-primary'} w-100`}
                    disabled={loading}
                  >
                    {loading ? 'Cargando...' : 'Iniciar Sesión'}
                  </button>
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
