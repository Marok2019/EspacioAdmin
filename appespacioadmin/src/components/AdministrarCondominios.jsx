import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdministrarCondominios = () => {
    const navigate = useNavigate();
    const [condominios, setCondominios] = useState([]); // Estado para los condominios
    const [loading, setLoading] = useState(true); // Estado para el loading
    const [error, setError] = useState(null); // Estado para errores

    // Obtener los condominios al cargar el componente
    useEffect(() => {
        const fetchCondominios = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/condominiums'); // Cambia la URL según tu backend
                setCondominios(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error al obtener los condominios.');
                setLoading(false);
            }
        };
        fetchCondominios();
    }, []);

    const editarCondominio = (id) => {
        const condominio = condominios.find(c => c._id === id);
        if (condominio) {
            const nuevoNombre = prompt("Ingrese el nuevo nombre del condominio:", condominio.name);
            const nuevaUbicacion = prompt("Ingrese la nueva ubicación:", condominio.location);

            if (nuevoNombre && nuevaUbicacion) {
                axios
                    .put(`http://localhost:5000/api/condominium/${id}`, { name: nuevoNombre, location: nuevaUbicacion })
                    .then(() => {
                        setCondominios(prev =>
                            prev.map(c => (c._id === id ? { ...c, name: nuevoNombre, location: nuevaUbicacion } : c))
                        );
                        alert("Condominio actualizado con éxito.");
                    })
                    .catch(err => alert(err.response?.data?.message || 'Error al actualizar el condominio.'));
            }
        }
    };

    const eliminarCondominio = (id) => {
        if (window.confirm("¿Está seguro de que desea eliminar este condominio?")) {
            axios
                .delete(`http://localhost:5000/api/condominium/${id}`)
                .then(() => {
                    setCondominios(prev => prev.filter(c => c._id !== id));
                    alert("Condominio eliminado con éxito.");
                })
                .catch(err => alert(err.response?.data?.message || 'Error al eliminar el condominio.'));
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

    if (loading) return <div className="text-center">Cargando...</div>;
    if (error) return <div className="text-center text-danger">{error}</div>;

    return (
        <div className="bg-dark">
            {/* Header */}
            <div className="header-container d-flex align-items-center">
                <img src="https://i.ibb.co/FW5SBG3/logo-no-background.png" alt="Logo" className="header-logo" />
                <button type="button" className="btn btn-danger logout-button mr-2" onClick={handleBackToSuperAdminMain}>
                    Volver
                </button>
                <button type="button" className="btn btn-secondary logout-button" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </div>

            {/* Body */}
            <div className="container mt-5">
                <h1 className="text-center">Administrar Condominios</h1>

                <div className="card mt-3">
                    <div className="card-header">Lista de Condominios</div>
                    <div className="card-body">
                        <table className="table table-dark table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Ubicación</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {condominios.map(condominio => (
                                    <tr key={condominio._id}>
                                        <td>{condominio._id}</td>
                                        <td>{condominio.name}</td>
                                        <td>{condominio.location}</td>
                                        <td>
                                            <button className="btn btn-success btn-sm mr-1" onClick={() => editarCondominio(condominio._id)}>Editar</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => eliminarCondominio(condominio._id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

export default AdministrarCondominios;
