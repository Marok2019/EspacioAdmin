import React from 'react';
import './App.css';  // Si tienes algún estilo global en App.css
import LoginPage from './components/LoginPage';  // Importamos el componente LoginPage
import AdjuntarBoleta from './components/AdjuntarBoleta';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <LoginPage />
      <AdjuntarBoleta />
    </div>
  );
}

export default App;
