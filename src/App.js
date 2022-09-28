import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import SendEmail from './Components/SendEmail';
import Reset from './Components/Reset';

function App() {
  return (
    <>
      <div>For registering and login..please do it with the help of postman or insomnia by the reading the readme.txt file...<a href="https://github.com/sho1231/PassResetBackEnd/blob/master/readme.txt" target="_blank">click here to read readme.txt</a></div>
      <Routes>
        <Route exact path="/" element={<Navigate end to="/resetPage" />} />
        <Route exact path="/resetPage" element={<SendEmail />} />
        <Route exact path="/reset" element={<Reset />} />
      </Routes>
    </>
  );
}

export default App;
