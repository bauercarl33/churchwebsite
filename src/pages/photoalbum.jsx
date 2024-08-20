import React from "react";
import DriveFolderView from "../comp/DriveFolderView";

const PhotoAlbumPage = () => {
  const driveFolderId = "1O6SVu7YLs4C1uU2du6kw6RTNvjtVY7Ke";
  const apiKey = "AIzaSyBvRHQRNAiG-_orWVTyh54a-7IiI0lT8eo";
  return (
    <div>
      <h1>Mt. Athos 2024</h1>
      <DriveFolderView folderId={driveFolderId} />
    </div>
  );
};

export default PhotoAlbumPage;
