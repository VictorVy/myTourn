import React from 'react';

const TeamPage = () => {
  const team = {
    name: 'Example Team',
    players: [
      { id: 1, displayName: 'Player1', firstName: 'John', lastName: 'Doe', age: 25 },
      { id: 2, displayName: 'Player2', firstName: 'Jane', lastName: 'Smith', age: 30 },
      { id: 3, displayName: 'Player3', firstName: 'Alice', lastName: 'Johnson', age: 22 }
    ],
    coach: 'Coach Name'
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
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
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
