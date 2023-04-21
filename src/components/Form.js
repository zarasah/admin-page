import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Form({fields, handleSubmit, handleCancel, values}) {
    const [inputValues, setInputValues] = useState(Array(fields.length).fill(""));

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
        newInputValues[index] = event.target.value;
        setInputValues(newInputValues);
    }

    return (
        <form onSubmit={ (event) => handleSubmit(event, inputValues) }>
            {
                fields.map((item, index) => {
                    if (item.type === 'select') {
                        const optionsArr = item.options;
                        return (
                            <div key = {uuidv4()}>
                                <label>
                                    Category:
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
                    } else {
                        return ( 
                            <div key = {item.name}>
                                <label>
                                    {item.name}:
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
            <br />
            <button type="submit">Save</button>
            <button type="button" onClick = { handleCancel }>Cancel</button>
        </form>
    )
}
