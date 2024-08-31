/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "../App.css"
import { saveAs } from 'file-saver';
import ReactPaginate from 'react-paginate';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const Search = () => {

    const { query } = useParams();

    const [result, setresult] = useState([]);
    const [page, setPage] = useState(1)

    const GetQueryImageData = async () => {
        try {
            const { data } = await axios.get(`https://api.unsplash.com/search/photos?client_id=jk88sXh6iBjRr-gcQU4dqHbJRezFT6Rah6Ab80BY3c0&page=${page}&query=${query}&&per_page=12`)
            setresult(data.results);

        } catch (error) {
            console.log(error);
        }
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

    const handlePageClick = (e) => {
        console.log(e);

        let selectedPage = e.selected + 1; // react-paginate page numbers start from 0
        setPage(selectedPage)

    }

    useEffect(() => {
        GetQueryImageData()
    }, [page, query])

    return (
        <>
            <h1 className='p-4 capitalize'>Search Results For : {query}</h1>
            <div className="py-8 flex flex-wrap gap-5 items-center justify-around relative">
                {result.length > 0 && result.map((elem, indx) => {
                    return (
                        <div className="w-72 h-96 rounded-md overflow-hidden shrink-0 relative" id='image' key={indx}>
                            <div style={{ background: "#fcfcfc57" }} className='absolute  w-72 h-20  bottom-0 rounded-md items-center px-3 justify-between hidden' id='imagesdets'>
                                <div className='flex items-center gap-4 cursor-pointer'>
                                    <div className='w-12 h-12 rounded-full bg-white overflow-hidden'>
                                        <img className='w-full h-full object-cover' src={elem.user.profile_image.medium} alt="" />
                                    </div>
                                    <a href={elem.user.id}>
                                        <h1 className='font-medium'>{elem.user.username}</h1>
                                    </a>
                                </div>
                                <div className='cursor-pointer' onClick={() => handleDownload(elem.urls.full, `image_${elem.id}.jpg`)}>
                                    <DownloadForOfflineIcon style={{ color: "white", fontSize: "5vh" }} titleAccess='Downlaod' />
                                </div>
                            </div>
                            <img className='w-full h-full object-cover' src={elem.urls.regular} alt="" />
                        </div>
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

        </>
    )
}

export default Search