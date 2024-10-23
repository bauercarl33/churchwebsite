import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './media.css';
import { FaChevronRight } from 'react-icons/fa';
import { FaChevronLeft, FaTimes } from 'react-icons/fa';

const Media = () => {
  const { id, name } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // Track the current image index for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const getImageFolders = async (query = "") => {
    const url = "https://uju8i8tktb.execute-api.us-east-1.amazonaws.com/prod/listFoldersInGoogleDrive";
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
    queryKey: ["folders"]
  });

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

  const { data: images, isLoading: isLoadingImages } = useQuery({
    queryFn: () => getImages(id),
    queryKey: [`${id}`],
    enabled: !!id
  });

  if (isLoadingFolders) {
    return <div className='loading'>Loading...</div>;
  }

  if (!id) {
    return (
      <div className='media'>
        <h4>Media</h4>
        <div className='folders'>
          {Object.entries(folders.body.folders).map((item) => {
            let url = "https://saintmarychurch.s3.amazonaws.com/images/" + item[1].firstImageInFolder;
            let alt = item[1].name;


            return (
              <Link to={`${item[1].name}/${item[1].id}`} key={item[1].name} className="folder">
                <div className='image-wrapper'>
                  <div className='overlay' />
                  <img src={url} alt={alt} loading='lazy' />
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
    return <div className='loading'>Loading...</div>;
  }

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const showNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.body.files.length - 1 ? 0 : prevIndex + 1
    );
  };

  const showPrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.body.files.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className='media'>
      <h4>{name}</h4>
      <div className='images'>
        {Object.entries(images.body.files).map((item, index) => {
          let alt = null;
          let imgIdx = index;
          return (
            Object.entries(item[1]).map((image) => {
              if (image[0] === 'name') {
                alt = image[1];
              }
              if (image[0] === 'id') {
                let url = "https://saintmarychurch.s3.amazonaws.com/images/" + image[1];
                return (
                  <div key={image[1]} className='img-wrapper' onClick={() => handleImageClick(imgIdx)}>
                    <img src={url} alt={alt} loading='lazy' />
                  </div>
                );
              }
            })
          );
        })}
      </div>

      {isModalOpen && (
        <div className='media-modal'>
          <button className='close-media-modal' onClick={closeModal}><FaTimes size={24} /></button>
          <button className='cycle prev' onClick={showPrevImage}><FaChevronLeft  size={24}/></button>
          <img src={`https://saintmarychurch.s3.amazonaws.com/images/${images.body.files[selectedImageIndex].id}`} alt='' />
          <button className='cycle next' onClick={showNextImage}><FaChevronRight size={24} /></button>
        </div>
      )}
    </div>
  );
};

export default Media;
