import React, { useState, useCallback } from "react";
import "./App.css";
import Confirmation from "./Confirmation";
import Registration from "./Registration";

function App() {
  const [confirmationId, setConfirmationId] = useState<number | undefined>();

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
