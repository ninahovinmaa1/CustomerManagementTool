import React, { useState } from 'react';

function App() {

  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")

  function handleEmailInput(e) {
    setEmailInput(e.target.value)
  }

  function handlePasswordInput(e){
    setPasswordInput(e.target.value)
  }

  return (
    <div className="container">
      <h1>Customer Relationship Management system CRMI/O </h1>
      <div>
        <form>
          <label>Email:</label>
          <input onChange={handleEmailInput}/>
          <label>Password:</label>
          <input onChange={handlePasswordInput}/> 
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default App;
