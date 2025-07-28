import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import '../styles/UserLogin.css';

export function UserLogin(){

    const [cookies, setCookie, removeCookie] = useCookies(['userid']);

    let navigate = useNavigate();

    const loginValidationSchema = yup.object({
        user_id : yup.string().required("user id required"),
        password : yup.string().min(6,"password must be least 6 characters").required("Password is required")
    })

    const formik = useFormik({
        initialValues: {
            user_id: '',
            password: '',
        },
       
        validationSchema: loginValidationSchema,

        onSubmit :(user)=>{
            axios.get(`http://127.0.0.1:5070/get-users`)
            .then(response => {
                 let result = response.data.find((item:any) => item.user_id===user.user_id);
                 console.log(result);
                 if(result){
                      if(result.password===user.password){
                          setCookie('userid', user.user_id);
                          navigate('/user-dashboard');
                      } else {
                          alert(`Invalid Password`);
                      }
                 } else {
                    navigate('/user-login-error');
                 }
            })
        }
    })

    return(
        <div className="card shadow-lg mt-2">
            <div className="card-header bg-dark text-white text-center" >
              <h2>
                <i className="bi bi-arrow-down-circle p-2 "> </i> User Login
              </h2>
            </div>
               <div className="card-body">
                    <form onSubmit={formik.handleSubmit}>
                        <dl>
                            <dt className="bi bi-person-circle"> User Id</dt>
                            <dd><input type="text" name="user_id" onChange={formik.handleChange} /></dd>
                            <dd className="text-danger">{formik.touched.user_id && formik.errors.user_id}</dd>
                        
                            <dt className="bi bi-lock-fill"> Password</dt>
                            <dd><input type="password" name="password" onChange={formik.handleChange} /></dd>
                            <dd className="text-danger">{formik.touched.password && formik.errors.password}</dd>
                        </dl>
                        <button type="submit" className="btn btn-warning"> <span className="bi bi-box-arrow-down-right mx-2"></span>Login</button>
                    </form>
                    <div className="mt-3">
                        <Link to="/user-register" className="btn btn-danger"> Create New Account </Link>
                    </div>
            </div>
        </div>
    )
}