import React, { useState, useEffect } from 'react'

const Users = ({users}) => {
    
 
    

    
    
    return (
        <div>
           {
      users
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div>
              <h2>
                {users.map(({username}) => (
                  <div key={username}>
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
