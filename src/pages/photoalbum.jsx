import React from "react";
import DriveFolderView from "../components/DriveFolderView";

const PhotoAlbumPage = () => {
  const driveFolderId = "1mRp21c7EPJmNi4avUQJtQONxX_D2Iv0z"; // "ChurchWebsite"
  
  return (
    <div>
      <DriveFolderView folderId={driveFolderId} />
    </div>
  );
};

export default PhotoAlbumPage;

