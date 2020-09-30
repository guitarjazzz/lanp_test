import React from 'react';
import Upload from './Upload';
// import bg from './img/company_logo.png';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="Header">
        <h1 className="Header-HeaderLine">
          <b className="Header-HeaderLine_bold">Company Logo</b>
          Logo should be square, 100px size and in png, jpeg file format.
        </h1>
      </header>
      <Upload/>
    </div>
  );
}

export default App;
