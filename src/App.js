import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import UsersComponent from "./components/usersComponent";

function App() {
  return (
      <Router>
        <div className="container">
            <h1 style={{textAlign: 'center'}}>Users App</h1>
            <UsersComponent/>
        </div>
      </Router>
  );
}

export default App;
