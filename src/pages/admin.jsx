import { Paper } from "@mui/material";
import { useState, useEffect } from "react";

const AdminPage = () => {
  const [apiData1, setApiData1] = useState(null);
  const [apiData2, setApiData2] = useState(null);

  // Fetch the list of files in a specific folder
  const getFilesInFolder = async () => {
    const url2 =
      "https://5as4ejxxn4.execute-api.us-east-1.amazonaws.com/prod/listFileIdsInFolder";

    const response = await fetch(url2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folderId: "1O6SVu7YLs4C1uU2du6kw6RTNvjtVY7Ke", // Stringify the body
      }),
    });

    if (!response.ok) {
      console.error("Error fetching files in folder");
      return null;
    }

    const data = await response.json();
    console.log("Files in folder:", JSON.stringify(data, null, 2));
    return data;
  };

  // Fetch the list of folders in a parent folder
  const getFoldersInParent = async () => {
    const url1 =
      "https://uju8i8tktb.execute-api.us-east-1.amazonaws.com/prod/listFoldersInGoogleDrive";

    const response = await fetch(url1, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Error fetching folders in parent folder");
      return null;
    }

    const data = await response.json();
    console.log("Folders in parent:", JSON.stringify(data, null, 2));
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fetch folders in parent folder
      const result = await getFoldersInParent();
      setApiData1(result);

      // Fetch files in a specific folder
      const result2 = await getFilesInFolder();
      setApiData2(result2);
    };

    fetchData();
  }, []); // Run once on component mount

  return (
    <div>
      <Paper style={{ height: "800px" }} />
      <h1>Administration Page</h1>
      <img
        src="https://saintmarychurch.s3.amazonaws.com/images/1UrixX0syObDAQiu3cYHS6S0opIVD9mqf"
        alt="Description of the image"
        height={500}
      />
      {/* Display Google Calendar */}
      <iframe
        src="https://calendar.google.com/calendar/embed?src=c2FpbnRtYXJ5YXVzdGludHhAZ21haWwuY29t"
        height={500}
        width={500}
      />

      {/* Display API data */}
      {apiData1 ? (
        <pre>{JSON.stringify(apiData1, null, 2)}</pre>
      ) : (
        <p>Loading getFoldersInParent...</p>
      )}
      {/* Display API2 data */}
      {apiData2 ? (
        <pre>{JSON.stringify(apiData2, null, 2)}</pre>
      ) : (
        <p>Loading getFilesInFolder...</p>
      )}
    </div>
  );
};

export default AdminPage;
