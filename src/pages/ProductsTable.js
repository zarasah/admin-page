import { useState, useEffect } from "react";
import Table from "../components/Table";
import Form from "../components/Form";

export default function UsersTable() {
    const [data, setData] = useState([{}]);
    const [showForm, setShowForm] = useState(false);
    const [options, setOptions] = useState([])
    const fields = [
        {
            name: 'name',
            type: 'text'
        },
        {
            name: 'price',
            type: 'number'
        },
        {
            name: 'quantity',
            type: 'number'
        },
        {
            name: 'description',
            type: 'text'
        },
        {
            name: 'categoryId',
            type: 'select',
            options
        }
    ]

    function handleAddBtnClick() {
        fetch('http://localhost:4000/admin/categories', {
            headers: {
                "Authorization": JSON.parse(localStorage.user).jwt
            }
        })
        .then(res => res.json())
        .then(result => {
            const newOptions = result.map(item => {
                const newItem = {
                    id: item.id, 
                    name: item.name
                }
                return newItem;
            })
            setOptions(newOptions);
            setShowForm(true);
        })
        .catch(error => console.error(error))
    }

    function handleCancel() {
        setShowForm(false);
    }

    function handleSubmit(event, inputValues) {
        event.preventDefault();
        const newProduct = {}
        for (let i = 0; i < fields.length; i++) {
            newProduct[fields[i].name] = inputValues[i];
        }
        console.log(newProduct);

        fetch('http://localhost:4000/admin/createproduct', {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: {
                'Authorization': JSON.parse(localStorage.user).jwt,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json()
        })
        .then(result => {
            setData([...data, result.data]);
            setShowForm(false);
        })
        .catch(error => console.error(error))
    }

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
        <>
            <button onClick = { handleAddBtnClick }>Add new Product</button>
            {
                showForm && (
                    <Form handleSubmit = {handleSubmit} handleCancel = {handleCancel} fields={fields}/>
                )
            }
            <Table data = {data} deleteButtonClick = {deleteButtonClick} />
        </>
        
    )
}