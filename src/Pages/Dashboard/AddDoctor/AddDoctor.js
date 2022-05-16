import React from 'react';
import { useForm } from 'react-hook-form';

const AddDoctor = () => {
    const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm();


    const onSubmit = async (data) => {

   
      console.log("date ",data);
    };


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
            <input
              type="text"
              placeholder="specialty"
              className="input input-bordered w-full max-w-xs"
              {...register("specialty", {
                required: {
                  value: true,
                  message: "Specialization is Required",
                },
                minLength: {
                  value: 6,
                  message: "Must be 6 Characters or longer",
                },
              })}
            />
            <label className="label">
              {errors.password?.type === "required" && (
                <span className="label-text-alt text-red-500">{errors.password.message}</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="label-text-alt text-red-500">{errors.password.message}</span>
              )}
            </label>
          </div>

          <input className="btn w-full max-w-xs text-white" type="submit" value="Sign Up" />
        </form>
      </div>
    );
};

export default AddDoctor;