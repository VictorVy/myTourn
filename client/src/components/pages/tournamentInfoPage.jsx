import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TournamentPage = ({ tournament }) => {
  const [editBroadcast, setEditBroadcast] = useState(false);
  const [editSponsor, setEditSponsor] = useState(false);
  const [editGame, setEditGame] = useState(false);
  const [editVenue, setEditVenue] = useState(false);

  const handleEditBroadcast = () => {
    setEditBroadcast(true);
  };

  const handleEditSponsor = () => {
    setEditSponsor(true);
  };

  const handleEditGame = () => {
    setEditGame(true);
  };

  const handleEditVenue = () => {
    setEditVenue(true);
  };

  const handleSaveBroadcast = () => {
    // Save edited broadcast details
    setEditBroadcast(false);
  };

  const handleSaveSponsor = () => {
    // Save edited sponsor details
    setEditSponsor(false);
  };

  const handleSaveGame = () => {
    // Save edited game details
    setEditGame(false);
  };

  const handleSaveVenue = () => {
    // Save edited venue details
    setEditVenue(false);
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-4">{tournament.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">Broadcast</h2>
            {editBroadcast ? (
              <>
                <input type="text" placeholder="Broadcast Name" />
                <input type="text" placeholder="Platform" />
                <input type="number" placeholder="Viewership" />
                <button onClick={handleSaveBroadcast} className="border bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mb-2"> Save </button>
              </>
            ) : (
              <>
                <p>{tournament.broadcast.name}</p>
                <p>{tournament.broadcast.platform}</p>
                <p>{tournament.broadcast.viewership} viewers</p>
                <button onClick={handleEditBroadcast} className="border bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mb-2"> Edit </button>
              </>
            )}
          </div>

          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">Sponsor</h2>
            {editSponsor ? (
              <>
                <input type="text" placeholder="Sponsor Name" />
                <input type="number" placeholder="Amount" />
                <button onClick={handleSaveSponsor} className="border bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mb-2"> Save </button>
              </>
            ) : (
              <>
                <p>{tournament.sponsor.SponsorName}</p>
                <p>{tournament.sponsor.amount}$</p>
                <button onClick={handleEditSponsor} className="border bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mb-2"> Edit </button>
              </>
            )}
          </div>

          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">Game Name</h2>
            {editGame ? (
              <>
                <input type="text" placeholder="Game Name" />
                <input type="text" placeholder="Game Type" />
                <button onClick={handleSaveGame} className="border bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mb-2"> Save </button>
              </>
            ) : (
              <>
                <p>{tournament.game.name}</p>
                <p className="text-sm text-gray-500">{tournament.game.type}</p>
                <button onClick={handleEditGame} className="border bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mb-2"> Edit </button>
              </>
            )}
          </div>

          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">Venue</h2>
            {editVenue ? (
              <>
                <input type="text" placeholder="Street Address" />
                <input type="text" placeholder="City" />
                <input type="text" placeholder="Country" />
                <button onClick={handleSaveVenue} className="border bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mb-2"> Save </button>
              </>
            ) : (
              <>
                <p>{tournament.venue.streetAddress}, {tournament.venue.city}</p>
                <p>{tournament.venue.country}</p>
                <button onClick={handleEditVenue} className="border bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mb-2"> Edit </button>
              </>
            )}
          </div>
        </div>
      </div>
      <>
      </>
    </div>
  );
};

export default TournamentPage;
