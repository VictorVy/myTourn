import React, { useState, useEffect } from "react";
import TournamentPage from "./tournamentInfoPage";
import TeamTable from "../elements/teamTable";
import SoloTable from "../elements/singleTable";

const LandingPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [partCount, setPartCount] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5172/api/query?selectList=*&fromList=Tournament")
      .then((res) => res.json())
      .then((data) => {
        setTournaments(data.rows);
      });

    fetch("http://localhost:5172/api/numTournParticipants")
      .then((res) => res.json())
      .then((data) => {
        setPartCount(data.rows);
      });
  }, []);

  const [selectedTourney, setSelectedTourney] = useState(null);

  const handleClick = (tourney) => {
    console.log(tourney);
    setSelectedTourney(tourney);
  };

  const handleAddTournament = () => {
    fetch("http://localhost:5172/api/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        table: "Tournament",
        columns: "id, name, startdate, enddate, gameid, organizerid, streetaddress",
        valuesArr: [`${selectedTourney.ID}, '${selectedTourney.NAME}', '${selectedTourney.STARTDATE}', '${selectedTourney.ENDDATE}', ${selectedTourney.GAMEID}, ${selectedTourney.ORGANIZERID}, '${selectedTourney.STREETADDRESS}'`]
      })
    })
    setTournaments([...tournaments, selectedTourney]);
  };

  const handleRemoveTournament = () => {
    if (!selectedTourney) return;
    
    fetch("http://localhost:5172/api/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        table: "Tournament",
        whereClause: `id = ${selectedTourney.id}`
      })
    })

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
            {tournaments.map((tournament, index) => (
              <button key={index} onClick={() => handleClick(tournament)} className="block w-full py-2 text-left hover:bg-gray-200 focus:outline-none">
                { tournament.NAME } <br/>
                { "ID: " + tournament.ID } <br/>
                { "Participant count: " + partCount[index].PARTICIPANT_COUNT }
              </button>
            ))}
          </ul>
        </nav>
        {selectedTourney && <TournamentPage tournament={selectedTourney} />}
        {/* {selectedTourney && selectedTourney.players === 0 ? (
          selectedTourney && <TeamTable tournament={selectedTourney} />
        ) : (
          selectedTourney && <SoloTable tournament={selectedTourney} />
        )} */}
      </div>
    </div>
  );
};

export default LandingPage;
