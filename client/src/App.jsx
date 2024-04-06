import React, { useEffect, useState } from "react"
import LandingPage from "./components/pages/landingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/elements/NavBar.jsx";
import Teams from "./components/pages/teams.jsx";
import Players from "./components/pages/players.jsx";
import StreamsPage from "./components/pages/streams.jsx";



function App() {
  const [apiTest, setApiTest] = useState({test: "test"});

  // /api
  // useEffect(() => {
  //   fetch("http://localhost:5172/api")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setApiTest(data.message);
  //       console.log("/api result")
  //       console.log(data.message);
  //     })
  // }, []);

  // // /api/query
  // fetch("http://localhost:5172/api/query?selectList=*&fromList=Participant")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log("/api/query result")
  //     console.log(data);
  //   });

  // // /api/insert
  // fetch("http://localhost:5172/api/insert", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({
  //     table: "Participant",
  //     columns: "id, displayname",
  //     valuesArr: ["999, 'test999'",
  //                 "9999, 'test1000'"]
  //   })
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log("/api/insert result")
  //     console.log(data);
  //   });

  //   // /api/update
  // fetch("http://localhost:5172/api/update", {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({
  //     table: "Participant",
  //     setList: "displayname = 'UPDATED'",
  //     whereClause: "id = 999"
  //   })
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log("/api/update result")
  //     console.log(data);
  //   });

  //   // /api/delete 
  // fetch("http://localhost:5172/api/delete", {
  //   method: "DELETE",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({
  //     table: "Participant",
  //     whereClause: "id = 9999"
  //   })
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log("/api/delete result")
  //     console.log(data);
  //   });


  // // /api/teamPlayers/:teamId done
  // fetch("http://localhost:5172/api/teamPlayers/1")
  //   .then((res) => res.json()) 
  //   .then((data) => {
  //     console.log("/api/teamPlayers/:teamId result")
  //     console.log(data);
  //   });

  // // /api/numTournParticipants
  // fetch("http://localhost:5172/api/numTournParticipants")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log("/api/numTournParticipants result")
  //     console.log(data);
  //   });

  // // /api/popularGames 
  // fetch("http://localhost:5172/api/popularGames")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log("/api/popularGames result")
  //     console.log(data);
  //   });

  // /api/highestAvgViewershipPlatform done
  // fetch("http://localhost:5172/api/highestAvgViewershipPlatform")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log("/api/highestAvgViewershipPlatform result")
  //     console.log(data);
  //   });

  // // /api/mvps
  // fetch("http://localhost:5172/api/mvps")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log("/api/mvps result")
  //     console.log(data);
  //   });

  

  const api_regex = /^\/api.*/
   // if using "/api" in the pathname, don't use React Router
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
                <Route exact path="/Players" element={
              <Players></Players>
            } 
            ></Route>
            <Route exact path="/Teams" element={
              <Teams></Teams>
            }></Route>
            <Route exact path="/Streams" element={
              <StreamsPage></StreamsPage>
            }></Route>
          </Routes>
          </div>
      </div>
    </div>
    </Router>
  ) 
  }
}

export default App