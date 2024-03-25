import React, { useEffect, useState } from "react"

function App() {
  const [apiTest, setApiTest] = useState("");

  useEffect(() => {
    fetch("http://localhost:5172/api")
      .then((res) => res.json())
      .then((data) => setApiTest(data.message));
  }, []);

  return (
    <>
      <div className="text-red-800 font-bold">Hello Victor and Ronald!</div>
      <div className="text-blue-800 font-bold">{(apiTest === "") ? <p>Loading...</p> : <p>{apiTest}</p>}</div>
    </>
  )
}

export default App