import React, { useState, useEffect } from "react";

function AwsImage({ imageId }) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://i0o2fa8lx6.execute-api.us-east-1.amazonaws.com/prod/image/${imageId}`
        );
        const contentType = response.headers.get("Content-Type");
        const base64String = await response.text(); // Treat response as text since it's base64-encoded

        if (response.ok && base64String) {
          // Construct the data URL
          const dataUrl = `data:${contentType};base64,${base64String}`;
          setImageSrc(dataUrl);
        } else {
          console.error("Error fetching image:", base64String);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchImage();
  }, [imageId]);

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="Fetched from Google Drive" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AwsImage;
