import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import './media.css'


const Media = () => {
    const { id } = useParams()

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
        return (
            <div className='loading'>Loading...</div>
        )
    }

    if (!id) {
        return (
            <div className='media'>
                <div className='folders'>
                    {Object.entries(folders.body.folders).map((item) => {
                        return (
                            <Link to={item[1].id} key={item[1].name} className='folder'>
                                <h5>{item[1].name}</h5>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }

    if (isLoadingImages) {
        return (
            <div className='loading'>Loading...</div>
        )
    }

    return (
        <div className='media'>
            <div className='images'>
                {Object.entries(images.body.files).map((item) => {
                    let alt = null
                    return (
                        Object.entries(item[1]).map((image) => {
                            if (image[0] === 'name') {
                                alt = image[1]
                            }
                            if (image[0] === 'id') {
                                let url = "https://saintmarychurch.s3.amazonaws.com/images/" + image[1]
                                return (
                                    <img key={image[1]} src={url} alt={alt} />
                                )
                            }
                        })
                    ) 
                })}
            </div>
        </div>
    )
}

export default Media
