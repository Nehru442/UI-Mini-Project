import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import type { VideoContract } from "../contracts/VideoContract";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToSaveList } from "../slicer/video-slicer";

export function UserDashBoard(){

    const [cookies,setCookie,removeCookie]=useCookies(['userid']);
    const [videos,setVideos] = useState<VideoContract[]>();

    let navigate = useNavigate();

    let dispatch = useDispatch();

    function LoadVideos(){
        axios.get(`http://127.0.0.1:5070/get-videos`)
        .then(response=>{
            setVideos(response.data)
        })
    }

       useEffect(() =>{
         if(cookies['userid']===undefined){
            navigate('/user-login');
         } else{
            LoadVideos();
         }
       },[])

    function handleSignout(){
        removeCookie('userid')
        navigate('/')
    }
     
    function handleSaveClick(video : VideoContract){
           dispatch(addToSaveList(video));
    }

    function handleLikeClick(video: VideoContract) {
  axios.put(`http://127.0.0.1:5070/like-video/${video.video_id}`)
    .then(() => {
      // Update local state after success
      setVideos(prev =>
        prev?.map(v => v.video_id === video.video_id ? { ...v, likes: v.likes + 1 } : v)
      );
    });
}

function handleViewClick(video: VideoContract) {
  axios.put(`http://127.0.0.1:5070/view-video/${video.video_id}`)
    .then(() => {
      setVideos(prev =>
        prev?.map(v => v.video_id === video.video_id ? { ...v, views: v.views + 1 } : v)
      );
    });
}

  
    return(
        <div className="mt-4">
            <header className="d-flex justify-content-between">
                <h3>{cookies['userid']} - DashBoard</h3>
                <button onClick={handleSignout} className="btn btn-link btn-danger">Signout</button>
            </header>
            <section className="mt-3 d-flex flex-wrap">
               {
                videos?.map(video=>
                    <div key={video.video_id} className="card m-2 p-1" style={{width:"250px"}}>
                       <iframe
                        src={video.url}
                        width="100%"
                        height="150"
                        onClick={() => handleViewClick(video)} 
                        style={{ cursor: 'pointer' }}
                        >
                        </iframe>

                        <div className="card-header">
                             <h3>{video.title}</h3>
                        </div>
                        <div className="card-body">
                             <h3>{video.description}</h3>
                        </div>
                        <div className="card-footer d-flex justify-content-between align-items-center">
                            <div>
                                <button onClick={() => handleLikeClick(video)} className="btn btn-sm btn-outline-primary me-2">
                                <i className="bi bi-hand-thumbs-up-fill"></i> {video.likes}
                                </button>
                                <span className="bi bi-eye"> {video.views}</span>
                            </div>
                            <button onClick={() => handleSaveClick(video)} className="btn btn-sm btn-success bi bi-floppy"> </button>
                        </div>

                    </div>
                )
               }
            </section>
        </div>
    )
}