import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { link } from "../../components/Calendar/Constants";
import { Error } from "../../components/Login/Error";
import backgroundImage from "../../assets/Background.png";
export const Login = () => {

  const background = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur", shouldUnregister: true });

  const onSubmit = (data) => {
    data.type = "log";
    console.log(JSON.stringify(data));
    axios
      .post(link, data)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("mail", JSON.stringify(data.mail));
        localStorage.setItem("password", JSON.stringify(data.password));
        const role = response.data.role;
        localStorage.setItem("role", JSON.stringify(role))
        role === "owner" ? navigate("/calendar") : navigate("/token");
      })

      .catch((reason) => {
        if (reason.response) {
          if (reason.response.status === 406) {
            // alert("This user is alredy exist. Please log in")
          } else if (reason.response.status === 405) {
          }
          console.log(reason.response.status);
        } else if (reason.request) {
          console.log(reason.response.status);
        }
      });
  };

  const navigate = useNavigate();

  return (
    <div
      style={background}
      className="flex flex-col items-center justify-center h-screen"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center max-h-fit max-w-fit rounded-md border border-booked_clicked  px-42 py-8 bg-white"
      >
        <h1 className="mb-8 mx-40 text-booked_clicked text-2xl">LOG IN</h1>

        <input
          {...register("mail", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
          type="email"
          placeholder="Email"
          className="flex flex-col items-center justify-center my-3 px-4 py-2 text-booked_clicked rounded border border-disabled_border placeholder-disabled_border w-5/6"
        ></input>
        {errors?.Email?.type === "required" && <Error error={"This field is required"} />}
        {errors?.Email?.type === "pattern" && <Error error={"Not a valid mail"}/>}

        <input
          {...register("password", {
            required: true,
            minLength: 8,
          })}
          type="password"
          placeholder="Password"
          className="flex flex-col items-center justify-center my-3 px-4 py-2 text-booked_clicked rounded border border-disabled_border placeholder-disabled_border w-5/6"
        ></input>
        {errors?.Email?.type === "required" && <Error error={"This field is required"} />}
        <button
          type="submit"
          className="flex flex-col items-center justify-center  text-booked_clicked rounded border border-disabled_border placeholder-disabled_border hover:bg-button_selected w-5/6 py-2 mt-8"
        >
          SIGN UP
        </button>
        <div className="flex flex-row items-center justify-between mt-5">
          <p>Do not have an account?</p>
          <p onClick={() => navigate("/")} className="text-booked_clicked ml-4">
            Register
          </p>
        </div>
      </form>
    </div>
  );
};
