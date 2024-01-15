"use client";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function profile() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const image = data.profile[0];
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);
        formData.append("authtoken", localStorage.getItem("authtoken"));
        const uploadData = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, formData);
        const authdata = await axios.post('api/verifytoken', { token: localStorage.getItem("authtoken") });
        await axios.post('/api/uploadimage', { uid: authdata.data.decodedToken.userId, url: uploadData.data.secure_url });
    };

    return ( 
        <form className="mt-60 mx-16" onSubmit={handleSubmit(onSubmit)}>
            <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
            >
                Upload file
            </label>
            <input
                {...register("profile")}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
            />
            <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
            >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
            </p>

            <button
                type="submit"
                className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-4"
            >
                Upload to Cloud
            </button>
        </form>
    );
}