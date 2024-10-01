import React, { useEffect, useState } from 'react';

const AdministrarCondominios = () => {
    const [condominios, setCondominios] = useState([
        { id: 1, nombre: "Condominio Las Flores", unidades: 20, direccion: "Calle A 123" },
        { id: 2, nombre: "Condominio El Sol", unidades: 15, direccion: "Calle B 456" },
        { id: 3, nombre: "Condominio Los Pinos", unidades: 30, direccion: "Calle C 789" }
    ]);

    // Función para llenar la tabla
    const llenarTabla = () => {
        // Esta función es innecesaria en React, ya que el estado controla la visualización
    };

    useEffect(() => {
        // Cargar los condominios al montar el componente
        llenarTabla();
    }, []);

    // Función para editar un condominio
    const editarCondominio = (id) => {
        const condominio = condominios.find(c => c.id === id);
        if (condominio) {
            const nuevoNombre = prompt("Ingrese el nuevo nombre del condominio:", condominio.nombre);
            const nuevasUnidades = prompt("Ingrese el nuevo número de unidades:", condominio.unidades);
            const nuevaDireccion = prompt("Ingrese la nueva dirección:", condominio.direccion);

            if (nuevoNombre && nuevasUnidades && nuevaDireccion) {
                const updatedCondominios = condominios.map(c => 
                    c.id === id 
                        ? { ...c, nombre: nuevoNombre, unidades: parseInt(nuevasUnidades), direccion: nuevaDireccion } 
                        : c
                );
                setCondominios(updatedCondominios); // Actualizar la tabla después de editar
            }
        }
    };

    // Función para eliminar un condominio
    const eliminarCondominio = (id) => {
        if (window.confirm("¿Está seguro de que desea eliminar este condominio?")) {
            const updatedCondominios = condominios.filter(c => c.id !== id);
            setCondominios(updatedCondominios); // Actualizar la tabla después de eliminar
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
                <button type="button" className="btn btn-danger logout-button">Volver</button>
            </div>

            {/* Body */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center text-white">Administrar Condominios</h1>
                    </div>
                </div>

                {/* Formulario */}
                <div className="card">
                    <div className="card-header text-white">Filtros de administración</div>
                    <div className="card-body">
                        <div className="row justify-content-center text-center mt-4">
                            {/* Contenido Tabla */}
                            <div className="col-md-12">
                                <table className="table table-dark table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre del Condominio</th>
                                            <th>Número de Unidades</th>
                                            <th>Dirección</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {condominios.map(condominio => (
                                            <tr key={condominio.id}>
                                                <td>{condominio.id}</td>
                                                <td>{condominio.nombre}</td>
                                                <td>{condominio.unidades}</td>
                                                <td>{condominio.direccion}</td>
                                                <td>
                                                    <button className="btn btn-success btn-sm mr-1" onClick={() => editarCondominio(condominio.id)}>Editar</button>
                                                    <button className="btn btn-danger btn-sm" onClick={() => eliminarCondominio(condominio.id)}>Eliminar</button>
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
                    <p className="text-center text-white">&copy; <span id="current-year"></span> Todos los derechos reservados</p>
                </div>
            </footer>
        </div>
    );
};

export default AdministrarCondominios;
