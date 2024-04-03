import React, { useEffect, useState } from "react"
import LandingPage from "./components/pages/landingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/elements/NavBar.jsx";
import TournamentPage from "./components/pages/tournamentInfoPage.jsx";
import Teams from "./components/pages/teams.jsx";



function App() {
  const [apiTest, setApiTest] = useState("");

  useEffect(() => {
    fetch("http://localhost:5172/api")
      .then((res) => res.json())
      .then((data) => setApiTest(data.message));
  }, []);

  return (
    <Router>
    <div>
      <div>
          <NavBar></NavBar>
          <div className="">
            <Routes>
              <Route exact path="/" element = {
                <><LandingPage></LandingPage> </>
              }>

            </Route>
            <Route exact path="/Tournaments" element={
              <TournamentPage></TournamentPage>
            }>

             
            </Route>
            <Route exact path="/Teams" element={
              <Teams></Teams>
            }></Route>
          </Routes>
          </div>
      </div>
    </div>
    </Router>
  )
}

export default App