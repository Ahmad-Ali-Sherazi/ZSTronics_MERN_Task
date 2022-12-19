import axios from "axios";
import React, { useState } from "react";

const Login = (props) => {
  const [data, setData] = useState({
    userName: "",
    password: "",
    error: null,
  });

  const { userName, password, error } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setData({ ...data, error: null });
      const res = await axios.post(
        "http://localhost:5606/api/users/login",
        { userName, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        alert("User login successfully");
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("userName", response.data.userName);
      }, (error) => {
        console.log(error);
        alert(error.message);
      });
      
      
      props.history.push("/");
    } catch (err) {
      setData({ ...data, error: err.response.data.error });
    }
  };

  return (
    <div className="row">
      <div className="col-sm-2" />
      <div className="col-sm-8">
        <h4 className="text-muted text-center mb-5">Log into your account</h4>
        <div className="card p-5 shadow">
          <form>
            <div className="form-group">
              <label htmlFor="userName">userName</label>
              <input
                className="form-control"
                type="userName"
                name="userName"
                value={userName}
                onChange={handleChange}
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
              />
            </div>
            {error ? <p className="text-danger">{error}</p> : null}
            <div className="text-center">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-sm-2" />
    </div>
  );
};

export default Login;
