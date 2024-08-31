import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import AwsImage from "./AwsImage";

const DriveFolderView = ({ folderId }) => {
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState({});
  const [currentIndex, setCurrentIndex] = useState({});

  const apiKey = "AIzaSyBvRHQRNAiG-_orWVTyh54a-7IiI0lT8eo";

  const fetchImagesForFolder = async (folderId, folderName, limit = 0) => {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType,webViewLink,webContentLink)`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.files) {
        const imagesForFolder = data.files
          .filter((file) => file.mimeType.startsWith("image/"))
          .slice(0, limit > 0 ? limit : data.files.length);

        setImages((prevImages) => ({
          ...prevImages,
          [folderId]: imagesForFolder.map((file) => file.id),
        }));
        setCurrentIndex((prevIndex) => ({
          ...prevIndex,
          [folderId]: 0,
        }));
      }
    } catch (error) {
      console.error(`Error fetching images for folder ${folderName}:`, error);
    }
  };

  useEffect(() => {
    const fetchFolders = async () => {
      const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${apiKey}&fields=files(id,name)`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.files) {
          setFolders(data.files);
          data.files.forEach((folder) => {
            fetchImagesForFolder(folder.id, folder.name, 1);
          });
        }
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFolders();
  }, [folderId]);

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
      {folders.map((folder) => (
        <Box key={folder.id} width="150px" height="150px">
          <Typography variant="h6" align="center" gutterBottom noWrap>
            {folder.name}
          </Typography>
          <Box
            position="relative"
            width="150px"
            height="150px"
            bgcolor="grey.300"
            borderRadius="8px"
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {images[folder.id] && images[folder.id].length > 0 ? (
              <AwsImage
                imageId={images[folder.id][currentIndex[folder.id]]}
                style={{
                  width: "150px", // Final output width
                  height: "150px", // Final output height
                  maxWidth: "none", // Ensure no scaling issues
                  maxHeight: "none", // Ensure no scaling issues
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            ) : (
              <Box width="100%" height="100%" bgcolor="grey.500"></Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default DriveFolderView;
