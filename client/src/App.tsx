import React, { useState, useCallback } from "react";
import "./App.css";
import Confirmation from "./Confirmation";
import Registration from "./Registration";

function App() {
  //id will be used for calling the API again to retrieve the information on
  //our confirmation page
  const [confirmationId, setConfirmationId] = useState<number | undefined>();

  //put in callback function to avoid unnecessary function re-creation
  const handleIdChange = useCallback((id: number) => {
    setConfirmationId(id);
  }, []);

  return (
    <div className="page">
      {!!confirmationId && <Confirmation id={confirmationId} />}
      {!confirmationId && <Registration setId={handleIdChange} />}
    </div>
  );
}

export default App;
