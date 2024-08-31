/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import "../App.css"
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';



const Home = () => {

    const [images, setimages] = useState([])
    const [page, setpage] = useState(1)

    const GettrandingImages = async () => {
        try {
            const { data } = await axios.get(
                `https://api.unsplash.com/photos?client_id=e9sMlO7XjoKqTakhL6sb3eMPgI8BBcVMu6kRwQz0HD4&page=${page}&per_page=12`
            );

            setimages(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePageClick = (e) => {
        console.log(e);

        let selectedPage = e.selected + 1; // react-paginate page numbers start from 0
        setpage(selectedPage)

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
        GettrandingImages();
    }, [page]);



    return (
        <>
            <div className="p-6">
                <h1 className='text-3xl capitalize font-semibold'>All Images</h1>

                <div className="py-8 flex flex-wrap gap-5 items-center justify-around relative">
                    {images.length > 0 && images.map((elem, indx) => {
                        return (
                            <Link to={`/details/${elem.id}`}>
                    <div className="w-72 h-96 rounded-md overflow-hidden shrink-0 relative" id='image' key={indx}>
                        <div style={{ background: "#fcfcfc57" }} className='absolute  w-72 h-20  bottom-0 rounded-md items-center px-3 justify-between hidden' id='imagesdets'>
                            <div className='flex items-center gap-4 cursor-pointer'>
                                <div className='w-12 h-12 rounded-full bg-white overflow-hidden'>
                                    <img className='w-full h-full object-cover' src={elem.user.profile_image.medium} alt="" />
                                </div>
                                <Link href={elem.user.id}>
                                    <h1 className='font-medium'>{elem.user.username}</h1>
                                </Link>
                            </div>
                            <div className='cursor-pointer' onClick={() => handleDownload(elem.urls.full, `image_${elem.id}.jpg`)}>
                                <DownloadForOfflineIcon style={{ color: "white", fontSize: "5vh" }} titleAccess='Downlaod' />
                            </div>
                        </div>
                        <img className='w-full h-full object-cover' src={elem.urls.regular} alt="" />
                    </div>
                </Link>
                )
                    })}
            </div>

            <div className="pagination-container mt-6 flex justify-center">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount="10"
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    previousLinkClassName={"previous"}
                    nextLinkClassName={"next"}
                />
            </div>
            <div className='flex items-center justify-center mt-5'>
                <h1 style={{ color: "#007bff" }}>{page} </h1>
            </div>
        </div >
        </>
    )
}

export default Home