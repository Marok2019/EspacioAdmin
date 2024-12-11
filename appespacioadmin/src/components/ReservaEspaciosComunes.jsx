import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReservaEspaciosComunes = () => {
    const navigate = useNavigate();
    const [selectedCondominio, setSelectedCondominio] = useState('');
    const [selectedSpace, setSelectedSpace] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [condominios, setCondominios] = useState([]);
    const [commonSpaces, setCommonSpaces] = useState([]);
    const [isLoadingSpaces, setIsLoadingSpaces] = useState(false);

    // Fetch condominiums when the component is mounted
    useEffect(() => {
        const fetchCondominiums = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/condominiums');
                setCondominios(response.data);
            } catch (error) {
                console.error('Error fetching condominiums:', error);
            }
        };

        fetchCondominiums();
    }, []);

    // Fetch common spaces when a condominium is selected
    useEffect(() => {
        const fetchCommonSpaces = async () => {
            if (selectedCondominio) {
                setIsLoadingSpaces(true);
                try {
                    const response = await axios.get(`http://localhost:5000/api/condominiums/${selectedCondominio}/common-spaces`);
                    setCommonSpaces(response.data);
                } catch (error) {
                    console.error('Error fetching common spaces:', error);
                } finally {
                    setIsLoadingSpaces(false);
                }
            }
        };

        fetchCommonSpaces();
    }, [selectedCondominio]);

    // Redirection based on role
    const handleVolver = () => {
        const userRole = localStorage.getItem('role');
        switch (userRole) {
            case 'resident':
                navigate('/residente-main');
                break;
            case 'conserje':
                navigate('/conserje-main');
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

    const handleSubmit = async (event) => {
        event.preventDefault();
       
        if (!selectedCondominio || !selectedSpace || !startDate || !endDate) {
          alert("Por favor, complete todos los campos para confirmar la reserva.");
          return;
        }
       
        if (new Date(startDate) >= new Date(endDate)) {
          alert("La fecha de inicio debe ser anterior a la fecha de término.");
          return;
        }
       
        if (new Date(startDate) < new Date()) {
          alert("La fecha de inicio no puede ser en el pasado.");
          return;
        }
       
        try {
          setLoading(true);
       
          // Enviar fechas convertidas a formato ISO
          const response = await axios.post('http://localhost:5000/api/reservations', {
            userId: localStorage.getItem('userId'),
            condominium: selectedCondominio,
            commonSpace: selectedSpace,
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(endDate).toISOString(),
          });
       
          if (response.status === 201) {
            alert('Reserva realizada con éxito');
          } else {
            alert('No se pudo realizar la reserva');
          }
        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
          alert('Error al realizar la solicitud');
        } finally {
          setLoading(false);
        }
      };
      
    
    

    return (
        <div className="bg-dark">
            {/* Header */}
            <div className="header-container d-flex align-items-center">
                <img src="https://i.ibb.co/FW5SBG3/logo-no-background.png" alt="Logo" className="header-logo" />
                <button
                    type="button"
                    className="btn btn-danger logout-button"
                    onClick={handleVolver}
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

            {/* Main Body */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center text-white">Reservar Espacios Comunes</h1>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">Formulario de Reserva</div>
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            {/* Condominium Selection */}
                            <div className="mb-3">
                                <label htmlFor="condominioDropdown" className="form-label text-white">Seleccione el condominio:</label>
                                <select
                                    className="form-select"
                                    id="condominioDropdown"
                                    value={selectedCondominio}
                                    onChange={(e) => setSelectedCondominio(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccione un condominio...</option>
                                    {condominios.map((condominio) => (
                                        <option key={condominio._id} value={condominio._id}>{condominio.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Common Space Selection */}
                            <div className="mb-3">
                                <label htmlFor="espacioDropdown" className="form-label text-white">Seleccione el espacio común:</label>
                                <select
                                    className="form-select"
                                    id="espacioDropdown"
                                    value={selectedSpace}
                                    onChange={(e) => setSelectedSpace(e.target.value)}
                                    required
                                >
                                    <option value="">Seleccione un espacio común...</option>
                                    {isLoadingSpaces ? (
                                        <option value="">Cargando espacios comunes...</option>
                                    ) : (
                                        commonSpaces && Object.keys(commonSpaces).map(space => (
                                            commonSpaces[space] ? <option key={space} value={space}>{space.charAt(0).toUpperCase() + space.slice(1)}</option> : null
                                        ))
                                    )}
                                </select>
                            </div>

                            {/* Start and End Dates */}
                            <div className="mb-3">
                                <label htmlFor="startDate" className="form-label text-white">Fecha de Inicio:</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="endDate" className="form-label text-white">Fecha de Término:</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn btn-warning w-100 mt-3" disabled={loading}>
                                {loading ? 'Procesando...' : 'Confirmar Reserva'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark py-3 mt-5">
                <div className="container">
                    <p className="text-center text-white">&copy; {new Date().getFullYear()} Todos los derechos reservados</p>
                </div>
            </footer>
        </div>
    );
};

export default ReservaEspaciosComunes;
