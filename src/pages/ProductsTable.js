import { useState, useEffect } from "react";
import Table from "../components/Table";

export default function UsersTable() {
    const [data, setData] = useState([{}]);

    function deleteButtonClick(id) {
        fetch(`http://localhost:4000/admin/deleteproduct?id=${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": JSON.parse(localStorage.user).jwt
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            setData(data.filter((item) => item.id !== id))
        })
        .catch((error) => console.error(error))
    }

    useEffect(() => {
        fetch('http://localhost:4000/admin/products', {
            headers: {
                "Authorization": JSON.parse(localStorage.user).jwt
            }
        })
        .then(res => res.json())
        .then(res => setData(res))
        .catch(error => console.log(error))
    }, [])
    
    return (
        <Table data = {data} deleteButtonClick = {deleteButtonClick} />
    )
}