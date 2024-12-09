import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdministrarResidentes = () => {
    const navigate = useNavigate();
    const [residentes, setResidentes] = useState([]); // Estado para los residentes
    const [loading, setLoading] = useState(true); // Estado para el loading
    const [error, setError] = useState(null); // Estado para errores

    // Obtener los residentes al cargar el componente
    useEffect(() => {
        const fetchResidents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users'); // Cambia la URL según tu backend
                const soloResidentes = response.data.filter(user => user.role === 'resident'); // Filtrar residentes
                setResidentes(soloResidentes);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error al obtener los residentes.');
                setLoading(false);
            }
        };
        fetchResidents();
    }, []);

    const editarResidente = (id) => {
        const residente = residentes.find(r => r._id === id);
        if (residente) {
            const nuevoNombre = prompt("Ingrese el nuevo nombre:", residente.name);
            const nuevaEmail = prompt("Ingrese el nuevo email:", residente.email);

            if (nuevoNombre && nuevaEmail) {
                axios
                    .put(`/api/users/${id}`, { name: nuevoNombre, email: nuevaEmail })
                    .then(() => {
                        setResidentes(prev =>
                            prev.map(r => (r._id === id ? { ...r, name: nuevoNombre, email: nuevaEmail } : r))
                        );
                        alert("Residente actualizado con éxito.");
                    })
                    .catch(err => alert(err.response?.data?.message || 'Error al actualizar el residente.'));
            }
        }
    };

    const eliminarResidente = (id) => {
        if (window.confirm("¿Está seguro de que desea eliminar este residente?")) {
            axios
                .delete(`/api/users/${id}`)
                .then(() => {
                    setResidentes(prev => prev.filter(r => r._id !== id));
                    alert("Residente eliminado con éxito.");
                })
                .catch(err => alert(err.response?.data?.message || 'Error al eliminar el residente.'));
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
                <h1 className="text-center">Administrar Residentes</h1>

                <div className="card mt-3">
                    <div className="card-header">Lista de Residentes</div>
                    <div className="card-body">
                        <table className="table table-dark table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {residentes.map(residente => (
                                    <tr key={residente._id}>
                                        <td>{residente._id}</td>
                                        <td>{residente.name}</td>
                                        <td>{residente.email}</td>
                                        <td>
                                            <button className="btn btn-success btn-sm mr-1" onClick={() => editarResidente(residente._id)}>Editar</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => eliminarResidente(residente._id)}>Eliminar</button>
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

export default AdministrarResidentes;
