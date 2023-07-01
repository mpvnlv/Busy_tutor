import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../store/slices/RoleSlice";

export const errorMessagesServer = {
  404: 'User not found!',
  403: 'Wrong credentials!',
  405: 'Email already in use!',
  500: 'Something went wrong. Try again later'
 }
export const Register = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur", shouldUnregister: true });
  var check = 0;

  const onSubmit = (data) => {
    data.fullname = data.firstName + " " + data.lastName;
    delete data["firstName"];
    delete data["lastName"];
    data.role = role;
    data.type = "reg";
    console.log(JSON.stringify(data));
    axios
      .post("https://egor28476.pythonanywhere.com/", data)
      .then(
        (response) => (
          console.log(response.data),
          localStorage.setItem("mail", JSON.stringify(data.mail)),
          localStorage.setItem("password", JSON.stringify(data.password)),
          alert("Register succesfull "),
          navigate("/login")
        )
      )

      .catch((reason) => {
        if (reason.response) {
          if (reason.response.status === 405) {
            alert("This user is alredy exist. Please log in");
          }
          console.log(reason.response.status);
        } else if (reason.request) {
          console.log(reason.response.status);
        }
      });
  };


  const dispatch = useDispatch();
   const role = useSelector((state) => state.roleReducer.role);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center max-h-fit max-w-fit rounded-md border border-booked_clicked  px-42 py-8"
      >
        <h1 className="mb-8 mx-20 text-booked_clicked text-2xl">
          CREATE NEW ACCOUNT
        </h1>
        <div className="flex flex-row items-center justify-between w-5/6 mb-2">
          <button
            type="button"
            onClick={() => dispatch(setRole("owner"))}
            className={`flex flex-col justify-center items-center rounded  border  w-1/2 py-2 mr-4
            ${
              role === "owner"
                ? "border-disabled_border text-disabled_border cursor-default"
                : "border-booked_clicked text-booked_clicked hover:bg-button_selected"
            }`}
          >
            AS TUTOR
          </button>
          <button
            type="button"
            onClick={() => dispatch(setRole("visitor"))}
            className={`flex flex-col justify-center items-center rounded  border  w-1/2 py-2
            ${
              role === "visitor"
                ? "border-disabled_border text-disabled_border cursor-default"
                : "border-booked_clicked text-booked_clicked hover:bg-button_selected"
            }`}
          >
            AS STUDENT
          </button>
        </div>
        <input
          {...register("firstName", {
            required: true,
            maxLength: 20,
            pattern: /^[A-Za-z]+$/i,
          })}
          type="text"
          placeholder="Name"
          className="flex flex-col items-center justify-center my-3 px-4 py-2 text-booked_clicked rounded border border-disabled_border placeholder-disabled_border w-5/6"
        />
        {errors?.firstName?.type === "required" && (
          <p>This field is required</p>
        )}
        {errors?.firstName?.type === "maxLength" && (
          <p>First name cannot exceed 20 characters</p>
        )}
        {errors?.firstName?.type === "pattern" && (
          <p>Alphabetical characters only</p>
        )}
        <input
          type="text"
          {...register("lastName", {
            required: true,
            maxLength: 20,
            pattern: /^[A-Za-z]+$/i,
          })}
          placeholder="Surname"
          className="flex flex-col items-center justify-center my-3 px-4 py-2 text-booked_clicked rounded border border-disabled_border placeholder-disabled_border w-5/6"
        ></input>
        {errors?.lastName?.type === "required" && <p>This field is required</p>}
        {errors?.lastName?.type === "maxLength" && (
          <p>First name cannot exceed 20 characters</p>
        )}
        {errors?.lastName?.type === "pattern" && (
          <p>Alphabetical characters only</p>
        )}
        <input
          {...register("mail", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
          type="email"
          placeholder="Email"
          className="flex flex-col items-center justify-center my-3 px-4 py-2 text-booked_clicked rounded border border-disabled_border placeholder-disabled_border w-5/6"
        ></input>
        {errors?.Email?.type === "required" && <p>This field is required</p>}
        {errors?.Email?.type === "pattern" && <p>Not a valid email</p>}
        <input
          {...register("phone", {
            required: true,
            pattern: /^[0-9+]+$/,
          })}
          type="phone"
          placeholder="Phone"
          className="flex flex-col items-center justify-center my-3 px-4 py-2 text-booked_clicked rounded border border-disabled_border placeholder-disabled_border w-5/6"
        ></input>
        {errors?.Phone?.type === "required" && <p>This field is required</p>}
        {errors?.Phone?.type === "pattern" && <p>Not a valid phone</p>}

        <input
          {...register("password", {
            required: true,
            minLength: 8,
          })}
          type="password"
          placeholder="password"
          className="flex flex-col items-center justify-center my-3 px-4 py-2 text-booked_clicked rounded border border-disabled_border placeholder-disabled_border w-5/6"
        ></input>
        {errors?.Email?.type === "required" && <p>This field is required</p>}
        {errors?.Email?.type === "minLength" && (
          <p>Password should be more than 7 symbols</p>
        )}

        <button
        
          type="submit"
          className="flex flex-col items-center justify-center  text-booked_clicked rounded border border-disabled_border placeholder-disabled_border hover:bg-button_selected w-5/6 py-2 mt-8"
        >
          SIGN UP
        </button>
        <div>{errorMessagesServer[check]}</div>
        <div className="flex flex-row items-center justify-between mt-5">
          <p>Already have an account?</p>
          <p
            onClick={() => navigate("/login")}
            className="text-booked_clicked ml-4"
          >
            Log in
          </p>
        </div>
      </form>
    </div>
  );
};
