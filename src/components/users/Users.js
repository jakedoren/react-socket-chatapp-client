import React, { useState, useEffect } from 'react'
import './Users.css'
const Users = ({users}) => {
    
    
    return (
      <div className="users-wrapper">
           {
      users
        ? (
          <div className="users-copy-wrap">
            <h1>Participants</h1>
            <div>
              <h2>
                {users.map(({username}) => (
                  <div key={username} className="user-box">
                    {username}
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
      </div>
        
    )
}

export default Users
