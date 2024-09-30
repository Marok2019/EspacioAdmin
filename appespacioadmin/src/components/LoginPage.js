import React, { useState } from "react";
import "../css/LoginPage.css"; // Este archivo contiene el CSS que pasaremos a React


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica de redirección
    window.location.href = "/conserjeMain";
  };

  const handlePasswordReset = () => {
    window.location.href = "/reset-password";
  };

  return (
    <div className="bg-dark min-vh-100 d-flex flex-column">
      {/* New header section */}
      <div className="header-container d-flex align-items-center">
        <img
          src="https://i.ibb.co/FW5SBG3/logo-no-background.png"
          alt="Logo"
          className="header-logo"
        />
      </div>

      <div className="container mt-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">EspacioAdmin</div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Usuario:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Recuérdame
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Iniciar sesión
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={handlePasswordReset}
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
        <p>
          &copy; <span>{new Date().getFullYear()}</span> Todos los derechos
          reservados
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
