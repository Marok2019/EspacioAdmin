import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdministrarCondominios = () => {
    const [condominios, setCondominios] = useState([]);
    const navigate = useNavigate();

    // Cargar condominios al montar el componente
    useEffect(() => {
        const fetchCondominios = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/condominiums');
                if (response.ok) {
                    const data = await response.json();
                    setCondominios(data);
                } else {
                    console.error('Error al obtener los condominios');
                }
            } catch (error) {
                console.error('Error al conectar con el servidor:', error);
            }
        };

        fetchCondominios();
    }, []);

    // Función para editar un condominio
    const editarCondominio = async (id) => {
        const condominio = condominios.find((c) => c._id === id);
        if (condominio) {
            const nuevoNombre = prompt('Ingrese el nuevo nombre del condominio:', condominio.name);
            const nuevaDireccion = prompt('Ingrese la nueva dirección:', condominio.location);
            if (nuevoNombre && nuevaDireccion) {
                try {
                    const response = await fetch(`http://localhost:5000/api/condominiums/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: nuevoNombre,
                            location: nuevaDireccion,
                        }),
                    });

                    if (response.ok) {
                        const updatedCondominio = await response.json();
                        setCondominios((prev) =>
                            prev.map((c) => (c._id === id ? updatedCondominio : c))
                        );
                    } else {
                        console.error('Error al actualizar el condominio');
                    }
                } catch (error) {
                    console.error('Error al conectar con el servidor:', error);
                }
            }
        }
    };

    // Función para eliminar un condominio
    const eliminarCondominio = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este condominio?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/condominiums/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setCondominios((prev) => prev.filter((c) => c._id !== id));
                } else {
                    console.error('Error al eliminar el condominio');
                }
            } catch (error) {
                console.error('Error al conectar con el servidor:', error);
            }
        }
    };

    // Función para manejar el botón de volver
    const handleBackToSuperAdminMain = () => {
        navigate('/superadmin-main');
    };

    // Función para manejar el botón de cerrar sesión
    const handleLogout = () => {
        navigate('/auth');
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
                <button
                    type="button"
                    className="btn btn-danger logout-button mr-2"
                    onClick={handleBackToSuperAdminMain}
                >
                    Volver
                </button>
                <button
                    type="button"
                    className="btn btn-secondary logout-button"
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </button>
            </div>

            {/* Body */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center text-white">Administrar Condominios</h1>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header text-white">Filtros de administración</div>
                    <div className="card-body">
                        <div className="row justify-content-center text-center mt-4">
                            <div className="col-md-12">
                                <table className="table table-dark table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre del Condominio</th>
                                            <th>Dirección</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {condominios.map((condominio) => (
                                            <tr key={condominio._id}>
                                                <td>{condominio._id}</td>
                                                <td>{condominio.name}</td>
                                                <td>{condominio.location}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-success btn-sm mr-1"
                                                        onClick={() => editarCondominio(condominio._id)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => eliminarCondominio(condominio._id)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
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
                    <p className="text-center text-white">
                        &copy; {new Date().getFullYear()} Todos los derechos reservados
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default AdministrarCondominios;
