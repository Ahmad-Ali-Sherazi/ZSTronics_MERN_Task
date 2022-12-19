import React, { useState } from "react";
import axios from "axios";

const Register = (props) => {
  const [data, setData] = useState({
    name: "",
    password: "",
    error: null,
  });

  const { name, password, error } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setData({ ...data, error: null });
      //const userName = name;
      await axios.post(
        "http://localhost:5606/api/users/create",
        { name, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        alert("User created successfully");
        props.history.push("/login");
      }, (error) => {
        console.log(error);
        alert(error.message);
      });
      
      
    } catch (err) {
      setData({ ...data, error: err.response.data.error });
      
    }
  };

  return (
    <div className="row">
      <div className="col-sm-2" />
      <div className="col-sm-8">
        <h4 className="text-muted text-center mb-5">Create an account</h4>

        <div className="card p-5 shadow">
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                type="name"
                name="name"
                value={name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            {error ? <p className="text-danger">{error}</p> : null}
            <div className="text-center">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-sm-2" />
    </div>
  );
};

export default Register;
