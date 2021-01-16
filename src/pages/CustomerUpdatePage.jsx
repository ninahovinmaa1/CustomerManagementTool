import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function CustomerUpdatePage(props) {
    const customerId = props.match.params.id
    const [formData, setFormData] = useState({})
    const history = useHistory()

    function getCustomerItem() {
        const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`
        const token = localStorage.getItem("WEBB20")
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setFormData(data)) //save data from api to customerList
    }

    useEffect(() => { getCustomerItem() }, [])

    //tar innehållet från formuläret och populerar state var med det
    function handleOnChange(e) {
        const name = e.target.name
        const value = e.target.value
        const newObj = { ...formData, [name]: value }
        setFormData(newObj)
    }

    function renderInput(name, label, type) {
        return (
            <div>
                <label>{label}</label>
                <input
                    type={type || "text"}
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleOnChange}
                />
            </div>
        )
    }

    function handleOnSubmit(e) {
        e.preventDefault()
        const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`
        const token = localStorage.getItem("WEBB20")
        fetch(url, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(() => history.push(`/customers/${customerId}`)) //navigate customer to the edited company
        }

        return (
            <div>
                <h1>Update Customer</h1>
                <form onSubmit={handleOnSubmit}>
                    {renderInput("name", "Customer Name")}
                    {renderInput("email", "Customer Email", "email")}
                    {renderInput("organisationNr", "Organisation Number")}
                    {renderInput("paymentTerm", "Payment Term", "number")}
                    {renderInput("phoneNumber", "Phone Number", "tel")}
                    {renderInput("reference", "Reference")}
                    {renderInput("vatNr", "Vat Number")}
                    {renderInput("website", "Website", "url")}
                    <button type="submit">Update Customer</button>
                </form>
            </div>
        )
    }

