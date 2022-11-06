import React, { useState } from "react";

interface Props {
  setId: Function;
}

function Form({ setId }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [invalid, showInvalid] = useState(false);

  const validateEmail = (email: string) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePhone = (phone: string) => {
    return phone.match(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
    );
  };

  const submitForm = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !validateEmail(email) ||
      !validatePhone(phone)
    ) {
      showInvalid(true);
      return;
    }
    showInvalid(false);
    try {
      let formInfo = {
        id: 1,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formInfo),
      };
      const res = await fetch("/register", requestOptions);
      const data = await res.json();
      setId(data.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form style={{ display: "inline-block" }}>
        <table>
          <tbody>
            <tr>
              <td style={{ textAlign: "left" }}>
                <label>First Name: </label>
              </td>
              <td>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>
                <label>Last Name: </label>
              </td>
              <td>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>
                <label>Email: </label>
              </td>
              <td>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>
                <label>Phone Number: </label>
              </td>
              <td>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ height: "30px", textAlign: "center" }}>
          {invalid && (
            <p
              style={{
                textAlign: "center",
                fontSize: "14px",
                margin: "0",
                paddingTop: "2px",
              }}
            >
              Please enter a valid input
            </p>
          )}
        </div>
        <button
          onClick={(e) => submitForm(e)}
          className="submitButton"
          style={{ maxWidth: "70px", padding: "10px" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
