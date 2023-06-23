import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur", shouldUnregister: true });

  const onSubmit = (data) => {
    data.role = role;
    console.log(JSON.stringify(data));
    navigate("/calendar");
  };

  const [role, setRole] = useState("Student");
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
            onClick={() => setRole("Tutor")}
            className={`flex flex-col justify-center items-center rounded  border  w-1/2 py-2 mr-4
            ${
              role === "Tutor"
                ? "border-disabled_border text-disabled_border cursor-default"
                : "border-booked_clicked text-booked_clicked hover:bg-button_selected"
            }`}
          >
            AS TUTOR
          </button>
          <button
            type="button"
            onClick={() => setRole("Student")}
            className={`flex flex-col justify-center items-center rounded  border  w-1/2 py-2
            ${
              role === "Student"
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
          {...register("Email", {
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
          {...register("Phone", {
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
          {...register("Password", {
            required: true,
            minLength: 8,
          })}
          type="password"
          placeholder="Password"
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
        <div className="flex flex-row items-center justify-between mt-5">
          <p>Already have an account?</p>
          <p className="text-booked_clicked ml-4">Log in</p>
        </div>
      </form>
    </div>
  );
};
