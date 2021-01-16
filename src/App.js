import React, {useState} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import CustomerCreatePage from './pages/CustomerCreatePage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import CustomerListPage from './pages/CustomerListPage';
import CustomerUpdatePage from './pages/CustomerUpdatePage';
import LoginPage from './pages/LoginPage';

function App() {

  const [userData, setUserData] = useState(null);
  
  //Get info of which user is logged in and display users email, firstname and lastname.
  function getMe() {
    const url = "https://frebi.willandskill.eu/api/v1/me/"
    const token = localStorage.getItem("WEBB20")
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => setUserData(data))
  }

  return (
    <div>

      <ul>
        <li><Link to="/home">Customers</Link></li>
        <li><Link to="/customers/create">Create Customer</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>

      <Switch>
        <Route path="/login">
          <LoginPage/>
        </Route>

        <Route path="/customers/create">
          <CustomerCreatePage/>
        </Route>

        <Route path="/customers/:id/edit" component={CustomerUpdatePage}></Route>

        <Route path="/customers/:id" component={CustomerDetailPage}/>

        <Route path="/home">
          <CustomerListPage/>
        </Route>

      </Switch>

      <h1>Customer Relationship Management system CRMI/O </h1>
      <div>
        
        <hr/>
        <button onClick={getMe}>Get Me</button>
        {userData && <p> Logged in as: {userData.firstName} {userData.lastName}, {userData.email}</p>}

      </div>
    </div>
  );
}

export default App;
