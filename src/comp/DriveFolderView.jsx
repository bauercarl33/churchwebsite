import React, { useState, useEffect } from "react";
import Gallery from "react-photo-gallery";

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
              src: `https://drive.google.com/uc?export=view&id=${file.id}`,
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
      <Gallery photos={photos} />
    </div>
  );
};

export default DriveFolderView;
