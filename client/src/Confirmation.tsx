import React, { useEffect, useState } from "react";

interface Props {
  id: number;
}

//form info type
interface FormInfo {
  id: number;
  firstName: String;
  lastName: String;
  email: String;
  phone: String;
}

function Confirmation({ id }: Props) {
  const [formInfo, setFormInfo] = useState<FormInfo | null | undefined>();
  const [loading, setLoading] = useState(false);

  //fetch our information on successful submission (after id is set)
  useEffect(() => {
    if (!!id) {
      //define our async function for calling API and retrieving info
      const getById = async (id: number) => {
        const res = await fetch(`/registration/${id}`);
        const data = await res.json();

        //processing data returned by dynamodb
        const dataInfo = {
          id: data.id.N,
          firstName: data.firstName.S,
          lastName: data.lastName.S,
          email: data.email.S,
          phone: data.phone.S,
        };
        setFormInfo(dataInfo);
      };
      setLoading(true);
      try {
        getById(id);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
  }, [id]);

  return (
    <div style={{ display: "block", textAlign: "center" }}>
      <h2>Form submitted successfully</h2>
      <h3 style={{ margin: "0", padding: "0" }}>Confirmation:</h3>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="regForm" style={{ textAlign: "start" }}>
          <p>First Name: {formInfo?.firstName}</p>
          <p>Last Name: {formInfo?.lastName}</p>
          <p>Email: {formInfo?.email}</p>
          <p>Phone Number: {formInfo?.phone}</p>
        </div>
      )}
    </div>
  );
}

export default Confirmation;
