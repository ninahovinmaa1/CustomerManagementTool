import React, { useState, useContext, useEffect } from 'react';
import CustomerListItem from '../components/CustomerListItem';
import { CustomerListContext } from '../contexts/CustomerListContext';

export default function CustomerListPage() {
    // destructures useState var customerList and function getCustomerList via useContext. 
    const { customerList, getCustomerList } = useContext(CustomerListContext)

    //getCustomerList displays the list of customers once right after the page's initial rendering. 
    useEffect(() => {
        getCustomerList()
    }, [])

    return (
        <div>
            {customerList ?
                (
                    <div>
                        {customerList.map(item => {
                            return <CustomerListItem
                                key={item.id}
                                customerData={item}
                            />
                        })}
                    </div>
                )
                :
                (
                    <p>Loading...</p>
                )
            }
        </div>
    )
}
