import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import AwsImage from "../components/AwsImage";

const FolderImages = () => {
  const { folderId } = useParams();
  const [images, setImages] = useState([]);
  const apiKey = "AIzaSyBvRHQRNAiG-_orWVTyh54a-7IiI0lT8eo";

  const fetchImages = async () => {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType)`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.files) {
        const imageFiles = data.files.filter((file) =>
          file.mimeType.startsWith("image/")
        );
        setImages(imageFiles);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [folderId]);

  return (
    <Box>
      {images.map((image) => (
        <Box key={image.id} mb={2}>
          <AwsImage
            imageId={image.id}
            style={{
              width: "100%", // Make the image fit the width of the screen
              height: "auto", // Maintain aspect ratio
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default FolderImages;
