import { useState } from "react";
import ButtonComponent from "../elements/Button";
import TournamentPage from "./tournamentInfoPage";

const LandingPage = () => {
  // Sample list of tournaments
  const [tournaments, setTournaments] = useState([
    { id: 1, name: 'Tournament 1' },
    { id: 2, name: 'Tournament 2' },
    { id: 3, name: 'Tournament 3' },
    { id: 4, name: 'Tournament 4' },
  ]);
  const tournamentInfo = {id: 5, name : 'the theourneye'};

  const handleClick = (id) =>{
    console.log(id);

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
          <li key={tournament.id} onClick={() => handleClick(tournament.id)}>
              {tournament.name}
          </li>
        ))}
        </ul>
      </nav>
      </div>
    </div>
  );
};

export default LandingPage;
