import './Users.css'
import ScrollToBottom from 'react-scroll-to-bottom'
const Users = ({users}) => {
    
    return (
      <ScrollToBottom className="users-wrapper">
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
      </ScrollToBottom>
    )
}

export default Users
