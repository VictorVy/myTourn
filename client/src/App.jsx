import React, { useEffect, useState } from "react"
import LandingPage from "./components/pages/landingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/elements/NavBar.jsx";
import TournamentPage from "./components/pages/tournamentInfoPage.jsx";



function App() {
  const [apiTest, setApiTest] = useState({});

  useEffect(() => {
    fetch("http://localhost:5172/api/query?selectList=*&fromList=participant")
      .then((res) => res.json())
      .then((data) => setApiTest(data))
      .then(() => console.log(apiTest));
  }, []);


  const api_regex = /^\/api.*/
   // if using "/api/" in the pathname, don't use React Router
   if (api_regex.test(window.location.pathname)) {
      return <div /> // must return at least an empty div
   } else {
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
          </Routes>
          </div>
      </div>
    </div>
    </Router>
  ) 
  }
}

export default App