import React, { useState } from "react";

const PutImageComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sessionKey, setSessionKey] = useState("");
  const [signInUnix, setSignInUnix] = useState("");
  const [contentName, setContentName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  // Handle image file selection
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle content name input change
  const handleNameChange = (e) => {
    setContentName(e.target.value);
  };

  // Handle username and password change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Function to handle the sign-in process
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://9fw88x693i.execute-api.us-east-1.amazonaws.com/Prod/churchSignIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const data = await response.json();
      console.log("Response: " + JSON.stringify(response));
      console.log("data: " + JSON.stringify(data));
      if (data.statusCode == 200) {
        const body = JSON.parse(data.body);
        setSessionKey(body.session_key);
        setSignInUnix(body.created_time_unix);
        setResponseMessage("Sign-in successful!");
      } else {
        setResponseMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setResponseMessage("Error: Failed to sign in.");
    }
  };

  // Function to handle the image upload submission
  const handleImageUpload = async (e) => {
    e.preventDefault();

    if (!contentName || !imageFile || !sessionKey) {
      setResponseMessage("Please provide all fields, including session key.");
      return;
    }

    // Convert the image to base64
    const toBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]); // Extract base64 string only
        reader.onerror = (error) => reject(error);
      });
    };

    const base64Image = await toBase64(imageFile);

    // Prepare the request payload
    const requestBody = {
      content_name: contentName,
      img: base64Image,
      session_key: sessionKey,
    };

    // Make the API call to the provided endpoint
    try {
      const response = await fetch(
        "https://3q76vhbkfl.execute-api.us-east-1.amazonaws.com/Prod/putImage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResponseMessage("Image uploaded successfully!");
      } else {
        setResponseMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setResponseMessage("Error: Failed to upload image.");
    }
  };

  return (
    <div>
      <h3>Sign In</h3>
      <form onSubmit={handleSignIn}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>

      {sessionKey && (
        <>
          <h3>Upload Image</h3>
          <form onSubmit={handleImageUpload}>
            <div>
              <label>Content Name:</label>
              <input
                type="text"
                value={contentName}
                onChange={handleNameChange}
                required
              />
            </div>
            <div>
              <label>Choose Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>
            <div>
              <button type="submit">Upload Image</button>
            </div>
          </form>
        </>
      )}

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default PutImageComponent;
