import { useState } from "react";

export default function Form({fields, handleSubmit, handleCancel}) {
    const [inputValues, setInputValues] = useState(Array(fields.length).fill(""));

    function handleInputChange(event, index) {
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
                            <>
                                <label key = {index}>
                                    Category:
                                    <select value={inputValues[index]} onChange={(event) => handleInputChange(event, index)}>
                                        <option value="">Select an option</option>
                                        {
                                          optionsArr.map(item => {
                                            return (
                                                <option value={item.id}>{item.name}</option>
                                            )
                                          })  
                                        }
                                    </select>
                                </label>
                            </>
                        )
                    } else {
                        return ( 
                            <>
                                <label key = {index}>
                                    {item.name}:
                                    <input
                                        type = {item.type}
                                        name = {item.name}
                                        value = { inputValues[index] }
                                        onChange = { (event) => handleInputChange(event, index) }
                                    />
                                </label>
                            </>
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