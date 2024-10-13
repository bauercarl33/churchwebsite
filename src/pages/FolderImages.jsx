import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import AwsImage from "../components/AwsImage";

const FolderImages = () => {
  const { folderId } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = process.env.API_KEY; // Access the API key from the .env file (in the root dir of the project)

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
      setError("Failed to load images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [folderId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      {images.length > 0 ? (
        images.map((image) => (
          <Box key={image.id} mb={2}>
            <AwsImage
              imageId={image.id}
              style={{
                width: "100%", // This ensures the image fits the width of the screen
                height: "auto", // for the aspect ratio
              }}
            />
          </Box>
        ))
      ) : (
        <Typography>No images found in this folder.</Typography>
      )}
    </Box>
  );
};

export default FolderImages;
