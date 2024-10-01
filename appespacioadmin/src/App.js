import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importación de componentes
import AdjuntarBoleta from './components/AdjuntarBoleta';
import AdministrarCondominios from './components/AdministrarCondominios';
import AdministrarResidentes from './components/AdministrarResidentes';
import AdminCondominioMain from './components/AdminCondominioMain';
import Auth from './components/Auth';
import ConserjeMain from './components/ConserjeMain';
import ConsultaGastosComunes from './components/ConsultaGastosComunes';
import DirectivaMain from './components/DirectivaMain';
import GestionGastosComunes from './components/GestionGastosComunes';
import GestionParkingVisitas from './components/GestionParkingVisitas';
import GestionUsoEspaciosComunes from './components/GestionUsoEspaciosComunes';
import PagoGastosComunes from './components/PagoGastosComunes';
import RegistroResidente from './components/RegistroResidente';
import ReportarGastosComunes from './components/ReporteGastosComunes';
import ReportarMorosidad from './components/ReportarMorosidad';
import ReporteMorosidad from './components/ReporteMorosidad';
import ReporteUsoEspaciosComunes from './components/ReporteUsoEspaciosComunes';
import ReservaEspaciosComunes from './components/ReservaEspaciosComunes';
import ResidenteMain from './components/ResidenteMain';
import SuperAdminMain from './components/SuperAdminMain';

// Importación de CSS
import './css/adjuntarBoletaStyles.css';
import './css/adminCondominioMainStyles.css';
import './css/administrarCondominiosStyles.css';
import './css/administrarUsuariosStyles.css';
import './css/auth.css';
import './css/conserjeMainStyles.css';
import './css/gestionGastosComunesStyles.css';
import './css/pagoGastosComunesStyles.css';
import './css/registroResidenteStyles.css';
import './css/reportarGastosComunesStyles.css';
import './css/reportarMorosidadStyles.css';
import './css/reporteMorosidadStyles.css'; 
import './css/reporteUsoEspaciosComunesStyles.css';
import './css/reservaEspaciosComunesStyles.css';
import './css/residenteMainStyles.css'
import './css/superAdminMainStyles.css'; // Importing the CSS for ReporteUsoEspaciosComunes
// Importing the CSS for ReporteMorosidad


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/adjuntar-boleta" element={<AdjuntarBoleta />} />
                <Route path="/administrar-condominios" element={<AdministrarCondominios />} />
                <Route path="/administrar-residentes" element={<AdministrarResidentes />} />
                <Route path="/admin-condominio" element={<AdminCondominioMain />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/conserje-main" element={<ConserjeMain />} />
                <Route path="/consulta-gastos-comunes" element={<ConsultaGastosComunes />} />
                <Route path="/directiva" element={<DirectivaMain />} />
                <Route path="/gestion-gastos-comunes" element={<GestionGastosComunes />} />
                <Route path="/gestion-parking-visitas" element={<GestionParkingVisitas />} />
                <Route path="/gestion-uso-espacios-comunes" element={<GestionUsoEspaciosComunes />} />
                <Route path="/pago-gastos-comunes" element={<PagoGastosComunes />} />
                <Route path="/registro-residente" element={<RegistroResidente />} />
                <Route path="/reportar-gastos-comunes" element={<ReportarGastosComunes />} />
                <Route path="/reportar-morosidad" element={<ReportarMorosidad />} />
                <Route path="/reporte-morosidad" element={<ReporteMorosidad />} /> // Route for ReporteMorosidad
                <Route path="/reporte-uso-espacios-comunes" element={<ReporteUsoEspaciosComunes />} /> // Route for ReporteUsoEspaciosComunes
                <Route path="/reservar-espacio-comun" element={<ReservaEspaciosComunes />} />
                <Route path="/residente-main" element={<ResidenteMain />} />
                <Route path="/superadmin-main" element={<SuperAdminMain />} />
            </Routes>
        </Router>
    );
};

export default App;
