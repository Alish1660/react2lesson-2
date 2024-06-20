import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";

const UserModal = ({ open, toggle, user, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        number: user.number || "",
      });
    } else {
      setForm({
        name: "",
        email: "",
        number: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      id: user ? user.id : null,
    });
  };

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {user ? "Edit User" : "Add User"}
      </ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Number:</label>
            <input
              type="text"
              placeholder="Number"
              className="form-control"
              name="number"
              value={form.number}
              onChange={handleChange}
              required
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            {user ? "Save" : "Add User"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default UserModal;
