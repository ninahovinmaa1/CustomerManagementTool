import React, { useState, useEffect } from 'react';
import CustomerListItem from '../components/CustomerListItem';

export default function CustomerListPage() {
    const [customerList, setCustomerList] = useState([])

    //getCustomerList displays the list of customers once right after the page's initial rendering. 
    useEffect(() => {
        getCustomerList()
    }, [])

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
                setCustomerList(data.results) //save data from api to customerList
                console.log(customerList) //empty arr as no customers added yet
            })
    }

    return (
        <div>
            {/*Display list of customers from array customerList*/}
            {customerList.map((item) => {
                return <CustomerListItem customerData={item}/>
            })}
        </div>
    )
}
