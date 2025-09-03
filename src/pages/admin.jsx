import { Paper } from "@mui/material";
import { useState, useEffect } from "react";
import PutImageComponent from "./uploadcontent";
const AdminPage = () => {
  const [apiData1, setApiData1] = useState(null);
  const [apiData2, setApiData2] = useState(null);
  const [apiData3, setApiData3] = useState(null);
  // Fetch the list of files in a specific folder

  const getCalendarEvents = async () => {
    const url =
      "https://ritymdmzg4.execute-api.us-east-1.amazonaws.com/prod/getChurchCalendar";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: "2025-09-01",
        endDate: "2025-09-08",
      }),
    });
    if (!response.ok) {
      console.error("Error fetching calendar");
      return null;
    }

    const data = await response.json();
    console.log("Calendar events:", JSON.stringify(data, null, 2));
    return data;
  };
  const getFilesInFolder = async () => {
    const folderId = "1O6SVu7YLs4C1uU2du6kw6RTNvjtVY7Ke";
    var url2 =
      "https://5as4ejxxn4.execute-api.us-east-1.amazonaws.com/prod/listFileIdsInFolder/" +
      folderId;

    const response = await fetch(url2, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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

      const result3 = await getCalendarEvents();
      setApiData3(result3);
    };

    fetchData();
  }, []); // Run once on component mount
  const cashapp =
    "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1T8rzdYXFTvXYVT16NtwFxBLCbDGMjdE2";
  const venmo =
    "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1a15SPoeT62u9xoY6-D7xxqcxCkggTUow";
  const paypal =
    "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/16ayX3AeW9dFMMmopqE4SqNxraGqhi5Rh";
  const gofundme =
    "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1BgtiL3oU34seQLd8tFM_0rgBSQhheibE";
  const zelle =
    "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1r-0cm1EinX-sEZTS6bdk227yE_U1ucPQ";
  const tihely =
    "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1BkJiqWi-0Qf4fzECI23QfyJT2U3uIUGm";

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
      <img src={cashapp} alt="Description of the image" height={500} />{" "}
      <img src={venmo} alt="Description of the image" height={500} />{" "}
      <img src={paypal} alt="Description of the image" height={500} />{" "}
      <img src={gofundme} alt="Description of the image" height={500} />{" "}
      <img src={zelle} alt="Description of the image" height={500} />{" "}
      <img src={tihely} alt="Description of the image" height={500} />
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
      {apiData3 ? (
        <pre>{JSON.stringify(apiData3, null, 2)}</pre>
      ) : (
        <p>Loading calendar...</p>
      )}
      <PutImageComponent />
    </div>
  );
};

export default AdminPage;
