import React, { useState } from 'react';

const PlayerPage = ({ player }) => {
  const [teams, setTeams] = useState([
    { id: 1, name: "Team A" },
    { id: 2, name: "Team B" },
    { id: 3, name: "Team C" },
  ]);

  const [selectedTeam, setSelectedTeam] = useState("");

  const [selectedSponsor, setSelectedSponsor] = useState(null);

  const [sponsorList, setSponsorList] = useState([
    { id: 1, name: 'Sponsor A', region: 'Region A', contact: 'contactA@example.com', contractStartDate: '2024-01-01', contractEndDate: '2025-01-01' },
    { id: 2, name: 'Sponsor B', region: 'Region B', contact: 'contactB@example.com', contractStartDate: '2024-02-01', contractEndDate: '2025-02-01' },
    { id: 3, name: 'Sponsor C', region: 'Region C', contact: 'contactC@example.com', contractStartDate: '2024-03-01', contractEndDate: '2025-03-01' },
  ]);

  const handleSelectChange = (e) => {
    setSelectedTeam(e.target.value);
  };

  const handleSponsorSelectChange = (e) => {
    const sponsorId = parseInt(e.target.value);
    const sponsor = sponsorList.find(sponsor => sponsor.id === sponsorId);
    setSelectedSponsor(sponsor);
  };

  return (
    <div className="bg-gray-100  flex items-center justify-center">
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
        <div>
          <h1>Select a Team to Add</h1>
          <select value={selectedTeam} onChange={handleSelectChange}>
            <option value="">Select a team...</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          {selectedTeam && (
            <div>
              <h2>Selected Team</h2>
              <p>ID: {selectedTeam}</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Team
              </button>

            </div>
          )}
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Assign a Sponsor</h2>
          <select value={selectedSponsor ? selectedSponsor.id : ""} onChange={handleSponsorSelectChange}>
            <option value="">Select a sponsor...</option>
            {sponsorList.map((sponsor) => (
              <option key={sponsor.id} value={sponsor.id}>
                {sponsor.name}
              </option>
            ))}
          </select>
          {selectedSponsor && (
            <div>
              <p><strong>Name:</strong> {selectedSponsor.name}</p>
              <p><strong>Region:</strong> {selectedSponsor.region}</p>
              <p><strong>Contact:</strong> {selectedSponsor.contact}</p>
              <p><strong>Contract Start Date:</strong> {selectedSponsor.contractStartDate}</p>
              <p><strong>Contract End Date:</strong> {selectedSponsor.contractEndDate}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
