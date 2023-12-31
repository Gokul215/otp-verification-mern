import React, { useState } from "react";
import avatar from "../assets/profile.png";
import {useFormik} from 'formik';
import toast,{Toaster} from 'react-hot-toast';
import {profileValidation} from "../helper/validate";
import { useRef } from "react";
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper'
import { useNavigate } from 'react-router-dom'
import {Vortex} from 'react-loader-spinner'

// import convert from "../helper/convert";

export default function Profile() {

  const [file,setfile]=useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()
  const image=useRef("");
  //console.log(apiData,"a")
 
  const formik = useFormik({
    initialValues : {
      firstName : apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address : apiData?.address || ''
    },
    enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      //console.log(values,"value")
      values = await Object.assign(values, { profile : file || apiData?.profile || ''})
     // let updatePromise = updateUser(values);
     console.log(values)

      toast.promise(updateUser(values), {
        loading: 'Updating...',
        success : <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });

    }
  })


  const  onUpload = async e =>{
    // const base64 = convert(e.target.files[0]);
    // setfile(base64);
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setfile(reader.result);
      };

     
    }

  }

  const uploadphoto =()=>{
    image.current.click();
  }

    // logout handler function
    function userLogout(){
      localStorage.removeItem('token');
      navigate('/')
    }
    if(isLoading) {
      return ( <div className="row justify-content-center">
      <Vortex
    visible={true}
    height="80"
    width="80"
    ariaLabel="vortex-loading"
    wrapperStyle={{}}
    wrapperClass="vortex-wrapper"
    colors={['red', 'green', 'blue', 'purple']}
  />
  </div>)}
     if(serverError) return <h1 className='row justify-content-center text-danger'>{serverError.message}</h1>

  return (
    <div>
     <Toaster position="top-center" reverseOrder={false}></Toaster>
     <div className="container-well 10 ">
      <div className="row justify-content-center  "> 
      
        <h3 className="col-1.5 mt-10">Profile</h3>
      </div>
      <div className="row justify-content-center">
        <p className="col-2.5">Explore more by connecting with us</p>
      </div>

     
      <form name="form" onSubmit={formik.handleSubmit}>

      <div className="row justify-content-center ">
      <div class="col-md-2-sm-1  px-0"  >

      <label htmlFor="proile">

      
        <img style={{height:200}}
          className="img-responive "
          src={apiData?.profile || file || avatar}
           onClick={uploadphoto}
          
          alt="proile"
        
        />
      
      </label>

        <input  values= {formik.values.profile} style={{display:"none"}} ref={image}  onChange={onUpload} type="file" id="profile" name="profile" />
        </div>
    
      </div>
      <div className="row justify-content-center " onSubmit={formik.handleSubmit}>
          <input className="text  " style={{marginTop:10}} type="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="email" ></input>
        
          
        </div>
        <div className="row justify-content-center " onSubmit={formik.handleSubmit}>
        
          <input className="text " style={{marginTop:10}} type="text" name="firstName" onChange={formik.handleChange} value={formik.values.firstName} placeholder="firstname" ></input>
         

        </div>
        <div className="row justify-content-center " onSubmit={formik.handleSubmit}>
        
        <input className="text " style={{marginTop:10}} type="text" name="lastName" onChange={formik.handleChange} value={formik.values.lastName} placeholder="Lastname" ></input>
       

      </div>
        <div className="row justify-content-center " onSubmit={formik.handleSubmit}>
          
          <input className="text  " style={{marginTop:10}} type="text" name="mobile" onChange={formik.handleChange} value={formik.values.mobile} placeholder="mobile" ></input>
         
        </div>
        <div className="row justify-content-center " onSubmit={formik.handleSubmit}>
        
        <input className="text " style={{marginTop:10}} type="text" name="address" onChange={formik.handleChange} value={formik.values.address} placeholder="Address" ></input>
       

      </div>
        <div  className="row justify-content-center  ">
          <button  type='submit' style={{marginTop:10}} onSubmit={formik.handleSubmit} className="btn btn-success">Update</button>
        </div>
        <div className="row justify-content-center  ">
          <p style={{marginTop:"10px"}}>Come back later? <button className="btn" onClick={userLogout} style={{color: "red"}}>Logout</button></p>
        </div>
      
        </form>
    </div>
    </div>
  );
}


