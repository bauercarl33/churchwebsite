import React, { useState, useEffect } from "react";

const AwsImage = ({ imageId, style }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://i0o2fa8lx6.execute-api.us-east-1.amazonaws.com/prod/image/${imageId}`
        );
        const contentType = response.headers.get("Content-Type");
        const base64String = await response.text();

        if (response.ok && base64String) {
          const dataUrl = `data:${contentType};base64,${base64String}`;
          setImageSrc(dataUrl);
        } else {
          console.error("Error fetching image:", base64String);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [imageId]);

  return (
    <div>
      <img src={imageSrc} alt="Drive Image" style={{ ...style }} />
    </div>
  );
};

export default AwsImage;
