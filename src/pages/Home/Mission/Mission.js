import React from 'react'
import { useQuery } from "@tanstack/react-query";

import './mission.css'
import InfiniteSlider from './InfiniteSlider'


const Mission = () => {
    const folderId1 = "1yMb36XjQbYFwmtUB9vtCpjukzkRvgpto"
    const folderId2 = "1O6SVu7YLs4C1uU2du6kw6RTNvjtVY7Ke"
    
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
    
    const { data: top, isLoading: isLoadingTop } = useQuery({
        queryFn: () => getImages(folderId1),
        queryKey: ['top']
    });

    const { data: bottom, isLoading: isLoadingBottom } = useQuery({
        queryFn: () => getImages(folderId2),
        queryKey: ['bottom']
    });

    if (isLoadingTop || isLoadingBottom) {
        return (
            <div className='mission'>Loading...</div>
        )
    }

    const imageArr1 = top.body.files.slice(0, 8);
    const imageArr2 = bottom.body.files.slice(0, 8);

    return (
        <div className='mission'>
            <InfiniteSlider images={imageArr1} />
            <div className='statement'>
                <h5>
                    St. Mary Orthodox Church aims to provide a spiritual home for anyone who desires salvation through Christ.
                </h5>
            </div>
            <InfiniteSlider images={imageArr2} reverse={true} />
        </div>
    )
}

export default Mission