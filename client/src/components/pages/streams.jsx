import React, { useState } from 'react';

const StreamsPage = () => {
  const [streams, setStreams] = useState([
    { id: 1, platform: 'Twitch', host: 'Streamer1', viewership: 1000 },
    { id: 2, platform: 'YouTube', host: 'Streamer2', viewership: 500 },
    { id: 3, platform: 'Twitch', host: 'Streamer3', viewership: 1500 },
    { id: 4, platform: 'YouTube', host: 'Streamer4', viewership: 800 },
  ]);

  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [orderByViewership, setOrderByViewership] = useState(false);

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setOrderByViewership(event.target.checked);
  };

  const sortedStreams = orderByViewership
  fetch("http://localhost:5172/api/highestAvgViewershipPlatform")
  .then((res) => res.json())
  .then((data) => {
    console.log("/api/highestAvgViewershipPlatform result")
    console.log(data);
    //setStreams(data);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Streams Page</h1>
      <div className="mb-4">
        <label htmlFor="platformSelect" className="block mb-2">Select Platform:</label>
        <select
          id="platformSelect"
          value={selectedPlatform}
          onChange={handlePlatformChange}
          className="border rounded py-2 px-4 mr-2"
        >
          <option value="">All Platforms</option>
          <option value="Twitch">Twitch</option>
          <option value="YouTube">YouTube</option>
        </select>
      </div>
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
          {streams.map((stream) => (
            (!selectedPlatform || stream.platform === selectedPlatform) && (
              <li key={stream.id} className="border rounded p-4">
                <div className="font-semibold">Platform: {stream.platform}</div>
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
