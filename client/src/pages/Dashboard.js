import React, { useEffect, useState } from "react";
import axios from "axios";
const Record = (props) => (
  <tr>
    <td>{props.record.userName}</td>
    <td>{props.record.loginTime}</td>
    <td>{props.record.logoutTime}</td>
    <td>{props.record.invalidAttemptTime}</td>
    <td>{props.record.passwordResetTime}</td>
    <td>{props.record.id}</td>
  </tr>
);

export default function Dashboard() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await axios.post(
        "http://localhost:5606/api/users/activities",
        { userName: localStorage.getItem("userName") },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        //setRecords(records);
      }, (error) => {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      });

      const records = await response.json();
      
    }

    getRecords();

    return; 
  }, [records.length]);

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          key={record._id}
        />
      );
    });
  }
  function userRecordList() {

  }
  // This following section will display the table with the records of individuals.
  return (
    <>
    <div>
      <h3>User Activity</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
    <div>
      <h3>Registered Users</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{userRecordList()}</tbody>
      </table>
    </div>
    </>
    
  );
}
