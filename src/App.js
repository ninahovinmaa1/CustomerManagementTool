import React, { useState } from 'react';

function App() {
  const [customerList, setCustomerList] = useState([])
  const [formData, setFormData] = useState({
    email: "Nina.Hovinmaa@yh.nackademin.se",
    password: "javascriptoramverk"
  })

  function handleOnChange(e) {
    const inputName = e.target.name //email or password
    const inputValue = e.target.value // users input to email or password
    const newObj = {...formData, [inputName]: inputValue} // spread op to not override object formData. Think [inputName]: inputValue as [email]: nina@nackademin.se
    setFormData(newObj)
  }

  function handleOnSubmit(e) {
    e.preventDefault()  // prevents reloading site when button login is clicked
    const url="https://frebi.willandskill.eu/api-token-auth/"
    const payload = {
      email: formData.email,
      password: formData.password
    }
    fetch(url, {
      body: JSON.stringify(payload), //API expects a string, that's why we stringify payload-obj
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      console.log(data.token)
      localStorage.setItem("WEBB20", data.token)
    })
  }
 
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
    .then(data => console.log(data))
  }

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
    .then(data => setCustomerList(data.results)) //save data from api to customerList
  }

  return (
    <div className="container">
      <h1>Customer Relationship Management system CRMI/O </h1>
      <div>
        <form onSubmit={handleOnSubmit}> 
          <label>Email:</label>
          <input name="email" value={formData.email} onChange={handleOnChange}/>
          <label>Password:</label>
          <input name="password" value={formData.password} onChange={handleOnChange}/> 
          <button type="submit">Log In</button>
        </form>
        <hr/>
        <button onClick={getMe}>Get Me</button>
        <button onClick={getCustomerList}>Get customer list</button>

        {customerList.map((item, index) => {
          return <p key={index}>{item.name}</p>
        })}
      </div>
    </div>
  );
}

export default App;
