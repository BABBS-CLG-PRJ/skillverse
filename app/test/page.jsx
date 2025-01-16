"use client"
import { useState, useRef } from 'react';
import { useCookies } from 'next-client-cookies';

export default function Home() {
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [action, setAction] = useState('add');

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const cookies = useCookies();
    const [uid, setUid] = useState('1')

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
            //having issue getting cookies
            const user = cookies.get('authtoken'); 
            // setUid(user.uid);
            setUid(1);

            const response = await fetch(`/api/facedata/${action}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ webcamImage: image, uid }),
            });

            const result = await response.json();
            console.log(result);
            setResponseMessage(result.message || `Similarity: ${result.similarityPercentage}%`);
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
            <div>
                <button onClick={startCamera}>Start Camera</button>
                <button onClick={captureImage}>Capture Image</button>
            </div>
            <div>
                <select onChange={(e) => setAction(e.target.value)} value={action}>
                    <option value="add">Add Face Data</option>
                    <option value="match">Match Face</option>
                    <option value="delete">Delete Face Data</option>
                </select>
                <button onClick={sendImage} disabled={!image || isLoading}>
                    {isLoading ? 'Processing...' : 'Send Image'}
                </button>
            </div>
            {responseMessage && <p>{responseMessage}</p>}
            <div>
                <h2>Debug Information</h2>
                <p>UID from cookie: {uid}</p>
            </div>
            
        </div>
    );
}
