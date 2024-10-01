import React, { useState, useEffect } from 'react';

const ConsultaDeudores = () => {
    const [condominium, setCondominium] = useState('Seleccione un condominio');
    const [rut, setRut] = useState('');
    const [debtorData, setDebtorData] = useState([]);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const mockData = [
        { name: 'Juan Pérez', rut: '88.888.888-8', condominium: 'Condominio 1', amount: 1500, paymentStatus: 'Pendiente', dueDate: '2023-03-15', actions: ['Ver Detalles', 'Notificar'] },
        { name: 'María García', rut: '99.999.999-9', condominium: 'Condominio 2', amount: 2000, paymentStatus: 'Pagado', dueDate: '2023-04-01', actions: ['Ver Detalles', 'Notificar'] },
        { name: 'Carlos López', rut: '77.777.777-7', condominium: 'Condominio 3', amount: 2500, paymentStatus: 'Vencido', dueDate: '2023-02-28', actions: ['Ver Detalles', 'Notificar', 'Pagar'] }
    ];

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    const searchDebtors = () => {
        if (condominium !== 'Seleccione un condominio' && rut !== '') {
            // Simulate API call to fetch debtor data
            setDebtorData(mockData);
        } else {
            alert('Por favor, seleccione un condominio y ingrese un RUT válido.');
        }
    };

    const downloadReport = () => {
        const link = document.createElement('a');
        const reportData = `
            <table>
                <tr><th>Nombre</th><th>RUT</th><th>Condominio</th><th>Monto</th><th>Estado del Pago</th><th>Fecha de Vencimiento</th><th>Acciones</th></tr>
                ${mockData.map(item => `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.rut}</td>
                        <td>${item.condominium}</td>
                        <td>${item.amount}</td>
                        <td>${item.paymentStatus}</td>
                        <td>${item.dueDate}</td>
                        <td>${item.actions.join(', ')}</td>
                    </tr>
                `).join('')}
            </table>
        `;
        link.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(reportData);
        link.download = 'reporte_deudores.pdf';
        link.click();
    };

    return (
        <div className="bg-dark">
            <div className="header-container d-flex align-items-center">
                <img src="https://i.ibb.co/FW5SBG3/logo-no-background.png" alt="Logo" className="header-logo" />
                <button type="button" className="btn btn-danger logout-button">Cerrar Sesión</button>
            </div>

            <div className="container mt-5">
                <h1 className="text-center text-white mb-4">Consulta de Deudores</h1>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="condominiumSelect" className="form-label text-white">Seleccione el Condominio:</label>
                            <select 
                                className="form-select" 
                                id="condominiumSelect" 
                                aria-label="Seleccione el Condominio"
                                value={condominium}
                                onChange={(e) => setCondominium(e.target.value)}
                            >
                                <option>Seleccione un condominio</option>
                                <option value="condominio1">Condominio 1</option>
                                <option value="condominio2">Condominio 2</option>
                                <option value="condominio3">Condominio 3</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="rutInput" className="form-label text-white">Ingrese el RUT:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="rutInput" 
                                placeholder="88.888.888-8"
                                value={rut}
                                onChange={(e) => setRut(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mb-4">
                    <div className="col-md-6">
                        <button type="button" className="btn btn-primary w-100" onClick={searchDebtors}>Buscar</button>
                        <button type="button" className="btn btn-warning w-100 mt-2" onClick={downloadReport}>Descargar Reporte</button>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>RUT</th>
                                    <th>Condominio</th>
                                    <th>Monto</th>
                                    <th>Estado del Pago</th>
                                    <th>Fecha de Vencimiento</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {debtorData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.rut}</td>
                                        <td>{item.condominium}</td>
                                        <td>${item.amount}</td>
                                        <td>{item.paymentStatus}</td>
                                        <td>{item.dueDate}</td>
                                        <td>{item.actions.join(', ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <footer className="bg-dark py-3 mt-5">
                <div className="container">
                    <p className="text-center text-white">&copy; {currentYear} Todos los derechos reservados</p>
                </div>
            </footer>
        </div>
    );
};

export default ConsultaDeudores;
