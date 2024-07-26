"use client"
import { useState, useRef } from 'react';

export default function Home() {
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
    };

    const captureImage = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImage(dataUrl.split(',')[1]); // Extract the base64 part
    };

    const sendImage = async () => {
        setIsLoading(true);
        setResponseMessage('');

        try {
            const response = await fetch('/api/compareface', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ webcamImage: image }),
            });

            const result = await response.json();
            console.log(result);
            setResponseMessage(result.message);
        } catch (error) {
            console.error('Error sending image:', error);
            setResponseMessage('Error sending image');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Capture and Send Face Image</h1>
            <video ref={videoRef} width="640" height="480" autoPlay></video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <button onClick={startCamera}>Start Camera</button>
            <button onClick={captureImage}>Capture Image</button>
            <button onClick={sendImage} disabled={!image || isLoading}>
                {isLoading ? 'Sending...' : 'Send Image'}
            </button>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
}
