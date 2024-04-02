import { useState } from "react";
import ButtonComponent from "../elements/Button";

const LandingPage = () => {
  // Sample list of tournaments
  const [tournaments, setTournaments] = useState([
    { id: 1, name: 'Tournament 1' },
    { id: 2, name: 'Tournament 2' },
    { id: 3, name: 'Tournament 3' },
    { id: 4, name: 'Tournament 4' },
  ]);
  const tournament = {id: 5, name : 'the theourneye'};


  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-8 rounded shadow-md">
        <div className="flex">
            <h1 className="text-3xl font-bold mb-4">MyTourn</h1>
        </div>
        <ul className="divide-y divide-gray-300">
            
          {tournaments.map(tournament => (
            <li key={tournament.id} className="py-2">
              <button className="text-blue-500 hover:text-blue-700 focus:outline-none">
                {tournament.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
