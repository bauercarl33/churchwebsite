import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaTimes } from "react-icons/fa";
import { GoArrowLeft, GoShare } from "react-icons/go";

import ImageSlider from "./ImageSlider";
import "./media.css";
import { endpoints, fetchJson, s3Image } from "../../lib/api";

const HEADER_IMAGE =
  "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1CaD4tWqWQYvnOpsJLnXmyoEgjNa6NJhn";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 600px)").matches
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    const handleChange = () => setIsMobile(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  return isMobile;
};

// Lets a non-button element behave like a button for keyboard users.
const activateOnKey = (callback) => (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    callback();
  }
};

const FolderList = ({ folders }) => (
  <div className="media">
    <div className="header">
      <div className="overlay" />
      <img src={HEADER_IMAGE} alt="Church" />
      <h4>Media Gallery</h4>
    </div>
    <div className="folders">
      {Object.values(folders).map((folder) => (
        <Link to={`${folder.name}/${folder.id}`} key={folder.id} className="folder">
          <div className="image-wrapper">
            <div className="overlay" />
            <img src={s3Image(folder.firstImageInFolder)} alt={folder.name} loading="lazy" />
          </div>
          <h6>{folder.name}</h6>
        </Link>
      ))}
    </div>
  </div>
);

const Album = ({ name, files }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const isMobile = useIsMobile();

  const isModalOpen = selectedImageIndex !== null;
  const closeModal = () => setSelectedImageIndex(null);

  return (
    <div className="media">
      <div className="title">
        <h4>{name}</h4>
      </div>
      <div className="buttons">
        <Link to="/media" aria-label="Back to all albums">
          <GoArrowLeft size={24} className="icon" />
        </Link>
        <button type="button" aria-label="Share album">
          <GoShare size={24} className="icon" />
        </button>
      </div>
      <div className="images">
        {files.map((file, index) => (
          <div
            key={file.id}
            className="img-wrapper"
            role="button"
            tabIndex={0}
            aria-label={`Open ${file.name}`}
            onClick={() => setSelectedImageIndex(index)}
            onKeyDown={activateOnKey(() => setSelectedImageIndex(index))}
          >
            <img src={s3Image(file.id)} alt={file.name} loading="lazy" />
          </div>
        ))}
      </div>

      {isModalOpen && !isMobile && (
        <div className="media-modal" role="dialog" aria-modal="true" aria-label={name}>
          <button className="close-media-modal" onClick={closeModal} aria-label="Close">
            <FaTimes size={24} />
          </button>
          <ImageSlider images={files} index={selectedImageIndex} />
        </div>
      )}
    </div>
  );
};

const Media = () => {
  const { id, name } = useParams();

  const foldersQuery = useQuery({
    queryKey: ["mediaFolders"],
    queryFn: () => fetchJson(endpoints.mediaFolders),
  });

  const imagesQuery = useQuery({
    queryKey: ["mediaFolderFiles", id],
    queryFn: () => fetchJson(endpoints.mediaFolderFiles(id)),
    enabled: !!id,
  });

  if (!id) {
    if (foldersQuery.isLoading) return <div className="loading">Loading...</div>;
    if (foldersQuery.isError) {
      return <div className="loading">Sorry, the media gallery could not be loaded.</div>;
    }
    return <FolderList folders={foldersQuery.data.body.folders} />;
  }

  if (imagesQuery.isLoading) return <div className="loading">Loading...</div>;
  if (imagesQuery.isError) {
    return <div className="loading">Sorry, this album could not be loaded.</div>;
  }
  return <Album name={name} files={imagesQuery.data.body.files} />;
};

export default Media;
