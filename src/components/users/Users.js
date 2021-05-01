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
                {users.map(({username}) => (
                  <div key={username} className="user-box">
                    {username}
                  </div>
                ))}
            </div>
          </div>
        )
        : null
    }
      </div>
    )
}

export default Users
