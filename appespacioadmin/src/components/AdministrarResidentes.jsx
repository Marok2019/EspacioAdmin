import React from 'react';

const AdministrarResidentes = () => {
    const residentes = [
        { id: 1, nombre: "Juan Pérez", edad: 30, direccion: "Av. Siempreviva 123" },
        { id: 2, nombre: "María García", edad: 40, direccion: "Av. Siempreviva 456" },
        { id: 3, nombre: "Carlos López", edad: 50, direccion: "Av. Siempreviva 789" }
    ];

    const llenarTabla = () => {
        return residentes.map(residente => (
            <tr key={residente.id}>
                <td>{residente.id}</td>
                <td>{residente.nombre}</td>
                <td>{residente.edad}</td>
                <td>{residente.direccion}</td>
                <td>
                    <button className="btn btn-success btn-sm mr-1" onClick={() => editarResidente(residente.id)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => eliminarResidente(residente.id)}>Eliminar</button>
                </td>
            </tr>
        ));
    };

    const editarResidente = (id) => {
        const residente = residentes.find(r => r.id === id);
        if (residente) {
            const nuevoNombre = prompt("Ingrese el nuevo nombre:", residente.nombre);
            const nuevaEdad = prompt("Ingrese la nueva edad:", residente.edad);
            const nuevaDireccion = prompt("Ingrese la nueva dirección:", residente.direccion);

            if (nuevoNombre && nuevaEdad && nuevaDireccion) {
                residente.nombre = nuevoNombre;
                residente.edad = parseInt(nuevaEdad);
                residente.direccion = nuevaDireccion;
                // Actualizar la tabla después de editar
                // Aquí tendrías que hacer un setState si lo convertirás a un componente de estado
            }
        }
    };

    const eliminarResidente = (id) => {
        const index = residentes.findIndex(r => r.id === id);
        if (index !== -1) {
            if (window.confirm("¿Está seguro de que desea eliminar este residente?")) {
                residentes.splice(index, 1);
                // Actualizar la tabla después de eliminar
                // Aquí tendrías que hacer un setState si lo convertirás a un componente de estado
            }
        }
    };

    return (
        <div className="bg-dark">
            {/* Header */}
            <div className="header-container d-flex align-items-center">
                <img src="https://i.ibb.co/FW5SBG3/logo-no-background.png" alt="Logo" className="header-logo" />
                <button type="button" className="btn btn-danger logout-button">Volver</button>
            </div>

            {/* Body */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center">Administrar Residentes</h1>
                    </div>
                </div>

                {/* Formulario */}
                <div className="card">
                    <div className="card-header">Filtros de administración</div>
                    <div className="card-body">
                        <div className="row justify-content-center text-center mt-4">
                            {/* Contenido Tabla */}
                            <div className="col-md-12">
                                <table className="table table-dark table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Edad</th>
                                            <th>Dirección</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {llenarTabla()}
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

export default AdministrarResidentes;
