import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function LoginPage() {

    const [formData, setFormData] = useState({
        email: "Nina.Hovinmaa@yh.nackademin.se",
        password: "javascriptoramverk"
    })

    const history = useHistory();

    function handleOnChange(e) {
        const inputName = e.target.name //email or password
        const inputValue = e.target.value // users input to email or password
        const newObj = { ...formData, [inputName]: inputValue } // spread op to not override object formData. Think [inputName]: inputValue as [email]: nina@nackademin.se
        setFormData(newObj)
    }

    function handleOnSubmit(e) {
        e.preventDefault()  // prevents reloading site when button login is clicked
        const url = "https://frebi.willandskill.eu/api-token-auth/"
        const payload = {
            email: formData.email,
            password: formData.password
        }
        fetch(url, {
            body: JSON.stringify(payload), //API expects a string, that's why we stringify payload-obj
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                console.log(data.token)
                localStorage.setItem("WEBB20", data.token)
                history.push("/home")
            })
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <label>Email:</label>
                <input name="email" value={formData.email} onChange={handleOnChange} />
                <label>Password:</label>
                <input name="password" value={formData.password} onChange={handleOnChange} />
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}
