import React, { useEffect, useState } from 'react';

const StreamsPage = () => {
  const [streams, setStreams] = useState([
    // {id: 1, host:'GameCon Live', viewership: 1000}
    // { id: 1, platform: 'Twitch', host: 'Streamer1', viewership: 1000 },
    // { id: 2, platform: 'YouTube', host: 'Streamer2', viewership: 500 },
    // { id: 3, platform: 'Twitch', host: 'Streamer3', viewership: 1500 },
    // { id: 4, platform: 'YouTube', host: 'Streamer4', viewership: 800 },

    //fetch("http://localhost:5172/api/query?selectList=*&fromList=Broadcast")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log("/api/query result")
  //     console.log(data);
        //setStreams = data;
  //   });
    
  ]);

  const [popularGames, setPopularGames] = useState([""

    // {id: 1, name: 'smash', genre: "fighting", company: "nintendo", yearPublished: 2018},
    // {id: 2, name: 'smash', genre: "fighting", company: "nintendo", yearPublished: 2018}
  ])

  useEffect(() => {
    fetch("http://localhost:5172/api/popularGames")
    .then((res) => res.json())
    .then((data) => {
      console.log("/api/popularGames result")
      console.log(data);
      setPopularGames(data.playerGames.rows);
    });
  }, []);
  
  
  

   useEffect(() => {
    fetch("http://localhost:5172/api/query?selectList=*&fromList=Broadcast")
        .then((res) => res.json())
        .then((data) => {
      console.log("/api/query result")
      console.log(data);
      setStreams(data.rows);
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5172/api/query?selectList=*&fromList=Broadcast")
    .then((res) => res.json())
    .then((data) => {
      console.log("/api/query result")
      console.log(data);
      setStreams(data.rows);
    });
  }, []);

  const [avg, setAvg] = useState(
    false
  );
  const [orderByViewership, setOrderByViewership] = useState(false);



  const handleCheckboxChange = (event) => {
    setOrderByViewership(!orderByViewership);
    if(orderByViewership){ 
      setAvg(false)
      fetch("http://localhost:5172/api/query?selectList=*&fromList=Broadcast")
        .then((res) => res.json())
        .then((data) => {
      console.log("/api/query result")
      console.log(data);
      setStreams(data.rows);
    });
  
    
    }
    else {
      setAvg(true)
      fetch("http://localhost:5172/api/highestAvgViewershipPlatform")
      .then((res) => res.json())
      .then((data) => {
      console.log("/api/highestAvgViewershipPlatform result")
      console.log(data);
      console.log("ADWDDWAD");
      setStreams(data.rows);
      setAvg(data.rows[0])
      });
    }
  };

  const sortedStreams = orderByViewership


  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Streams Page</h1>
      <div className="mb-4">
        <input
          type="checkbox"
          id="Highest Viwership"
          checked={orderByViewership}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        <label htmlFor="orderByViewership">Highest Viewership</label>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Streams</h2>
        <ul className="space-y-4">
          {streams && !avg && streams.map((stream) => (
            (streams) && (
              <li key={stream.id} className="border rounded p-4">
                <div>Host: {stream.HOST}</div>
                <div>Viewership: {stream.VIEWERSHIP}</div>
              </li>
            )
          ))}
        </ul>
        <div>
          {avg && <h1>{avg.PLATFORM} with {avg.AVG_VIEWERSHIP} viewers </h1>} 
        </div>
      </div>
      <div>
        <h1 className='b '>Popular Games</h1>
        <ul>
          {popularGames && popularGames.map((popularGames) => (
            <li key={popularGames.id} className="border rounded p-4">
            <div>Name: {popularGames.name}</div>
            <div> Genre: {popularGames.genre}</div>
          </li>
          )
          
          )}

        </ul>
      </div>
    </div>
  );
};

export default StreamsPage;
