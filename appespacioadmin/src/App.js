import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth'; // Asegúrate de tener el componente Auth
import AdjuntarBoleta from './components/AdjuntarBoleta';
import ConserjeMain from './components/ConserjeMain'; // O cualquier otro componente que tenga

import './css/adjuntarBoletaStyles.css'; // Asegúrate de tener este archivo CSSs
import './css/auth.css'; // Asegúrate de tener este archivo CSSs
import './css/conserjeMainStyles.css'; // Asegúrate de tener este archivo CSSs

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/adjuntar-boleta" element={<AdjuntarBoleta />} />
                <Route path="/conserje-main" element={<ConserjeMain />} />
                {/* Otras rutas */}
            </Routes>
        </Router>
    );
};

export default App;
