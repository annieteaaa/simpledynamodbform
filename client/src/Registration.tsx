import React from "react";
import Form from "./Form";

interface Props {
  setId: Function;
}

function Registration({ setId }: Props) {
  return (
    <div className="register">
      <h1 style={{ textAlign: "center" }}>Registration</h1>
      <Form setId={setId} />
    </div>
  );
}

export default Registration;
