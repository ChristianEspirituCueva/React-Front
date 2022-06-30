import React from 'react';
import {NavLink} from  'react-router-dom'

function NavBar(){
    return(
        <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Demo Block Chain
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Presentación
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/candidate">
                  Candidato
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/voter">
                  Votante
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default NavBar;