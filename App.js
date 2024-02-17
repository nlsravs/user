import React, { useState, useEffect } from 'react';
import './App.css'; // You can define your CSS styles in this file

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('https://602e7c2c4410730017c50b9d.mockapi.io/users')
      .then(response => response.json())
      .then(users => {
        setUsers(users.slice(10));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const toggleDetails = (userId) => {
    const userDetails = document.getElementById(`details${userId}`);
    userDetails.style.display = userDetails.style.display === 'none' ? 'block' : 'none';
  };

  const closeDetails = (userId) => {
    const userDetails = document.getElementById(`details${userId}`);
    userDetails.style.display = 'none';
  };

  return (
    <div className="App">
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="container">
          <div className="user-list" id="userList">
            <h2>User List</h2>
            {users.length === 0 && <p>No data to show</p>}
            {users.map(user => (
              <div key={user.id} className="user-list-item">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={user.avatar} alt="Profile Picture" className="profile-picture" style={{ marginRight: '10px' }} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="user-info">
                      <h3>{`${user.profile.firstName} ${user.profile.lastName}`}</h3>
                      <p>{user.jobTitle}</p>
                    </div>
                    <button onClick={() => toggleDetails(user.id)}>Click Me</button>
                  </div>
                </div>
                <div id={`details${user.id}`} className="user-details-content" style={{ display: 'none' }}>
                  <div className="banner">
                    <div className="profile-picture-container" style={{ backgroundImage: 'linear-gradient(to bottom, red, #E6E6FA)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img src={user.avatar} className="img-fluid" style={{ maxWidth: '150px', height: '150px' }} />
                    </div>
                    <div className="menu">
                      <div className="opener">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                    <h3>{`${user.profile.firstName} ${user.profile.lastName}`}</h3>
                    <p><strong>Job Title:</strong> {user.jobTitle}</p>
                    <p><strong>Email:</strong> {user.profile.email}</p>
                    <p><strong>Bio:</strong> {user.Bio}</p>
                    <div className="actions">
                      <div className="follow-btn">
                        <button onClick={() => closeDetails(user.id)}>Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
