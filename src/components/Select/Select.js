import React from 'react'

export default function Select({value ,onChange}) {
    return (<>
      <div className="form-control-1">
        <select value={value} name="priority" onChange={onChange} id="priority" 
          style={{width:'150px',
                 float:'right',
                 border: '1px solid grey',
                 borderRadius: '5px',
                 backgroundColor: '#f5f5f5' }}>
          <option value="">None</option>
          <option value="createdAt">Created On</option>
          <option value="dueDate">Pending On</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      </>
    )
}