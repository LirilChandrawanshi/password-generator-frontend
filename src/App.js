
import React, { useState } from "react";
import "./App.css"; // Import the CSS file for styling

// Password Generator Component
const App = () => {
  // State to store the form inputs
  const [length, setLength] = useState(10);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeDigits, setIncludeDigits] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);

  // State for the generated password
  const [password, setPassword] = useState("");

  // State for all stored passwords
  const [allPasswords, setAllPasswords] = useState([]);

  // Function to generate a password based on form inputs
  const generatePassword = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/password/generate?length=${length}&includeUpper=${includeUpper}&includeLower=${includeLower}&includeDigits=${includeDigits}&includeSpecial=${includeSpecial}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate password");
      }

      const data = await response.json();
      setPassword(data.password); // Update the password state with the generated password
    } catch (error) {
      console.error("Error generating password:", error);
    }
  };

  // Function to fetch all saved passwords
  const getAllPasswords = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/password/all");

      if (!response.ok) {
        throw new Error("Failed to fetch passwords");
      }

      const data = await response.json();
      setAllPasswords(data); // Update the state with all the passwords
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  return (
    <div className="App">
      {/* Updated Header */}
      <h1 className="header">Password Generator</h1>

      {/* Length Input */}
      <label>
        Length:
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </label>

      {/* Checkbox for Include Uppercase */}
      <label>
        Include Uppercase:
        <input
          type="checkbox"
          checked={includeUpper}
          onChange={(e) => setIncludeUpper(e.target.checked)}
        />
      </label>

      {/* Checkbox for Include Lowercase */}
      <label>
        Include Lowercase:
        <input
          type="checkbox"
          checked={includeLower}
          onChange={(e) => setIncludeLower(e.target.checked)}
        />
      </label>

      {/* Checkbox for Include Digits */}
      <label>
        Include Digits:
        <input
          type="checkbox"
          checked={includeDigits}
          onChange={(e) => setIncludeDigits(e.target.checked)}
        />
      </label>

      {/* Checkbox for Include Special Characters */}
      <label>
        Include Special Characters:
        <input
          type="checkbox"
          checked={includeSpecial}
          onChange={(e) => setIncludeSpecial(e.target.checked)}
        />
      </label>

      {/* Button to Generate Password */}
      <button onClick={generatePassword}>Generate Password</button>

      {/* Display the generated password */}
      <h2>Generated Password: {password}</h2>

      {/* Button to fetch all passwords */}
      <button onClick={getAllPasswords}>Get All Passwords</button>

      {/* Display all saved passwords */}
      <div>
        <h3>All Saved Passwords:</h3>
        <ul>
          {allPasswords.map((passwordItem, index) => (
            <li key={index}>{passwordItem.password}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
