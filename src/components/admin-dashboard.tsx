import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import {Link, useNavigate } from "react-router-dom"
import type { VideoContract } from "../contracts/VideoContract";
import axios from "axios";

export function AdminDashBoard(){

     const [cookies,setCookie,removeCookie]=useCookies(['admin_id']);
    const [videos,setVideos] = useState<VideoContract[]>();

    let navigate = useNavigate();

    function LoadVideos(){
        axios.get(`http://127.0.0.1:5070/get-videos`)
        .then(response=>{
            setVideos(response.data)
        })
    }

       useEffect(() =>{
         LoadVideos()
       },[])

    function handleSignout(){
        removeCookie('admin_id')
        navigate('/')
    }


    return(
        <div>
            <div className="mt-3">          
                <header className="d-flex justify-content-between"> 
                    <h3>Admin DashBoard  <button className="btn btn-link " onClick={handleSignout}><i className="bi bi-arrow "> </i> Signout</button></h3>
                </header>
            </div>
           <section>
            <div className="d-flex justify-content-end mb-3 mt-2">
            <Link to='/add-video' className="btn btn-primary bi bi-camera-video"  > Add New Video</Link>
            </div >   
               <table className="table table-striped table-bordered align-middle text-center shadow-sm">
                    <thead className="table-dark text-danger">
                        <tr>
                            <th style={{width:"25%"}}>Title</th>
                            <th style={{width: "50%"}}>Preview</th>
                            <th style={{width : "25%"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          videos?.map(video => <tr key={video.video_id}>
                            <td>{video.title}</td>
                            <td>
                                <iframe src={video.url} width={200} height={100}></iframe>
                            </td>
                            <td>
                                <Link to={`/edit-video/${video.video_id}`} className="btn btn-warning"> <span className="bi bi-pen-fill"></span> </Link>
                                <Link to={`/delete-video/${video.video_id}`} className="btn btn-danger mx-2"> <span className="bi bi-trash-fill"></span> </Link>
                            </td>
                          </tr>)
                        }
                    </tbody>
                </table>
           </section>
        </div>
    )
}