import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import * as yup from "yup";

export function AdminLogin(){

    let navigate = useNavigate();

    const validationSchema = yup.object({
    admin_id: yup
      .string()
      .min(5, "Admin ID must be at least 5 characters")
      .required("Admin ID is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

    const formik = useFormik({
        initialValues: {
            admin_id : '',
            password: ''
        },
        validationSchema,
        
        onSubmit : (admin:any)=>{
             axios.get(`http://127.0.0.1:5070/get-admin`)
             .then(response=> {
                 let result = response.data.find((item:any)=> item.admin_id===admin.admin_id);
                 if(result){
                     if(result.password===admin.password) {
                         navigate('/admin-dashboard');
                     } else {
                        alert('Invalid Password');
                     }
                 } else {
                    alert(`Admin Doesn't Exist`);
                 }
             })
        }
    })

    return(
        <div className="container mt-3 " style={{maxWidth:"400px"}} >
                <div className="card shadow-lg">
                    <div className="card-header bg-dark text-white text-center p-2  ">
                    <h2>Admin Login</h2>
                    </div> 
                    <div className=" card-body">        
                        <form onSubmit={formik.handleSubmit}>
                            <dl>
                                <dt>Admin Id</dt>
                                <dd><input type="text" name="admin_id" onChange={formik.handleChange} onBlur={formik.handleBlur}/></dd>
                                <dd >{formik.touched.admin_id && formik.errors.admin_id ? "Admin ID Required" : "" }  </dd>
                                <dt>Password</dt>
                                <dd><input type="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} /></dd>
                                <dd>{formik.touched.password && formik.errors.password ? "Password is- required" : ""}</dd>
                            </dl>
                            <button type="submit" className="btn btn-warning"> 
                            <i className="bi bi-box-arrow-right me-2">  </i>Login
                            </button>
                        </form>
                   </div>
            </div>
        </div>
    )
}