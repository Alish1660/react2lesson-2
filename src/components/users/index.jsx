import axios from "axios";
import React, { useEffect, useState } from "react";
import UserModal from "../modal";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/users").then((res) => {
      if (res.status === 200) {
        setUsers(res.data);
      }
    });
  }, []);

  const toggle = () => {
    setModal(!modal);
    setSelectedUser(null);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModal(true);
  };

  const handleDelete = (userId) => {
    axios.delete(`http://localhost:8000/users/${userId}`).then((res) => {
      if (res.status === 200) {
        setUsers(users.filter((user) => user.id !== userId));
      }
    });
  };

  const handleSaveUser = (updatedUser) => {
    if (updatedUser.id) {
      axios
        .put(`http://localhost:8000/users/${updatedUser.id}`, updatedUser)
        .then((res) => {
          if (res.status === 200) {
            const updatedUsers = users.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            );
            setUsers(updatedUsers);
          }
        });
    } else {
      axios.post(`http://localhost:8000/users`, updatedUser).then((res) => {
        if (res.status === 201) {
          setUsers([...users, res.data]);
        }
      });
    }
    setModal(false);
  };

  return (
    <>
      <UserModal
        open={modal}
        toggle={toggle}
        user={selectedUser}
        onSave={handleSaveUser}
      />
      <div className="container">
        <h1 className="text-center my-3"> Users</h1>
        <button className="btn btn-success my-3" onClick={() => toggle()}>
          Add User
        </button>
        <table className="table table-bordered table-striped table-hover ">
          <thead>
            <tr>
              <th>T/R</th>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.number}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm mx-1"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Index;
