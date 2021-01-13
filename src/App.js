import React, { useState } from 'react';

function App() {

  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
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
    .then(data => console.log(data))
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
      </div>
    </div>
  );
}

export default App;
