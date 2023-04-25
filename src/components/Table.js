import './Table.css';
import { v4 as uuidv4 } from 'uuid';

export default function Table({data, deleteButtonClick, editButtonClick, name}) { 
    const columns = Object.keys(data[0]);
    columns.push('Edit', 'Delete');
    const newData = [];

    for (let i = 0; i < data.length; i++) {
        const item = Object.values(data[i]);
        newData.push(item);
    }

    return (
        <div className = "table-wrapper">
            <table className='table'>
                <caption>{name}</caption>
                <thead>
                    <tr>
                        {
                            columns.map((elem, index) => {
                                return <th key = {uuidv4()}>{elem}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        newData?.map((element) => {
                            const id = element[0];
                            return( <tr key = {uuidv4()}>
                                {
                                    element.map((item) => {
                                        return <td key = {uuidv4()}>{item}</td>
                                    })    
                                }
                                <td onClick={() => editButtonClick(id)}>&#9998;</td>
                                <td onClick = {() => deleteButtonClick(id)}>&#128465;</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}