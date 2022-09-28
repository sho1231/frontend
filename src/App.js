import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import SendEmail from './Components/SendEmail';
import Reset from './Components/Reset';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Navigate end to="/resetPage" />} />
        <Route exact path="/resetPage" element={<SendEmail />} />
        <Route exact path="/reset" element={<Reset />} />
      </Routes>
    </>
  );
}

export default App;
