import React, { useState } from "react";

const TeamTable = () => {
  const [teams, setTeams] = useState([
    { id: 1, displayName: 'Thepeople', coach: 'Victor' },
    { id: 2, displayName: 'The Meaners', coach: 'Michael Scott'},
    { id: 3, displayName: 'Papa', coach: 'Danny Phantom'}
  ]);

  const addTeam = () => {
    setTeams([...teams, { id: teams.length + 1, displayName: '', coach: '' }]);
  };

  const deleteTeam = (id) => {
    const newTeams = teams.filter(team => team.id !== id);
    setTeams(newTeams);
  };

  const handleInputChange = (e, id, key) => {
    const newTeams = teams.map(team => {
      if (team.id === id) {
        return { ...team, [key]: e.target.value };
      }
      return team;
    });
    setTeams(newTeams);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between mb-4">
          <button onClick={addTeam} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Team
          </button>
          <button onClick={() => deleteTeam()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete Selected
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th>Display Name</th>
              <th>Coach</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id}>
                 <td>{team.coach}</td>
                 <td>{team.displayName}</td>
                 <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamTable;
