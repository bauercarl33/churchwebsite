import React, { useState, useEffect } from "react";
import Gallery from "react-photo-gallery";
import AwsImage from "./AwsImage"; // Import the AwsImage component

const DriveFolderView = ({ folderId }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const apiKey = "AIzaSyBvRHQRNAiG-_orWVTyh54a-7IiI0lT8eo";

    const fetchImages = async () => {
      const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType,webViewLink,webContentLink)`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.files) {
          const images = data.files
            .filter((file) => file.mimeType.startsWith("image/"))
            .map((file) => ({
              id: file.id, // Store the ID for use with AwsImage
              width: 4, // Adjust width ratio as needed
              height: 3, // Adjust height ratio as needed
            }));
          console.log(images);
          setPhotos(images);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [folderId]);

  return (
    <div>
      <Gallery
        photos={photos.map((photo) => ({
          ...photo,
          // Use AwsImage component for src
          src: <AwsImage imageId={photo.id} />,
        }))}
        renderImage={(props) => (
          <div style={{ margin: "2px", display: "inline-block" }}>
            {props.photo.src} {/* Render the AwsImage component */}
          </div>
        )}
      />
    </div>
  );
};

export default DriveFolderView;
