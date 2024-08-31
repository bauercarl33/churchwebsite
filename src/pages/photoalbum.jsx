import React from "react";
import DriveFolderView from "../comp/DriveFolderView";

const PhotoAlbumPage = () => {
  const driveFolderId = "1mRp21c7EPJmNi4avUQJtQONxX_D2Iv0z"; // "ChurchWebsite"
  const apiKey = "AIzaSyBvRHQRNAiG-_orWVTyh54a-7IiI0lT8eo";
  return (
    <div>
      <DriveFolderView folderId={driveFolderId} />
    </div>
  );
};

export default PhotoAlbumPage;
