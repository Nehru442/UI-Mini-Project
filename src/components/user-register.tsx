import axios from "axios";
import {useFormik} from "formik" 
import { useState } from "react";
import { useNavigate ,Link} from "react-router-dom"
import * as yup from "yup"

export function UserRegister(){
    
    const [userMsg,setUserMsg] = useState('');
    const [userColor,setUserColor] = useState('');
    
     let navigate =useNavigate();

     const validationSchema = yup.object({
        user_id:yup.string().required('User id Requires').min(6,'Id should be unique'),
        user_name:yup.string().required('Name is Required ').min(5,'username too short ') ,
        email:yup.string().email('Invalid email format').required('Email is required'),
        password : yup.string().required('Password should be required').min(6,'min 6 letters'),
        mobile : yup.string().matches(/^[6-9]\d{9}$/, "Enter valid 10 dg indian format number").required("Mobile number requried")
     })

    const  formik = useFormik({
        initialValues :{
        user_id :'',
        user_name : '',
        password :'',
        email:'',
        mobile:''
        },

      validationSchema,

        onSubmit:(users) =>{


            axios.post(`http://127.0.0.1:5070/register-user`,users)
            .then(()=>{
                console.log(`Registered`);
            })
            alert('Registered')
            navigate('/user-login')
        }
    })

    function VerifyUser(e:any){
       axios.get(`http://127.0.0.1:5070/get-users` )
       .then( response =>{
        for(var user of response.data){
            if(user.user_id === e.target.value){
                  setUserMsg('User_id Taken Try another')
                  break;
            }else{
                setUserMsg('User Available');
                setUserColor('text-success');
            }
        }
       })
    }

    function handleOnBlur(){
        setUserMsg('');
    }

    return(
        <div className="card  mt-2 p-4 " >
          <div className=" bg-dark  text-white text-center p-3">
            <h3>Register User</h3>
          </div>

          <div className="card-body" >    
                <form onSubmit={formik.handleSubmit}>
                <dl>  
                    <dt className="bi bi-person-fill"> User Id</dt>
                    <dd><input type='text'  onBlur={handleOnBlur} onKeyUp={VerifyUser} onChange={formik.handleChange} name="user_id"/></dd>
                    <dd className={userColor}></dd>
                    <dd>{formik.errors.user_id}</dd>
                    <dt className="bi bi-person-circle"> User Name</dt>
                    <dd><input type='text' onBlur={handleOnBlur} onChange={formik.handleChange} name="user_name"/></dd>
                    <dd className="text-warning">{formik.errors.user_name}</dd>
                    <dt className="bi bi-envelope-fill"> Email</dt>
                    <dd><input type='email' onBlur={handleOnBlur} onChange={formik.handleChange} value={formik.values.email} name="email"/></dd>
                    <dd>{formik.errors.email}</dd>
                    <dt className="bi bi-lock-fill"> Password</dt>
                    <dd><input type='password' onBlur={handleOnBlur} onChange={formik.handleChange} name="password"/></dd>
                    <dd>{formik.errors.password}</dd>
                    <dt className="bi bi-phone"> Mobile</dt>
                    <dd><input type='text' onBlur={handleOnBlur} onChange={formik.handleChange} name="mobile"/></dd>
                    <dd>{formik.errors.mobile}</dd>
                </dl>
                <button type='submit' className="btn btn-outline-warning">Register</button>
                <div className='mt-3'>
                    <Link to='/user-login' className="btn btn-danger">Exist User?</Link>
                </div>   
                
                </form>
          </div>
        </div>
    
    )
}