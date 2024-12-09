import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReservaEspaciosComunes = () => {
  const navigate = useNavigate();
  const [condominios, setCondominios] = useState([]); // Lista de condominios
  const [selectedCondominio, setSelectedCondominio] = useState('');
  const [espaciosComunes, setEspaciosComunes] = useState([]); // Lista de espacios comunes dinámicos
  const [selectedSpace, setSelectedSpace] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirección según rol
  const handleVolver = () => {
    const userRole = localStorage.getItem('role');
    switch (userRole) {
      case 'superadmin':
        navigate('/superadmin-main');
        break;
      case 'directive':
        navigate('/directiva');
        break;
      case 'resident':
        navigate('/residente-main');
        break;
      case 'admincondo':
        navigate('/admincondominio-main');
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

  // Fetch list of condominiums on component mount
  useEffect(() => {
    const fetchCondominios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/condominiums');
        setCondominios(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de condominios:', error);
        alert('No se pudo cargar la información de los condominios');
      }
    };

    fetchCondominios();
  }, []);

  // Handle condominium selection to dynamically set available spaces
  useEffect(() => {
    const setAvailableSpaces = () => {
      if (selectedCondominio) {
        const spaces = [
          'gym',
          'cowork',
          'quincho',
          'estacionamientoVisitas',
          'salonEventos',
          'canchaDeportes',
        ];
        setEspaciosComunes(spaces);
      } else {
        setEspaciosComunes([]);
      }
    };

    setAvailableSpaces();
  }, [selectedCondominio]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedCondominio || !selectedSpace || !startDate || !endDate) {
      alert('Por favor, complete todos los campos para confirmar la reserva.');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      alert('La fecha de inicio debe ser anterior a la fecha de término.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/reservations', {
        userId: localStorage.getItem('userId'),
        commonSpaceId: selectedSpace,
        reservedAt: new Date(startDate).toISOString(),
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
    <div className="container">
      <h2>Reservar Espacio Común</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="condominio">Seleccionar Condominio</label>
          <select
            id="condominio"
            className="form-control"
            value={selectedCondominio}
            onChange={(e) => setSelectedCondominio(e.target.value)}
          >
            <option value="">--Seleccione un Condominio--</option>
            {condominios.map((condominio) => (
              <option key={condominio._id} value={condominio._id}>
                {condominio.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="espacio">Seleccionar Espacio Común</label>
          <select
            id="espacio"
            className="form-control"
            value={selectedSpace}
            onChange={(e) => setSelectedSpace(e.target.value)}
          >
            <option value="">--Seleccione un Espacio--</option>
            {espaciosComunes.map((espacio, index) => (
              <option key={index} value={espacio}>
                {espacio}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Fecha Inicio:</label>
          <input
            type="datetime-local"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Fecha Fin:</label>
          <input
            type="datetime-local"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {loading ? 'Reservando...' : 'Reservar'}
        </button>
        <button type="button" className="btn btn-secondary ml-2" onClick={handleVolver}>
          Volver
        </button>
      </form>
    </div>
  );
};

export default ReservaEspaciosComunes;
