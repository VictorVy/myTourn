import React from 'react';

const PlayerPage = ({player}) => {
  

  const sponsor = {
    name: 'Example Sponsor',
    region: 'Global',
    contact: 'contact@example.com',
    contractStartDate: '2024-01-01',
    contractEndDate: '2025-01-01'
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-8 rounded shadow-md">
        <div className="flex justify-center mb-8">
          <h1 className="text-3xl font-bold">Player Details</h1>
        </div>
        <div className="mb-4">
          <p><strong>Display Name:</strong> {player.displayName}</p>
          <p><strong>First Name:</strong> {player.firstName}</p>
          <p><strong>Last Name:</strong> {player.lastName}</p>
          <p><strong>Age:</strong> {player.age}</p>
          <p><strong>Team:</strong> {player.team}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Sponsor Details</h2>
          <p><strong>Name:</strong> {sponsor.name}</p>
          <p><strong>Region:</strong> {sponsor.region}</p>
          <p><strong>Contact:</strong> {sponsor.contact}</p>
          <p><strong>Contract Start Date:</strong> {sponsor.contractStartDate}</p>
          <p><strong>Contract End Date:</strong> {sponsor.contractEndDate}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
