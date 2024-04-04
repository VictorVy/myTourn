import React, { useState, useEffect } from 'react';

const ButtonComponent = () => {

  useEffect(() => {
    // This effect will be called after every render
    console.log("delete from json");
  });

  //dummy behaviour 
  const handleButtonClick = () => {
    console.log("handlclick")
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Click me</button>
      <p>Button clicked</p>
    </div>
  );
};

export default ButtonComponent;
