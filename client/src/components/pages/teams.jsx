import React, { useState } from 'react';
import TeamPage from './teamPage';

const Teams = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teams, setTeams] = useState([
    {
      name: 'Example Team',
      players: [
        { id: 1, displayName: 'Player1', firstName: 'John', lastName: 'Doe', age: 25 },
        { id: 2, displayName: 'Player2', firstName: 'Jane', lastName: 'Smith', age: 30 },
        { id: 3, displayName: 'Player3', firstName: 'Alice', lastName: 'Johnson', age: 22 }
      ],
      coach: 'Coach Name'
    },
    {
      name: 'Example Team 2',
      players: [
        { id: 1, displayName: 'Player123', firstName: 'John', lastName: 'Doe', age: 25 },
        { id: 2, displayName: 'Player2', firstName: 'Jane', lastName: 'Smith', age: 30 },
        { id: 3, displayName: 'Player3', firstName: 'Alice', lastName: 'Johnson', age: 22 }
      ],
      coach: 'Coach Name'
    },
  ]);

  const [newTeam, setNewTeam] = useState({
    name: '',
    players: [],
    coach: ''
  });

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  const addTeam = () => {
    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);
    setNewTeam({ name: '', players: [], coach: '' });
  };

  const deleteTeam = (id) => {
    const newTeams = [...teams];
    newTeams.splice(id, 1);
    setTeams(newTeams);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({ ...newTeam, [name]: value });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Teams</h2>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          value={newTeam.name}
          placeholder="Team Name"
          onChange={handleChange}
          className="border rounded py-2 px-3 mr-2"
        />
        <input
          type="text"
          name="coach"
          value={newTeam.coach}
          placeholder="Coach Name"
          onChange={handleChange}
          className="border rounded py-2 px-3 mr-2"
        />
        <button onClick={addTeam} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Team
        </button>
        <button onClick={deleteTeam} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete Team
        </button>
      </div>
      <ul className="space-y-2">
        {teams.map((team, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white rounded shadow-md py-2 px-4 transition-colors duration-300 hover:bg-gray-100"
            onClick={() => handleTeamClick(team)}
          >
            <span>{team.name}</span>
          </li>
        ))}
      </ul>
      {selectedTeam && <TeamPage team={selectedTeam} />}
    </div>
  );
};

export default Teams;
