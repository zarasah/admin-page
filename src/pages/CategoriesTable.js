import { useState, useEffect } from "react";
import Table from "../components/Table";
import Form from '../components/Form';

export default function UsersTable() {
    const [data, setData] = useState([{}]);
    const [values, setValues] = useState({});
    const [id, setId] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [message, setMessage] = useState('');

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

    function editButtonClick(id) {
        setId(id);
        const editData = data.filter(item => item.id === id)[0];
        let value = [];
       
        for (let i = 0; i < fields.length; i++) {
            const index = fields[i].name;
            value.push(editData[index]);
        }
        setValues(value);
        setIsEdit(true);
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
        setMessage('');
        setShowForm(false);
    }

    function handleEditCancel() {
        setMessage('');
        setIsEdit(false);
    }

    function handleEditSubmit(event, inputValues) {
        event.preventDefault();
        const updateCategory = {};

        for (let i = 0; i < fields.length; i++) {
            updateCategory[fields[i].name] = inputValues[i];
        }

        fetch(`http://localhost:4000/admin/updatecategory/?id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(updateCategory),
            headers: {
                'Authorization': JSON.parse(localStorage.user).jwt,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 400 || res.status === 409) {
                res.json().then((res) => {
                    setMessage(res.message);
                })
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(result => {
            const oldData = [...data];
            const updatedData = oldData.map((item) => {
                if (item.id === id) {
                    return result.data;
                }
                return item;
            })
            setData(updatedData);
            setMessage('');
            setIsEdit(false);
        })
        .catch(error => console.error(error))
        
    }

    function handleSubmit(event, inputValues) {
        event.preventDefault();
        const newCategory = {};

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
            if (res.status === 409 || res.status === 400) {
                res.json().then((res) => {
                    setMessage(res.message);
                })
                throw new Error('Category already exists');
            }
            return res.json();
        })
        .then(result => {
            setData([...data, result.data]);
            setMessage('');
            setShowForm(false);
        })
        .catch(error => console.error(error))
    }
    
    return (
        <>
            {
                showForm && (
                    <Form fields = {fields} handleSubmit = {handleSubmit} handleCancel = {handleCancel} name = "New Category" errorMessage = {message}/>
                )
            }
            {
                isEdit && (
                    <Form fields = {fields} handleSubmit = {handleEditSubmit} handleCancel = {handleEditCancel} values = {values} name = "Edit" errorMessage = {message}/>
                )
            }
            <Table data = {data} deleteButtonClick = { deleteButtonClick } editButtonClick = {editButtonClick} name = "Categories"/>
            <button onClick = { handleAddBtnClick }>Add new Category</button>
        </>
    )
}