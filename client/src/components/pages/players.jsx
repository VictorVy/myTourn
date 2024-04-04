import React, { useState } from 'react';
import SoloTable from '../elements/singleTable';
import PlayerPage from './playerPage';

const Players = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [players, setPlayers] = useState([
    {
      id: 1,
      displayName: 'Player1',
      firstName: 'John',
      lastName: 'Doe',
      age: 25
    },
    {
      id: 2,
      displayName: 'Player2',
      firstName: 'Jane',
      lastName: 'Smith',
      age: 30
    },
    {
      id: 3,
      displayName: 'Player3',
      firstName: 'Alice',
      lastName: 'Johnson',
      age: 22
    }
  ]);

  const [newPlayer, setNewPlayer] = useState({
    id: null,
    displayName: '',
    firstName: '',
    lastName: '',
    age: ''
  });

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const addPlayer = () => {
    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
    setNewPlayer({ id: null, displayName: '', firstName: '', lastName: '', age: '' });
  };

  const deletePlayer = (id) => {
    if (!selectedPlayer) return;
    const filteredPlayers = players.filter((player) => player.id !== selectedPlayer.id);
    setPlayers(filteredPlayers);
    setSelectedPlayer(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer({ ...newPlayer, [name]: value });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Players</h2>
      <div className="mb-4">
        <input
          type="text"
          name="displayName"
          value={newPlayer.displayName}
          placeholder="Player Display Name"
          onChange={handleChange}
          className="border rounded py-2 px-3 mr-2"
        />
        <input
          type="text"
          name="firstName"
          value={newPlayer.firstName}
          placeholder="First Name"
          onChange={handleChange}
          className="border rounded py-2 px-3 mr-2"
        />
        <input
          type="text"
          name="lastName"
          value={newPlayer.lastName}
          placeholder="Last Name"
          onChange={handleChange}
          className="border rounded py-2 px-3 mr-2"
        />
        <input
          type="number"
          name="age"
          value={newPlayer.age}
          placeholder="Age"
          onChange={handleChange}
          className="border rounded py-2 px-3 mr-2"
        />
        <button onClick={addPlayer} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Player
        </button>
        <button onClick={deletePlayer} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
      </div>
      <ul className="space-y-2">
        {players.map((player, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white rounded shadow-md py-2 px-4 transition-colors duration-300 hover:bg-gray-100"
            onClick={() => handlePlayerClick(player)}
          >
            <span>{player.displayName}</span>
          </li>
        ))}
      </ul>
      {selectedPlayer && <PlayerPage player={selectedPlayer} />}
    </div>
  );
};

export default Players;

