import React, { useState } from 'react';
import TeamPage from './teamPage';

const Teams = () => {

    const [selectedTeam, setSelectedTeam] = useState(null);

    const teams = [ 
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
      ];
    
      

    const handleTeamClick = (team) => {
      setSelectedTeam(team);
    };
  
    return (
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Teams</h2>
        <ul className="space-y-2">
          {teams.map((team, index) => (
            <li 
              key={index} 
              className="cursor-pointer bg-white rounded shadow-md py-2 px-4 transition-colors duration-300 hover:bg-gray-100"
              onClick={() => handleTeamClick(team)}
            >
              {team.name}
            </li>
          ))}
        </ul>
        {selectedTeam && <TeamPage team={selectedTeam} />}
      </div>
    );
}
 
export default Teams;