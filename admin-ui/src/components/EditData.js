import { Button } from '@mui/material'
import React from 'react'
import './editData.css'


const EditData = ({ editRowData, handleEditRowFormChange, handleCancelClick }) => {
  return (
    <tr>
      <td>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id={`edit-checkbox${editRowData.id}`}
            className="checkbox-input"
          />
          <label htmlFor={`edit-checkbox${editRowData.id}`}></label>
        </div>
      </td>
      <td>
        <input type="text"
          required
          placeholder='Enter name...'
          name='name'
          value={editRowData.name}
          onChange={handleEditRowFormChange}
        >
        </input>
      </td>
      <td>
        <input type="text"
          required
          placeholder='Enter email...'
          name='email'
          value={editRowData.email}
          onChange={handleEditRowFormChange}
        >
        </input>
      </td>
      <td>
        <input type="text"
          required
          placeholder='Type member...'
          name='role'
          value={editRowData.role}
          onChange={handleEditRowFormChange}
        >
        </input>
      </td>
      <td>
        <Button type='submit' sx={{ color: 'green', fontWeight: '800' }}>Save</Button>
        <Button type='button' sx={{ fontWeight: '800' }} onClick={handleCancelClick}>Cancel</Button>
      </td>
    </tr>
  )
}

export default EditData