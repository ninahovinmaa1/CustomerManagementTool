import React, {useState} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import CustomerCreatePage from './pages/CustomerCreatePage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import CustomerListPage from './pages/CustomerListPage';
import CustomerUpdatePage from './pages/CustomerUpdatePage';
import LoginPage from './pages/LoginPage';
import { CustomerListContext } from './contexts/CustomerListContext';
import { UserContext } from './contexts/UserContext';

function App() {

  const [userData, setUserData] = useState(null);
  const [customerList, setCustomerList] = useState(null);
  
  //Get info of which user is logged in
  function fetchUserData() {
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

  //get available list of customers
  function getCustomerList() {
    const url = "https://frebi.willandskill.eu/api/v1/customers/"
    const token = localStorage.getItem("WEBB20")
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      setCustomerList(data.results)
    })
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">CRMio</Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/home" className="nav-link">Customers</Link>
            </li>
            <li className="nav-item"><Link to="/customers/create" className="nav-link">Create Customer</Link></li>
            <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
          </ul>
          <span>
            <button onClick={fetchUserData}>Display user</button>
          {userData && <p> Logged in as: {userData.firstName} {userData.lastName}, {userData.email}</p>}
          </span>
        </nav>

        <UserContext.Provider value={{userData, setUserData, fetchUserData}}>
        <CustomerListContext.Provider value={{customerList, setCustomerList, getCustomerList}}>

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

      </CustomerListContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
