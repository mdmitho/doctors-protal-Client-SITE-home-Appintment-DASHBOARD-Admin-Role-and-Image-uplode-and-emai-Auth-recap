import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading'

const AddDoctor = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data: services, isLoading } = useQuery("services", () =>
    fetch("http://localhost:5000/service").then((res) => res.json())
  );

  const imageStorageKey = " 183693e428597732a7f877fdec0e8a05";

  if (isLoading) {
    return <Loading></Loading>;
  }

  const onSubmit = async (data) => {
   
    const image = data.image[0]
    const formData = new FormData();
    formData.append("image",image);
const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
fetch(url, {
  method: "POST",
  body: formData,
})
  .then((response) => response.json())
  .then((result) => {
    if(result.success){
      const img = result.data.url
      const doctor ={
        name : data.name,
        email : data.email,
        specialty:data.specialty,
        img:img
      }
// send to your database
fetch("http://localhost:5000/doctor",{
  method:'POST',
  headers:{
    'content-type':'application/json',
    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
  body:JSON.stringify(doctor)
})
.then(res => res.json())
.then(inserted => {

if (inserted.insertedId){
  toast.success('Doctor added successfully')
  reset()
}
else{
  toast.error('Failed to add the doctor')
}





// console.log("doctor inserted", inserted);
})

    }
    // console.log("imgbb:", result);
  });

  };

  /**
   * 
   * img rakhar oawy
   * 3 ways to store images
   * 1. Third party storage //Free open public storage is ok for Practice project
   * 2. Your own storage in your own server (file system)
   * 3. Database: Mongodb
   *
   * YUP: to validate file: Search: Yup file validation for react hook form
   */

  return (
    <div>
      <h2 className="text-3xl">Add a new Doctor</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full max-w-xs"
            {...register("name", {
              required: {
                value: true,
                message: "Name is Required",
              },
            })}
          />
          <label className="label">
            {errors.name?.type === "required" && (
              <span className="label-text-alt text-red-500">{errors.name.message}</span>
            )}
          </label>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered w-full max-w-xs"
            {...register("email", {
              required: {
                value: true,
                message: "Email is Required",
              },
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: "Provide a valid Email",
              },
            })}
          />
          <label className="label">
            {errors.email?.type === "required" && (
              <span className="label-text-alt text-red-500">{errors.email.message}</span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="label-text-alt text-red-500">{errors.email.message}</span>
            )}
          </label>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Specialization</span>
          </label>

          <select {...register("specialty")} class="select input-bordered w-full max-w-xs">
            {services.map((service) => (
              <option key={service._id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            className="input input-bordered w-full max-w-xs"
            {...register("image", {
              required: {
                value: true,
                message: "Image is Required",
              },
            })}
          />
          <label className="label">
            {errors.name?.type === "required" && (
              <span className="label-text-alt text-red-500">{errors.name.message}</span>
            )}
          </label>
        </div>

        <input className="btn w-full max-w-xs text-white" type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default AddDoctor;