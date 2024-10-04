import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PagoGastosComunes = () => {
    const [condominio, setCondominio] = useState('');
    const [numeroDepartamento, setNumeroDepartamento] = useState('');
    const [nombreResidente, setNombreResidente] = useState('');
    const [montoPago, setMontoPago] = useState('');
    const [metodoPago, setMetodoPago] = useState('');
    const [mostrarCardInfo, setMostrarCardInfo] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Set the current year for the footer
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }, []);

    const handlePaymentMethodChange = (e) => {
        const value = e.target.value;
        setMetodoPago(value);
        setMostrarCardInfo(value === 'tarjetaCredito' || value === 'tarjetaDebito');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Pago realizado con éxito.');
        // Reset form fields
        setCondominio('');
        setNumeroDepartamento('');
        setNombreResidente('');
        setMontoPago('');
        setMetodoPago('');
        setMostrarCardInfo(false);
    };

    return (
        <div className="bg-dark">
            {/* Header */}
            <div className="header-container d-flex align-items-center">
                <img src="https://i.ibb.co/FW5SBG3/logo-no-background.png" alt="Logo" className="header-logo" />
                <button type="button" className="btn btn-danger logout-button" onClick={() => navigate('/residente-main')}>
                    Volver
                </button>
                <button type="button" className="btn btn-danger logout-button ms-2" onClick={() => navigate('/auth')}>
                    Cerrar Sesión
                </button>
            </div>

            {/* Body */}
            <div className="container mt-5">
                {/* Formulario */}
                <div className="card">
                    <div className="card-header"><h3>Realizar Pago</h3></div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                {/* Condominio Dropdown */}
                                <div className="col-md-6">
                                    <label htmlFor="condominioDropdown" className="form-label text-white">Seleccione el condominio:</label>
                                    <select 
                                        className="form-select" 
                                        id="condominioDropdown" 
                                        required 
                                        value={condominio} 
                                        onChange={(e) => setCondominio(e.target.value)}
                                    >
                                        <option selected disabled>Seleccione un condominio...</option>
                                        <option value="condominio1">Condominio 1</option>
                                        <option value="condominio2">Condominio 2</option>
                                        <option value="condominio3">Condominio 3</option>
                                    </select>
                                </div>

                                {/* Número de departamento */}
                                <div className="col-md-6">
                                    <label htmlFor="apartmentNumber" className="form-label text-white">Número de Departamento</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="apartmentNumber" 
                                        placeholder="Ej: 101" 
                                        required 
                                        value={numeroDepartamento}
                                        onChange={(e) => setNumeroDepartamento(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="row mt-2">
                                {/* Nombre del residente */}
                                <div className="col-md-6">
                                    <label htmlFor="residentName" className="form-label text-white">Nombre del Residente</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="residentName" 
                                        placeholder="Ej: Juan Pérez" 
                                        required 
                                        value={nombreResidente}
                                        onChange={(e) => setNombreResidente(e.target.value)}
                                    />
                                </div>

                                {/* Monto a pagar */}
                                <div className="col-md-6">
                                    <label htmlFor="paymentAmount" className="form-label text-white">Monto a Pagar (CLP)</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="paymentAmount" 
                                        placeholder="Ej: 50000" 
                                        required 
                                        value={montoPago}
                                        onChange={(e) => setMontoPago(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="row mt-2">
                                {/* Selección de método de pago */}
                                <div className="col-md-6">
                                    <label htmlFor="paymentMethod" className="form-label text-white">Método de Pago</label>
                                    <select 
                                        className="form-select" 
                                        id="paymentMethod" 
                                        required 
                                        value={metodoPago} 
                                        onChange={handlePaymentMethodChange}
                                    >
                                        <option selected disabled>Seleccione el método de pago</option>
                                        <option value="tarjetaCredito">Tarjeta de Crédito</option>
                                        <option value="tarjetaDebito">Tarjeta de Débito</option>
                                        <option value="transferenciaBancaria">Transferencia Bancaria</option>
                                    </select>
                                </div>
                            </div>

                            {/* Campos para tarjeta de crédito/débito */}
                            {mostrarCardInfo && (
                                <div id="cardInfo" className="row mt-2">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cardNumber" className="form-label text-white">Número de Tarjeta</label>
                                        <input type="text" className="form-control" id="cardNumber" placeholder="1234 5678 9012 3456" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="expiryDate" className="form-label text-white">Fecha de Expiración (MM/AA)</label>
                                        <input type="text" className="form-control" id="expiryDate" placeholder="MM/AA" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cvv" className="form-label text-white">CVV</label>
                                        <input type="text" className="form-control" id="cvv" placeholder="123" />
                                    </div>
                                </div>
                            )}

                            {/* Botón para realizar el pago */}
                            <div className="mt-3">
                                <button type="submit" className="btn btn-warning w-100">Pagar</button>
                            </div>
                        </form>
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

export default PagoGastosComunes;
