import React, { useState, useEffect } from 'react';

const TeamPage = ({ team, addTeamPlayer }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [newPlayers, setNewPlayers] = useState([
    // { id: 4, displayName: 'Player1', firstName: 'John', lastName: 'Doe', age: 25 },
    // { id: 5, displayName: 'Player2', firstName: 'Jane', lastName: 'Smith', age: 30 },
    // { id: 6, displayName: 'Player3', firstName: 'Alice', lastName: 'Johnson', age: 22 }
  ]);

  useEffect(() => {
    const str = `http://localhost:5172/api/teamPlayers/${team.ID}`
    console.log(str);
    fetch(str)
      .then((res) => res.json())
      .then((data) => {
        console.log("/api/query new players result");
        console.log(data);
        setNewPlayers(data.rows);
      });
  });

  const handleSelectChange = (event) => {
    setSelectedPlayer(event.target.value);
  };
 
  const addPlayer = (selectedPlayer) => {
    addTeamPlayer(selectedPlayer);
    console.log("hi");
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-8 rounded shadow-md">
        <div className="flex justify-center mb-8">
          <h1 className="text-3xl font-bold">Team Details</h1>
        </div>
        <div className="mb-4">
          <p><strong>ID:</strong> {team.ID}</p>
          <p><strong>Coach:</strong> {team.COACH}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Players</h2>
          <ul className="list-disc pl-4">
            {newPlayers.map(player => (
              <li key={player.id}>
                {player.PLAYERID} - {player.FIRSTNAME} {player.LASTNAME}, Age: {player.AGE}
              </li>
            ))}
          </ul>
          <div>
            {selectedPlayer && (
              <div>
                <h2>Selected Player</h2>
                <p>ID: {selectedPlayer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
