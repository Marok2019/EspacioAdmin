import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PagoGastosComunes = () => {
    const navigate = useNavigate();
    const [condominios, setCondominios] = useState([]);
    const [selectedCondominio, setSelectedCondominio] = useState('');
    const [amount, setAmount] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState(''); // CVV se maneja como contraseña
    const [expirationDate, setExpirationDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Estado para mostrar errores

    // Fetch condominiums from API
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

    const handleBack = () => {
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

        if (!selectedCondominio || !amount || !cardNumber || !cvv || !expirationDate) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        try {
            setLoading(true);

            // Enviar pago
            const response = await axios.post('http://localhost:5000/api/payments', {
                userId: localStorage.getItem('userId'),
                condominium: selectedCondominio,
                amount: amount,
                cardNumber: cardNumber,
                cvv: cvv,
                expirationDate: expirationDate,
            });

            if (response.status === 201) {
                alert('Pago realizado con éxito');
                setError(null); // Limpiar cualquier error anterior
            } else {
                alert('No se pudo realizar el pago');
                setError('No se pudo realizar el pago');
            }
        } catch (error) {
            console.error('Error al realizar el pago:', error);
            // Mostrar el error detallado recibido desde la API
            if (error.response && error.response.data) {
                setError(error.response.data.message); // Establecer el mensaje de error
            } else {
                setError('Hubo un error al procesar el pago.');
            }
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

            {/* Main Body */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h1 className="text-center text-white">Pagar Gastos Comunes</h1>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">Formulario de Pago</div>
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

                            {/* Amount */}
                            <div className="mb-3">
                                <label htmlFor="amount" className="form-label text-white">Monto a Pagar:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Card Number */}
                            <div className="mb-3">
                                <label htmlFor="cardNumber" className="form-label text-white">Número de Tarjeta:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cardNumber"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    required
                                />
                            </div>

                            {/* CVV */}
                            <div className="mb-3">
                                <label htmlFor="cvv" className="form-label text-white">CVV:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="cvv"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Expiration Date */}
                            <div className="mb-3">
                                <label htmlFor="expirationDate" className="form-label text-white">Fecha de Expiración:</label>
                                <input
                                    type="month"
                                    className="form-control"
                                    id="expirationDate"
                                    value={expirationDate}
                                    onChange={(e) => setExpirationDate(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn btn-warning w-100 mt-3" disabled={loading}>
                                {loading ? 'Procesando...' : 'Confirmar Pago'}
                            </button>
                        </div>
                    </form>
                    {/* Error Message */}
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
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

export default PagoGastosComunes;
