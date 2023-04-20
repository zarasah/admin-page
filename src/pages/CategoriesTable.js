import { useState, useEffect } from "react";
import Table from "../components/Table";
import Form from '../components/Form';

export default function UsersTable() {
    const [data, setData] = useState([{}]);
    const [showForm, setShowForm] = useState(false);

    const fields = [
        {
            name: 'name',
            type: 'text'
        }
    ]

    function deleteButtonClick(id) {
        fetch(`http://localhost:4000/admin/deletecategory?id=${id}`, {
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
        fetch('http://localhost:4000/admin/categories', {
            headers: {
                "Authorization": JSON.parse(localStorage.user).jwt
            }
        })
        .then(res => res.json())
        .then(res => setData(res))
        .catch(error => console.log(error))
    }, [])

    function handleAddBtnClick() {
        setShowForm(true);
    }

    function handleCancel() {
        setShowForm(false);
    }

    function handleSubmit(event, inputValues) {
        event.preventDefault();
        const newCategory = {}
        for (let i = 0; i < fields.length; i++) {
            newCategory[fields[i].name] = inputValues[i];
        }
        fetch('http://localhost:4000/admin/createcategory', {
            method: 'POST',
            body: JSON.stringify(newCategory),
            headers: {
                'Authorization': JSON.parse(localStorage.user).jwt,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(result => {
            setData([...data, result.data]);
            setShowForm(false);
        })
        .catch(error => console.error(error))
    }
    
    return (
        <>
            <button onClick = { handleAddBtnClick }>Add new Category</button>
            {
                showForm && (
                    <Form fields = {fields} handleSubmit = {handleSubmit} handleCancel = {handleCancel}/>
                )
            }
            <Table data = {data} deleteButtonClick = { deleteButtonClick } />
        </>
    )
}