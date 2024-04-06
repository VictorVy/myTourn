import React, { useState, useEffect } from "react";
import TournamentPage from "./tournamentInfoPage";
import TeamTable from "../elements/teamTable";
import SoloTable from "../elements/singleTable";

const LandingPage = () => {
  // Sample list of tournaments
  const [tournaments, setTournaments] = useState([
    {
      name: "Sample Tournament",
      broadcast: { host: "vgbootcamp", platform: "twitch", viewership: "64" },
      sponsor: { SponsorName: "Liquid", id: 2, amount: 1221 },
      game: { name: "Sample Game", type: "Team-Based", size: 1, numTeams: 1 },
      teams: 0,
      players: [
        { id: 1, displayName: "Player11313", firstName: "John", lastName: "Doe", age: 25 },
        { id: 2, displayName: "Player2", firstName: "Jane", lastName: "Smith", age: 30 },
        { id: 3, displayName: "Player3", firstName: "Alice", lastName: "Johnson", age: 22 },
      ],
      venue: { streetAddress: "5555 clint", city: "burnaby", country: "Canada", postalCode: "V6P20D" },
      id: 1,
    },
    {
      name: "Sample Tournament 2",
      broadcast: { host: "vgbootcamp", platform: "twitch", viewership: "64" },
      sponsor: { SponsorName: "Liquid", id: 2, amount: 1221 },
      game: { name: "Sample Game", type: "Team-Based", size: 1, numTeams: 1 },
      venue: { streetAddress: "5555 clint", city: "burnaby", country: "Canada", postalCode: "V6P20D" },
      teams: [
        { id: 1, displayName: "Thepeople", coach: "Victor" },
        { id: 2, displayName: "The Meaners", coach: "Michael Scott" },
        { id: 3, displayName: "Papa", coach: "Danny Phantom" },
      ],
      players: 0,
      id: 2,
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:5172/api/query?selectList=*&fromList=Tournament")
      .then((res) => res.json())
      .then((data) => {
        // setTournaments(data);
        console.log("LANDING PAGE")
        console.log(data);
      })
  }, []);

  const [selectedTourney, setSelectedTourney] = useState(null);
  const tournamentInfo = { id: 5, name: "the theourneye" };

  const handleClick = (tourney) => {
    setSelectedTourney(tourney);
  };

  const handleAddTournament = () => {
    const newTournament = {
      name: "New Tournament",
      broadcast: { host: "", platform: "", viewership: "" },
      sponsor: { SponsorName: "", id: null, amount: 0 },
      game: { name: "", type: "", size: 0, numTeams: 0 },
      teams: 0,
      players: [],
      venue: { streetAddress: "", city: "", country: "", postalCode: "" },
      id: tournaments.length + 1,
    };
  //   fetch("http://localhost:5172/api/insert", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({
  //     table: "Tournament",
  //     columns: "id, displayname",
  //     valuesArr: ["999, 'test999'",
  //                 "9999, 'test1000'"]
  //   })
  // })
    setTournaments([...tournaments, newTournament]);
  };

  const handleRemoveTournament = () => {
    if (!selectedTourney) return;
    const filteredTournaments = tournaments.filter((tourney) => tourney.id !== selectedTourney.id);
    setTournaments(filteredTournaments);
    setSelectedTourney(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-8 rounded shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">MyTourn</h1>
          
          </div>
          <div className="flex">
            <button onClick={handleAddTournament} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              Add Tournament
            </button>
            <button onClick={handleRemoveTournament} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Remove Tournament
            </button>
        </div>
        <nav>
          <ul className="divide-y divide-gray-300">
            {tournaments.map((tournament) => (
              <button key={tournament.id} onClick={() => handleClick(tournament)} className="block w-full py-2 text-left hover:bg-gray-200 focus:outline-none">
                {tournament.name}
              </button>
            ))}
          </ul>
        </nav>
        {selectedTourney && <TournamentPage tournament={selectedTourney} />}
        {selectedTourney && selectedTourney.players === 0 ? (
          selectedTourney && <TeamTable tournament={selectedTourney} />
        ) : (
          selectedTourney && <SoloTable tournament={selectedTourney} />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
