import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConsultaGastosComunes = () => {
    const navigate = useNavigate();
    const [gastosComunes, setGastosComunes] = useState([]);
    const [filteredGastos, setFilteredGastos] = useState([]);
    const [rut, setRut] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Manejar navegación según rol
    const handleBack = () => {
        const userRole = localStorage.getItem('role');
        switch (userRole) {
            case 'conserje':
                navigate('/conserje-main');
                break;
            case 'directive':
                navigate('/directiva');
                break;
            case 'resident':
                navigate('/residente-main');
                break;
            default:
                alert('Rol no válido o no definido.');
                navigate('/auth');
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/auth');
    };

    // Realizar la búsqueda por RUT
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch(`http://localhost:5000/api/common-expenses?rut=${rut}`);
            if (!response.ok) {
                throw new Error('Error en la búsqueda de gastos comunes');
            }
            const data = await response.json();
            setGastosComunes(data);
            setFilteredGastos(data); // Se asume que la API devuelve todos los resultados, luego los filtramos
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Filtrar los resultados de acuerdo al RUT
    const filterByRut = (e) => {
        const value = e.target.value;
        setRut(value);
        
        const filtered = gastosComunes.filter(gasto => 
            (value ? gasto.userId.rut === value : true)
        );
        setFilteredGastos(filtered);
    };

    // Formatear monto con el signo "$"
    const formatAmount = (amount) => {
        return `$${amount.toLocaleString()}`;
    };

    return (
        <div className="bg-dark">
            {/* Header */}
            <div className="header-container d-flex justify-content-between align-items-center">
                <img src="https://i.ibb.co/FW5SBG3/logo-no-background.png" alt="Logo" className="header-logo" />
                <div>
                    <button
                        type="button"
                        className="btn btn-danger me-2"
                        onClick={handleBack}
                    >
                        Volver
                    </button>
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center">Consulta de Gastos Comunes</h1>
                    </div>
                </div>

                {/* Formulario de búsqueda */}
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Filtros de búsqueda</div>
                            <div className="card-body">
                                <form onSubmit={handleSearch}>
                                    <div className="row">
                                        {/* RUT de Residente */}
                                        <div className="mb-3">
                                            <label htmlFor="rut" className="form-label text-white">RUT:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="rut"
                                                placeholder="Ej: 88.888.888-8"
                                                required
                                                value={rut}
                                                onChange={filterByRut}
                                            />
                                        </div>

                                        {/* Botón Buscar */}
                                        <button type="submit" className="btn btn-warning w-100 mt-1 mx-auto" disabled={loading}>
                                            {loading ? 'Buscando...' : 'Buscar'}
                                        </button>
                                    </div>
                                </form>

                                {error && <div className="alert alert-danger mt-3">{error}</div>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabla de Resultados */}
                <div className="row justify-content-center text-center mt-4">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-body">
                                <table className="table table-dark table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="border">Nombre</th>
                                            <th className="border">Email</th>
                                            <th className="border">Descripción</th>
                                            <th className="border">Mes</th>
                                            <th className="border">Año</th>
                                            <th className="border">Monto</th>
                                            <th className="border">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredGastos.map((gastoComun, index) => (
                                            <tr key={index}>
                                                <td className="border">{gastoComun.userId.name}</td>
                                                <td className="border">{gastoComun.userId.email}</td>
                                                <td className="border">{gastoComun.description}</td>
                                                <td className="border">{gastoComun.month}</td>
                                                <td className="border">{gastoComun.year}</td>
                                                <td className="border">{formatAmount(gastoComun.amount)}</td>
                                                <td className="border">{gastoComun.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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

export default ConsultaGastosComunes;
