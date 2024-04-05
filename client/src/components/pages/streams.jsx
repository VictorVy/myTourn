import React, { useState } from 'react';

const StreamsPage = () => {
  const [streams, setStreams] = useState([
    {id: 1, host:'GameCon Live', viewership: 1000}
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

  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [orderByViewership, setOrderByViewership] = useState(false);

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setOrderByViewership(event.target.checked);
    if(orderByViewership){
      fetch("http://localhost:5172/api/highestAvgViewershipPlatform")
    .then((res) => res.json())
    .then((data) => {
    console.log("/api/highestAvgViewershipPlatform result")
    console.log(data);
    //setStreams(data);

    const newStremas = [
      { id: 1, platform: 'Twitch', host: 'Streamer1', viewership: 1000 },
      { id: 2, platform: 'YouTube', host: 'Streamer2', viewership: 500 },
      
    ];
    setStreams(newStremas);
  });
    }
    else {
      const newStremas = [
        { id: 3, platform: 'Twitch', host: 'Streamer4', viewership: 1000 },
        { id: 4, platform: 'YouTube', host: 'Streamer5', viewership: 500 },
        
      ];
      setStreams(newStremas);
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
          {streams && streams.map((stream) => (
            (!selectedPlatform || stream.platform === selectedPlatform) && (
              <li key={stream.id} className="border rounded p-4">
                <div>Host: {stream.host}</div>
                <div>Viewership: {stream.viewership}</div>
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StreamsPage;
