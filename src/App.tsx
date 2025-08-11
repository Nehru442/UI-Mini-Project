import { VideoLibraryHome } from './components/video-library-home'
import './App.css'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import { UserRegister } from './components/user-register'
import { UserLogin } from './components/user-login'
import { UserDashBoard } from './components/user-dashboard'
import { UserLoginError } from './components/user-login-error'
import { AdminLogin } from './components/admin-login'
import { AdminDashBoard} from './components/admin-dashboard'
import { AddVideo } from './components/add-video'
import { EditVideo } from './components/edit-video'
import { DeleteVideo } from './components/delete-video'

function App() {
  
  return (
   <div >
     <BrowserRouter>
       <header className="bg-transparent text-white py-4 shadow-sm">
          <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <i className="bi bi-film fs-1 p-3 text-warning me-3"></i>
              <h1 className="m-0 fs-2">
                <Link to="/" className="text-white text-center text-decoration-none">
                  Video Library
                </Link>
              </h1>
            </div>
            <div className="mt-3 mt-md-0">
              <Link to="/" className="btn btn-outline-warning me-2">
                <i className="bi bi-house-door-fill me-1"></i> Home
              </Link>
              <Link to="/user-login" className="btn btn-outline-warning me-2">
                <i className="bi bi-box-arrow-in-right me-1"></i> Login
              </Link>
              <Link to="/user-register" className="btn btn-outline-warning">
                <i className="bi bi-person-plus-fill me-1"></i> Register
              </Link>
            </div>
          </div>
        </header>

       <section>
          <Routes>
             <Route path='/' element={<VideoLibraryHome/>}/>
             <Route path='user-register' element={<UserRegister/>}/>
             <Route path='user-login' element={<UserLogin/>}/>
             <Route path='user-dashboard' element={<UserDashBoard/>}/>
             <Route path='user-login-error' element={<UserLoginError/>}/>
             <Route path='admin-login' element={<AdminLogin/>}/>
             <Route path='admin-dashboard' element={<AdminDashBoard />} />
             <Route path='add-video' element={< AddVideo/>}></Route>
             <Route path='edit-video/:id' element={<EditVideo/>}></Route>
             <Route path='delete-video/:id' element={<DeleteVideo/>}></Route>
          </Routes>
       </section>
     </BrowserRouter>
      
   </div>
  )
}

export default App
