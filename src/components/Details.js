/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { saveAs } from 'file-saver';

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const Details = () => {

    const { id } = useParams()
    const [image, setimage] = useState()

    const imge = async () => {
        const { data } = await axios.get(`https://api.unsplash.com/photos/${id}?client_id=e9sMlO7XjoKqTakhL6sb3eMPgI8BBcVMu6kRwQz0HD4`)
        setimage(data)
        console.log(data);

    }

    const handleDownload = async (url, filename) => {
        try {
            // Fetch the image data
            const response = await axios.get(url, {
                responseType: 'blob' // Ensure we get a blob (binary) response
            });

            // Use FileSaver.js to save the image
            saveAs(response.data, filename);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    useEffect(() => {
        imge();
    }, [id]);



    return (
        <>

            {image && (
                <div className="flex justify-center  bg-gray-50 pt-8">
                    <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
                        {/* High-quality image */}
                        <div className="relative">

                            <img style={{ height: "54.1vh" }} src={image.urls.full} alt={image.alt_description || 'Photo'}
                                className="w-full object-cover"
                            />

                        </div>

                        {/* Photo Details */}
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img
                                        src={image.user.profile_image.large}
                                        alt="User name"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="ml-4 flex items-center justify-between w-full">
                                    <div>
                                        <h3 className="text-lg font-medium">{image.user.first_name}</h3>
                                        <p className="text-sm text-gray-600">{image.user.instagram_username}</p>
                                    </div>
                                    <div className='cursor-pointer' onClick={() => handleDownload(image.urls.full, `image_${image.id}.jpg`)} >
                                        <DownloadForOfflineIcon style={{ fontSize: "5vh" }} titleAccess='Download' />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div >
            )}
        </>
    );
}

export default Details