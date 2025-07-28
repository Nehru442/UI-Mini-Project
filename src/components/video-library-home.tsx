import { Link } from "react-router-dom";
import '../../src/styles/video-library-home.css'
export function VideoLibraryHome(){
    return(
        <div style={{height:'200px'}} className=" card d-flex justify-content-center align-items-center bg-transparent mt-1">
          <div className=" bg-body-success">  
            <div>
                <Link to='/user-login' className="btn btn-primary"> User Login</Link>
                <Link to='/admin-login' className="btn btn-danger mx-2"> Admin Login</Link>
            </div>
            <div>
               <Link to='/user-register' className= " btn btn-warning mt-5">New User ?</Link>
            </div>
          </div>
        
        </div>
    )
}