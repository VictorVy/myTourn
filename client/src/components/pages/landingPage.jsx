import { useState } from "react";
import ButtonComponent from "../elements/Button";
import TournamentPage from "./tournamentInfoPage";
import TeamTable from "../elements/teamTable";
import SoloTable from "../elements/singleTable";

const LandingPage = () => {
  // Sample list of tournaments
  const [tournaments, setTournaments] = useState([
    {
      name: "Sample Tournament",
      broadcast: {host: "vgbootcamp", platform:"twitch", viewership:"64"}, 
      sponsor: {SponsorName: "Liquid", id: 2, amount: 1221},
      game: { name: "Sample Game", type: "Team-Based", size: 1, numTeams: 1 },
      teams: 0,
      players: [
        { id: 1, displayName: 'Player11313', firstName: 'John', lastName: 'Doe', age: 25 },
        { id: 2, displayName: 'Player2', firstName: 'Jane', lastName: 'Smith', age: 30 },
        { id: 3, displayName: 'Player3', firstName: 'Alice', lastName: 'Johnson', age: 22 }
      ],
      venue: {streetAddress: "5555 clint", city: "burnaby", country: "Canada", postalCode: "V6P20D"},
      id: 1
    },
    {
      name: "Sample Tournament 2",
      broadcast: {host: "vgbootcamp", platform:"twitch", viewership:"64"}, 
      sponsor: {SponsorName: "Liquid", id: 2, amount: 1221},
      game: { name: "Sample Game", type: "Team-Based", size: 1, numTeams: 1 },
      venue: {streetAddress: "5555 clint", city: "burnaby", country: "Canada", postalCode: "V6P20D"},
      teams: [
        { id: 1, displayName: 'Thepeople', coach: 'Victor' },
        { id: 2, displayName: 'The Meaners', coach: 'Michael Scott'},
        { id: 3, displayName: 'Papa', coach: 'Danny Phantom'}
      ],
      players: 0,
      id: 2
    
    }
  ]);

  const [selectedTourney, setSelectedTourney] = useState(null);
  const tournamentInfo = {id: 5, name : 'the theourneye'};

  const handleClick = (tourney) =>{
    setSelectedTourney(tourney)

  }


  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-8 rounded shadow-md">
        <div className="flex">
            <h1 className="text-3xl font-bold mb-4">MyTourn</h1>
            <button className="m-4">Add</button>
            <button className="m-4">Remove</button>
        </div>
        <nav>
        <ul className="divide-y divide-gray-300">
        {tournaments.map(tournament => (
          <button key={tournament.id} onClick={() => handleClick(tournament)} className='bg-red-500'>
              {tournament.name}
          </button>
        ))}
        </ul>
      </nav>
      <div>
      {selectedTourney && <TournamentPage tournament={selectedTourney} />}
      {selectedTourney && selectedTourney.players === 0 ? (
        selectedTourney && <TeamTable tournament={selectedTourney} />
      ) : (
        selectedTourney && <SoloTable tournament={selectedTourney} />
      )}
    </div>
      
      
      </div>
    </div>
  );
};

export default LandingPage;
