import React, { useEffect, useState } from "react";
import axios from "axios";

let API = "http://localhost:3000/api/";

function AllUsers(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    try {
      const { data: json } = await axios.get(`${API}/users`, {
        headers: {
          Authorization: `Bearer ${props?.token}`,
        },
      });
      setUsers(json.users);
    } catch (err) {
      console.error("Unable to find users: ", err.message);
    }
  }

  return (
    <div >
      <h2>Registered Users</h2>
      <ul className="users-container">
        {users?.map((user) => {
          return (
            <li>
              <div>
                <h4>{user.name}</h4>
                <p>{user.email}</p>
                <p>{user.role}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AllUsers;
