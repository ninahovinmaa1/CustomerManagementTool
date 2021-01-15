import React, { useState, useEffect } from 'react';

export default function CustomerDetailPage(props) {
    const customerId = props.match.params.id
    const [customerItem, setCustomerItem] = useState(null)

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
            .then(data => setCustomerItem(data)) //save data from api to customerList
    }

    function deleteCustomer() {
        const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`
        const token = localStorage.getItem("WEBB20")
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(() => history.push("/customers"))
    }

    useEffect(() => { getCustomerItem() }, [])

    return (
        <div>
            {customerItem
                ? (
                    <div>
                        <h1>{customerItem.name}</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Organisation Number</td>
                                    <td>{customerItem.organisationNr}</td>
                                </tr>

                                <tr>
                                    <td>Payment Term</td>
                                    <td>{customerItem.paymentTerm}</td>
                                </tr>

                                <tr>
                                    <td>Phone Number</td>
                                    <td>{customerItem.phoneNumber}</td>
                                </tr>

                                <tr>
                                    <td>Reference</td>
                                    <td>{customerItem.reference}</td>
                                </tr>

                                <tr>
                                    <td>VAT Number</td>
                                    <td>{customerItem.vatNr}</td>
                                </tr>

                                <tr>
                                    <td>Email</td>
                                    <td>
                                        <a href={`mailto:${customerItem.email}`}>
                                            {customerItem.email}
                                        </a>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Website</td>
                                    <td>
                                        <a href={customerItem.website} target="_blank">
                                            {customerItem.website}
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" onClick={deleteCustomer}>Delete Customer</button>
                    </div>
                )
                :
                (
                    <span>Laddar data...</span>
                )
            }
        </div>
    )
}
