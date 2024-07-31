import React, { useState } from "react";

function App() {
  const [cityName, setCityName] = useState("Islamabad");

  const handleChange = (e) => {
    setCityName(e.target.value);
  };
  return (
    <>
      <input value={cityName} onChange={handleChange} />
    </>
  );
}

export default App;
