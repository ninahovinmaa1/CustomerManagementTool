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

    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <div className="container">
      <h1>Customer Relationship Management system CRMI/O </h1>
      <div>
        <form>
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
