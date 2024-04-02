import React, { useState } from 'react';
import SoloTable from '../elements/singleTable';
import TeamTable from '../elements/teamTable';


const TournamentPage = () => {
    const tournament = {
        name: "Sample Tournament",
        broadcast: {host: "vgbootcamp", platform:"twitch", viewership:"64"}, 
        sponsor: {SponsorName: "Liquid", id: 2, amount: 1221},
        game: { name: "Sample Game", type: "Team-Based", size: 1, numTeams: 1 },
        venue: {streetAddress: "5555 clint", city: "burnaby", country: "Canada", postalCode: "V6P20D"}
      };
     

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-4">{tournament.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">Broadcast</h2>
            <p>{tournament.broadcast.name}</p>
            <p>{tournament.broadcast.platform}</p> 
            <p>{tournament.broadcast.viewership} viewers</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">Sponsor</h2>
            <p>{tournament.sponsor.SponsorName}</p>
            <p>{tournament.sponsor.amount}$</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">Game Name</h2>
            <p>{tournament.game.name}</p>
            <p className="text-sm text-gray-500">{tournament.game.type}</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">Venue</h2>
            <p>{tournament.venue.streetAddress}, {tournament.venue.city}</p>
            <p>{tournament.venue.country}</p>
          </div>
        </div>
      </div>
      <>
      <TeamTable></TeamTable>
      <SoloTable></SoloTable>
      </>
    </div>
  );
};

export default TournamentPage;
