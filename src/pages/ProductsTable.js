import { useState, useEffect } from "react";
import Table from "../components/Table";
import Form from "../components/Form";

export default function UsersTable() {
    const [data, setData] = useState([{}]);
    const [showForm, setShowForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [options, setOptions] = useState([]);
    const [values, setValues] = useState({});
    const [id, setId] = useState('');
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
            name: 'img',
            type: 'text'
        },
        {
            name: 'categoryId',
            type: 'select',
            options
        }
    ]

    useEffect(() => {
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
        })
        .catch(error => console.error(error))
    }, [])

    function handleEditCancel() {
        setIsEdit(false);
    }

    function handleEditSubmit(event, inputValues) {
        event.preventDefault();
        const updateProduct = {};

        for (let i = 0; i < fields.length; i++) {
            updateProduct[fields[i].name] = inputValues[i];
        }

        fetch(`http://localhost:4000/admin/updateproduct/?id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(updateProduct),
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
            const oldData = [...data];
            const updatedData = oldData.map((item) => {
                if (item.id === id) {
                    return result.data;
                }
                return item;
            })
            setData(updatedData);
            setIsEdit(false);
        })
        .catch(error => console.error(error))
        
    }

    function handleAddBtnClick() {
        setShowForm(true);
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
            {
                showForm && (
                    <Form handleSubmit = {handleSubmit} handleCancel = {handleCancel} fields={fields} name = "New Product"/>
                )
            }
            {
                isEdit && (
                    <Form fields = {fields} handleSubmit = {handleEditSubmit} handleCancel = {handleEditCancel} values = {values} name = "Edit"/>
                )
            }
            <Table data = {data} deleteButtonClick = {deleteButtonClick} editButtonClick = {editButtonClick} name = "Products" />
            <button onClick = { handleAddBtnClick }>Add new Product</button>
        </>
        
    )
}