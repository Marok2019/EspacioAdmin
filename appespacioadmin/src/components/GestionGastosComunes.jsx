import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para manejar la navegación
import logo from '../images/logo-no-background.png'; // Actualiza la ruta según la ubicación de tu imagen

const GestionGastosComunes = () => {
    const [pagos, setPagos] = useState([]);
    const [selectedCondo, setSelectedCondo] = useState('');
    const navigate = useNavigate(); // Hook para la navegación

    useEffect(() => {
        // Simula la obtención de datos (reemplaza con la lógica de obtención de datos real)
        const datosPagos = [
            { id: 1, residente: 'Juan Perez', estado: 'Pagado', fecha: new Date().toLocaleDateString() },
            { id: 2, residente: 'María García', estado: 'Pagado', fecha: new Date().toLocaleDateString() },
            { id: 3, residente: 'Carlos López', estado: 'Sin pagar', fecha: new Date().toLocaleDateString() }
        ];
        setPagos(datosPagos);
    }, []);

    const handleCondoChange = (e) => {
        const selectedCondoValue = e.target.value;
        setSelectedCondo(selectedCondoValue);
        console.log(`Selected Condominio: ${selectedCondoValue}`);
    };

    // Función para manejar el clic en "Volver"
    const handleGoBack = () => {
        navigate('/admin-condominio');
    };

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        navigate('/auth');
    };

    return (
        <div className="bg-dark">
            {/* Header */}
            <div className="header-container d-flex align-items-center justify-content-between">
                <img src={logo} alt="Logo" className="header-logo" />
                <div>
                    <button
                        type="button"
                        className="btn btn-secondary me-2"
                        onClick={handleGoBack} // Llama a la función para ir a "admin-condominio"
                    >
                        Volver
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleLogout} // Llama a la función para cerrar sesión
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center">Gestión de Gastos Comunes</h1>
                    </div>
                </div>

                {/* Formulario */}
                <div className="card">
                    <div className="card-header">Filtros de búsqueda</div>
                    <div className="card-body">
                        <div className="row">

                            {/* Condominio Dropdown */}
                            <div className="mb-3">
                                <label htmlFor="condominiumDropdown" className="form-label text-white">Seleccione el condominio:</label>
                                <select className="form-select" id="condominiumDropdown" aria-label="Condominio Selection" onChange={handleCondoChange} required>
                                    <option selected disabled>Seleccione un condominio...</option>
                                    <option value="condominio1">Condominio 1</option>
                                    <option value="condominio2">Condominio 2</option>
                                    <option value="condominio3">Condominio 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="row justify-content-center text-center mt-4">

                            {/* Contenido Tabla */}
                            <div className="col-md-12">
                                <table className="table table-dark table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Apartamento</th>
                                            <th>Residente</th>
                                            <th>Estado</th>
                                            <th>Próximo pago</th>
                                        </tr>
                                    </thead>
                                    <tbody id="gastosTableBody">
                                        {pagos.map(pago => (
                                            <tr key={pago.id}>
                                                <td>{pago.id}</td>
                                                <td>{pago.residente}</td>
                                                <td>{pago.estado}</td>
                                                <td>{pago.fecha}</td>
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

export default GestionGastosComunes;
