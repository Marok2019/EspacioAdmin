import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReporteUsoEspaciosComunes = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        const page = window.prompt("¿A qué página deseas volver? (superadmin-main, directiva)");
        switch (page) {
            case 'superadmin-main':
                navigate('/superadmin-main');
                break;
            case 'directiva':
                navigate('/directiva');
                break;
            default:
                alert('Página no válida, por favor intenta de nuevo.');
        }
    };

    const handleLogout = () => {
        navigate('/auth'); // Redirect to Auth
    };

    return (
        <div className="bg-dark">
            {/* Header */}
            <div className="header-container d-flex align-items-center">
                <img src="https://i.ibb.co/FW5SBG3/logo-no-background.png" alt="Logo" className="header-logo" />
                <button 
                    type="button" 
                    className="btn btn-danger logout-button" 
                    onClick={handleBack}
                >
                    Volver
                </button>
                <button 
                    type="button" 
                    className="btn btn-danger logout-button ms-2" 
                    onClick={handleLogout}
                >
                    Cerrar Sesión
                </button>
            </div>

            {/* Body */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center">Reporte Uso de Espacios Comunes</h1>
                    </div>
                </div>

                {/* Formulario */}
                <div className="card">
                    <div className="card-header">Filtros de búsqueda</div>
                    <div className="card-body">
                        <div className="row">
                            {/* Condominio Dropdown */}
                            <div className="col-md-6">
                                <label htmlFor="condominioDropdown" className="form-label text-white">Seleccione el condominio:</label>
                                <select className="form-select" id="condominioDropdown" aria-label="Condominio Selection" required>
                                    <option selected disabled>Seleccione un condominio...</option>
                                    <option value="condominio1">Condominio 1</option>
                                    <option value="condominio2">Condominio 2</option>
                                    <option value="condominio3">Condominio 3</option>
                                </select>
                            </div>

                            {/* Selección de Espacio Común */}
                            <div className="col-md-6">
                                <label htmlFor="espacioDropdown" className="form-label text-white">Seleccione el espacio común:</label>
                                <select className="form-select" id="espacioDropdown" aria-label="Espacio Común Selection">
                                    <option selected>Seleccione un espacio común...</option>
                                    <option value="space1">Sala de reuniones</option>
                                    <option value="space2">Área de descanso</option>
                                    <option value="space3">Salón de eventos</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            {/* RUT Search */}
                            <div className="mt-3">
                                <label htmlFor="rutInput" className="form-label text-white">Buscar por RUT:</label>
                                <input type="text" className="form-control" id="rutInput" placeholder="Ingrese el RUT" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-warning w-100 mt-3">Buscar</button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark py-3 mt-5">
                <div className="container">
                    <p className="text-center">&copy; {new Date().getFullYear()} Todos los derechos reservados</p>
                </div>
            </footer>
        </div>
    );
};

export default ReporteUsoEspaciosComunes;
