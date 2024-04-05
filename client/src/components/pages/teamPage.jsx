import React, { useState } from 'react';



const TeamPage = ({team, addTeamPLayer}) => {
  

  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [newPlayers, setNewPlayers] = useState([
    { id: 4, displayName: 'Player1', firstName: 'John', lastName: 'Doe', age: 25 },
    { id: 5, displayName: 'Player2', firstName: 'Jane', lastName: 'Smith', age: 30 },
    { id: 6, displayName: 'Player3', firstName: 'Alice', lastName: 'Johnson', age: 22 }
  ]);

  // /api/teamPlayers/:teamId
  // fetch("http://localhost:5172/api/teamPlayers/" + team.id)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log("/api/teamPlayers/:teamId result")
  //     console.log(data);
  //     setNewPlayers(data);
  //   });



  const handleSelectChange = (event) => {
    setSelectedPlayer(event.target.value);
  };
 
  const addPlayer = (selectedPlayer) => {
    addTeamPLayer(selectedPlayer);
    console.log("hi");
  };

  

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-8 rounded shadow-md">
        <div className="flex justify-center mb-8">
          <h1 className="text-3xl font-bold">Team Details</h1>
        </div>
        <div className="mb-4">
          <p><strong>Team Name:</strong> {team.name}</p>
          <p><strong>Coach:</strong> {team.coach}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Players</h2>
          <ul className="list-disc pl-4">
            {team.players.map(player => (
              <li key={player.id}>
                {player.displayName} - {player.firstName} {player.lastName}, Age: {player.age}
              </li>
            ))}
          </ul>
          <div>
      <h1>Add Players</h1>
      <select value={selectedPlayer} onChange={handleSelectChange}>
        <option value="">Select a player...</option>
        {newPlayers.map((player) => (
          <option key={player.id} value={player.id}>
            {player.displayName}
          </option>
        ))}
      </select>
      {selectedPlayer && (
        <div>
          <h2>Selected Player</h2>
          <p>ID: {selectedPlayer}</p>
          {/* You can display other player details here */}
        </div>
      )}
      <button onClick={addPlayer => (selectedPlayer)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Player
        </button>
    </div>
   
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
