import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./Form.css";

export default function Form({fields, handleSubmit, handleCancel, values, name, errorMessage}) {
    const [inputValues, setInputValues] = useState(Array(fields.length).fill(""));
    // const [valueFile, setValueFile] = useState('');

    useEffect(() => {
        if (values !== undefined && values !== null) {
            setInputValues(values);
          } else {
            setInputValues(Array(fields.length).fill(""))
          }
      }, [values, fields]);

    function handleInputChange(event, index) {
        event.preventDefault();
        const newInputValues = [...inputValues];
        if (event.target.name === 'img') {
            newInputValues[index] = event.target.files[0];
        } else {
            newInputValues[index] = event.target.value;
        }
        setInputValues(newInputValues);
    }

    return (
        <div className = "modal">
            <div className = "modal-content">
                <h4>{name}</h4>
                <form onSubmit={ (event) => handleSubmit(event, inputValues) } encType = "multipart/form-data" id="formElem">
                    {
                        fields.map((item, index) => {
                            if (item.type === 'select') {
                                const optionsArr = item.options;
                                return (
                                    <div className = "input-field" key = {uuidv4()}>
                                        <label>
                                            <span>category:</span>
                                            <select value = { inputValues[index] } onChange={(event) => handleInputChange(event, index)}>
                                                <option value="">Select an option</option>
                                                {
                                                    optionsArr.map(item => {
                                                        return (
                                                            <option value={item.id} key = {uuidv4()}>{item.name}</option>
                                                        )
                                                    })  
                                                }
                                            </select>
                                        </label>
                                    </div>
                                )
                            } else if (item.type === 'file') {
                                return ( 
                                    <div className = "input-field" key = {item.name}>
                                        <label>
                                            <span>{item.name}:</span>
                                            <input
                                                type = {item.type}
                                                name = {item.name}
                                                // value = { valueFile }
                                                onChange = { (event) => handleInputChange(event, index) }
                                            />
                                        </label>
                                    </div>
                                )
                            } else {
                                return ( 
                                    <div className = "input-field" key = {item.name}>
                                        <label>
                                            <span>{item.name}:</span>
                                            <input
                                                type = {item.type}
                                                name = {item.name}
                                                value = { inputValues[index] }
                                                onChange = { (event) => handleInputChange(event, index) }
                                            />
                                        </label>
                                    </div>
                                )
                            }
                        })
                    }
                    <p className={errorMessage ? "error-active" : "error"}>{errorMessage}</p>
                    <div className = "buttons">
                        <button type="submit">Save</button>
                        <button type="button" onClick = { handleCancel }>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
