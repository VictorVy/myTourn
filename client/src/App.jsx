import React, { useEffect, useState } from "react"
import MyButton from './components/elements/Button.jsx';
import LandingPage from "./components/pages/landingPage";
import TournamentPage from "./components/pages/tournamentInfoPage.jsx";
import PlayerPage from "./components/pages/playerPage.jsx";
import TeamPage from "./components/pages/teamPage.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



function App() {
  const [apiTest, setApiTest] = useState("");

  useEffect(() => {
    fetch("http://localhost:5172/api")
      .then((res) => res.json())
      .then((data) => setApiTest(data.message));
  }, []);

  return (
    <>
      <TeamPage></TeamPage>
    </>
  )
}

export default App