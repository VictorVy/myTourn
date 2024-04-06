import React, { useState, useEffect } from 'react';

const Players = () => {
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [newParticipant, setNewParticipant] = useState({
    ID: '',
    displayName: ''
  });
  const [checkder, setCheckder] = useState(false); // Moved to the top level
  const [mvp, setMvp] = useState([""]);

  useEffect(() => {
    fetch("http://localhost:5172/api/mvps")
    .then((res) => res.json())
    .then((data) => {
      console.log("/api/mvps result")
      console.log(data);
      setMvp(data.rows);
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5172/api/query?selectList=*&fromList=Participant")
      .then((res) => res.json())
      .then((data) => {
        console.log("/api/query result");
        console.log(data);
        setParticipants(data.rows);
      });
  }, []);

  const handleParticipantClick = (participant) => {
    setSelectedParticipant(participant);
    console.log(participant);
  };

const addParticipant = () => {
    const playerString = `${newParticipant.ID}, '${newParticipant.displayName}'`;

fetch("http://localhost:5172/api/insert", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    table: "Participant",
    columns: "id, displayName",
    valuesArr: [playerString]
  })
})
.then((res) => res.json())
    .then((res) => {
      console.log(res.rowsAffected);
      if (res.rowsAffected === undefined) {
        throw new Error(res.code);
      }
      return res;
    })
    .then(async (data) => {
      console.log("/api/insert result");
      console.log(data);
      return await fetch("http://localhost:5172/api/query?selectList=*&fromList=Participant")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("/api/query result");
        setParticipants(data.rows);
      })
    }).catch((error) => {
      console.log("Error during fetch:", error);
      // Handle the error here, such as showing an error message to the user
      window.alert("Failed to add participant: " + error);
    });
      
  };

  const deleteParticipant = () => {
    console.log(selectedParticipant.ID);
    if (!selectedParticipant) return;

    fetch("http://localhost:5172/api/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        table: "Participant",
        whereClause: "id = " + selectedParticipant.ID
      })
    })
      .then(() => {
        fetch("http://localhost:5172/api/query?selectList=*&fromList=Participant")
          .then((res) => res.json())
          .then((data) => {
            console.log("/api/query result");
            console.log(data);
            setParticipants(data.rows);
            setSelectedParticipant(null); // Reset selected participant after deletion
          });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewParticipant({ ...newParticipant, [name]: value });

    let filter = document.getElementById("filter_input").value;
    if (filter === "") {
      filter = "1=1";
    }

    fetch("http://localhost:5172/api/query?selectList=*&fromList=Participant&whereClause=" + filter)
      .then((res) => res.json())
      .then((data) => {
        console.log("/api/query result");
        console.log(data);
        setParticipants(data.rows);
      });
  };

  const handleUpdateParticipant = (id) => {
    fetch("http://localhost:5172/api/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        table: "Participant",
        setList: `displayname = '${newParticipant.displayName}'`,
        whereClause: `id = ${id}`
      })
    })
    .then(() => {
      fetch("http://localhost:5172/api/query?selectList=*&fromList=Participant")
        .then((res) => res.json())
        .then((data) => {
          console.log("/api/update result");
          console.log(data);
          setParticipants(data.rows);
        });
    });

    fetch("http://localhost:5172/api/mvps")
      .then((res) => res.json())
      .then((data) => {
        console.log("/api/mvps result");
        console.log(data);
        setMvp(data.rows);
      });
  };

  const handleChecked = () => {
    setCheckder(!checkder); // Toggle checkder state
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Participants</h2>
      <div className="mb-4">
        <input
          id="filter_input"
          type="text"
          name="Filter"
          placeholder="Filter"
          onChange={handleChange}
          className="border rounded py-2 px-3 mr-2"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="ID"
          value={newParticipant.ID}
          placeholder="Participant ID"
          onChange={handleChange}
          className="border rounded py-2 px-3 mr-2"
        />
        <input
          type="text"
          name="displayName"
          value={newParticipant.displayName}
          placeholder="Display Name"
          onChange={handleChange}
          className="border rounded py-2 px-3 mr-2"
        />
        <button onClick={addParticipant} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Participant
        </button>
        <button onClick={deleteParticipant} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>
      </div>
      <ul className="space-y-2">
        {participants && participants.map((participant, index) => (
          <li
            key={index}
            className={`flex justify-between items-center bg-white rounded shadow-md py-2 px-4 transition-colors duration-300 hover:bg-gray-100 ${selectedParticipant && selectedParticipant.ID === participant.ID ? 'border-blue-500' : ''}`}
            onClick={() => handleParticipantClick(participant)}
          >
            <span>Display Name: {participant.DISPLAYNAME}</span>
            <span>ID: {participant.ID}  </span>
            <button onClick={() => handleUpdateParticipant(participant.ID)}>Update</button>
          </li>
        ))}
      </ul>
      <div className="mb-4">
        <input
          type="checkbox"
          id="Highest Viwership"
          checked={checkder}
          onChange={handleChecked}
          className="mr-2"
        />
        <label htmlFor="orderByViewership">Show MVP</label>
        {checkder && 
          <div>
            {mvp && mvp.map((displayName, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white rounded shadow-md py-2 px-4 transition-colors duration-300"
        
          >
            <span>ID: {displayName.ID} Name: {displayName.FIRSTNAME} {displayName.LASTNAME }</span>
          </li>
        ))}
          </div>
        }
      </div>
    </div>
  );
};

export default Players;
