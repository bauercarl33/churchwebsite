import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaTimes } from "react-icons/fa";

import ImageSlider from "./ImageSlider";
import "./media.css";

import { GoArrowLeft, GoShare } from "react-icons/go";

const Media = () => {
  const { id, name } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const getImageFolders = async (query = "") => {
    const url =
      "https://uju8i8tktb.execute-api.us-east-1.amazonaws.com/prod/listFoldersInGoogleDrive";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    return json;
  };

  const getImages = async (id) => {
    let url = `https://5as4ejxxn4.execute-api.us-east-1.amazonaws.com/prod/listFileIdsInFolder/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    return json;
  };

  const { data: folders, isLoading: isLoadingFolders } = useQuery({
    queryFn: () => getImageFolders(),
    queryKey: ["folders"],
  });

  const { data: images, isLoading: isLoadingImages } = useQuery({
    queryFn: () => getImages(id),
    queryKey: [`${id}`],
    enabled: !!id,
  });

  if (isLoadingFolders) {
    return <div className="loading">Loading...</div>;
  }

  if (!id) {
    return (
      <div className="media">
        <div className="header">
          <div className="overlay" />
          <img
            src={`${process.env.PUBLIC_URL}https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1CaD4tWqWQYvnOpsJLnXmyoEgjNa6NJhn`}
            alt="Church"
          />
          <h4>Media Gallery</h4>
        </div>
        <div className="folders">
          {Object.entries(folders.body.folders).map((item) => {
            let url =
              "https://saintmarychurch.s3.amazonaws.com/images/" +
              item[1].firstImageInFolder;
            let alt = item[1].name;

            return (
              <Link
                to={`${item[1].name}/${item[1].id}`}
                key={item[1].name}
                className="folder"
              >
                <div className="image-wrapper">
                  <div className="overlay" />
                  <img src={url} alt={alt} loading="lazy" />
                </div>
                <h6>{item[1].name}</h6>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  if (isLoadingImages) {
    return <div className="loading">Loading...</div>;
  }

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="media">
      <div className="title">
        <h4>{name}</h4>
      </div>
      <div className="buttons">
        <Link to="/media">
          <GoArrowLeft size={24} className="icon" />
        </Link>
        <button>
          <GoShare size={24} className="icon" />
        </button>
      </div>
      <div className="images">
        {Object.entries(images.body.files).map((item, index) => {
          let alt = null;
          let imgIdx = index;
          return Object.entries(item[1]).map((image) => {
            if (image[0] === "name") {
              alt = image[1];
            }
            if (image[0] === "id") {
              let url =
                "https://saintmarychurch.s3.amazonaws.com/images/" + image[1];
              return (
                <div
                  key={image[1]}
                  className="img-wrapper"
                  onClick={() => handleImageClick(imgIdx)}
                >
                  <img src={url} alt={alt} loading="lazy" />
                </div>
              );
            }
          });
        })}
      </div>

      {isModalOpen && !isMobile && (
        <div className="media-modal">
          <button className="close-media-modal" onClick={closeModal}>
            <FaTimes size={24} />
          </button>
          <ImageSlider images={images.body.files} index={selectedImageIndex} />
        </div>
      )}
    </div>
  );
};

export default Media;
