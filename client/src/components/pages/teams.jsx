import React, { useState, useEffect } from 'react';
import TeamPage from './teamPage';

const Teams = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teams, setTeams] = useState([
    ""
  ]);

  useEffect(() => {
    fetch("http://localhost:5172/api/query?selectList=*&fromList=Team")
    .then((res) => res.json())
    .then((data) => {
      console.log("/api/query result")
      console.log(data);
      setTeams(data.rows);
    });
  }, []);

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
        {/* <input
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
        /> */}
        {/* <button onClick={addTeam} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Team
        </button>
        <button onClick={deleteTeam} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete Team
        </button> */}
      </div>
      <ul className="space-y-2">
        {teams.map((team, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white rounded shadow-md py-2 px-4 transition-colors duration-300 hover:bg-gray-100"
            onClick={() => handleTeamClick(team)}
          >
            <span>{team.ID}</span>
            <span>{team.COACH}</span>
          </li>
        ))}
      </ul>
      {selectedTeam && <TeamPage team={selectedTeam} />}

    </div>
  );
};

export default Teams;
