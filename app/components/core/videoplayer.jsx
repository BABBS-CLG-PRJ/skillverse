import React from 'react';

const VideoPlayer = () => {
    const videoUrl = '/api/streamvideo';

    return  (
        <video controls>   
            <source src={videoUrl} type="video/mp4" />
        </video>
    );
};

export default VideoPlayer;