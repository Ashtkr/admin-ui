import React from 'react';
import { RiEdit2Fill } from 'react-icons/ri';
import { AiFillDelete } from 'react-icons/ai';
import './RowData.css'

const RowData = ({ singleData, handleIsCheckedSingle, handleEditClick, deleteRowData }) => {

    return (
        <tr key={singleData.id}>
            <td>
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id={`checkbox${singleData.id}`}
                        className="checkbox"
                        value={singleData.isChecked}
                        checked={singleData.isChecked}
                        onChange = { () => handleIsCheckedSingle(singleData.id)}
                    />
                    <label htmlFor={`checkbox${singleData.id}`}></label>
                </div>
            </td>
            <td>{singleData.name}</td>
            <td>{singleData.email}</td>
            <td>{singleData.role}</td>
            <td className='action'>
                <span className='editIcon'
                    onClick={(event) => handleEditClick(event, singleData)}>
                    <RiEdit2Fill /></span>
                <span className='deleteIcon'
                    onClick={() => deleteRowData(singleData.id)}>
                    <AiFillDelete /></span>
            </td>
        </tr>
    )
}

export default RowData;