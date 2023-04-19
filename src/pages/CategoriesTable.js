import { useState, useEffect } from "react";
import Table from "../components/Table";

export default function UsersTable() {
    const [data, setData] = useState([{}]);
    const [inputValue, setInputValue] = useState('');
    const [showForm, setShowForm] = useState(false);

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

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    function handleCancel() {
        setInputValue('');
        setShowForm(false);
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        fetch('http://localhost:4000/admin/createcategory', {
            method: 'POST',
            body: JSON.stringify({name: inputValue}),
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
                    <form onSubmit={ handleSubmit }>
                        <label>
                            Name:
                            <input
                            type = "text"
                            name = "name"
                            value = { inputValue }
                            onChange = { handleInputChange }
                            />
                        </label>
                        <br />
                        <button type="submit">Save</button>
                        <button type="button" onClick = { handleCancel }>Cancel</button>
                    </form>
                )
            }
            <Table data = {data} deleteButtonClick = { deleteButtonClick } />
        </>
    )
}