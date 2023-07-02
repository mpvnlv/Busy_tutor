import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { link } from "../../components/Calendar/Constants";
import backgroundImage from "../../assets/Background.png"
import { Error } from "../../components/Login/Error";
import { errorMessagesServer } from "../../components/Calendar/Constants";

 
export const Register = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur", shouldUnregister: true });
 
  const [error, setError] = useState("");

    const background = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
    };

  const [role, setRole] = useState("visitor")

  const onSubmit = (data) => {
    data.fullname = data.firstName + " " + data.lastName;
    delete data["firstName"];
    delete data["lastName"];
    data.role = role;
    data.type = "reg";
    console.log(JSON.stringify(data));
    axios
      .post(link, data)
      .then(
        (response) => (
          console.log(response.data),
          localStorage.setItem("mail", JSON.stringify(data.mail)),
          localStorage.setItem("password", JSON.stringify(data.password)),
          localStorage.setItem("role", JSON.stringify(role)),
          alert("Register succesfull "),
          navigate("/login")
        )
      )

      .catch((reason) => {
        if (reason.response) {
          if (reason.response.status === 405) {
            alert("This user is alredy exist. Please log in");
            setError(errorMessagesServer[reason.response.status]);
          }
          console.log(reason.response.status);
        } else if (reason.request) {
          setError(errorMessagesServer[reason.response.status]);
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
        <h1 className="mb-8 mx-20 text-booked_clicked text-2xl">
          CREATE NEW ACCOUNT
        </h1>
        <div className="flex flex-row items-center justify-between w-5/6 mb-2">
          <button
            type="button"
            onClick={() => setRole("owner")}
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
            onClick={() => setRole("visitor")}
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
          className="flex flex-col items-center justify-center mt-5 px-4 py-2 text-booked_clicked rounded border border-disabled_border placeholder-disabled_border w-5/6"
        />
        {errors?.firstName?.type === "required" && (
          <Error error={"This field is reqired"} />
        )}
        {errors?.firstName?.type === "maxLength" && (
          <Error error={"First name cannot exceed 20 characters"} />
        )}
        {errors?.firstName?.type === "pattern" && (
          <Error error={"Alphabetical characters only"} />
        )}
        <input
          type="text"
          {...register("lastName", {
            required: true,
            maxLength: 20,
            pattern: /^[A-Za-z]+$/i,
          })}
          placeholder="Surname"
          className="flex flex-col items-center justify-center mt-5 px-4 py-2 text-booked_clicked rounded border border-disabled_border placeholder-disabled_border w-5/6"
        ></input>
        {errors?.lastName?.type === "required" && (
          <Error error={"This field is reqired"} />
        )}
        {errors?.lastName?.type === "maxLength" && (
          <Error error={"Last name cannot exceed 20 characters"} />
        )}
        {errors?.lastName?.type === "pattern" && (
          <Error error={"Alphabetical characters only"} />
        )}
        <input
          {...register("mail", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
          type="email"
          placeholder="Email"
          className="flex flex-col items-center justify-center mt-5 px-4 py-2 text-booked_clicked rounded border border-disabled_border placeholder-disabled_border w-5/6"
        ></input>
        {errors?.Email?.type === "required" && (
          <Error error={"This field is reqired"} />
        )}
        {errors?.Email?.type === "pattern" && (
          <Error error={"Not a valid email"} />
        )}
        <input
          {...register("phone", {
            required: true,
            pattern: /^[0-9+]+$/,
          })}
          type="phone"
          placeholder="Phone"
          className="flex flex-col items-center justify-center mt-5 px-4 py-2 text-booked_clicked rounded border border-disabled_border placeholder-disabled_border w-5/6"
        ></input>
        {errors?.Phone?.type === "required" && (
          <Error error={"This field is reqired"} />
        )}
        {errors?.Phone?.type === "pattern" && (
          <Error error={"Not a valid phone number"} />
        )}

        <input
          {...register("password", {
            required: true,
            minLength: 8,
          })}
          type="password"
          placeholder="password"
          className="flex flex-col items-center justify-center mt-5 px-4 py-2 text-booked_clicked rounded border border-disabled_border placeholder-disabled_border w-5/6"
        ></input>
        {errors?.Email?.type === "required" && (
          <Error error={"This field is reqired"} />
        )}
        {errors?.Email?.type === "minLength" && (
          <Error error={"Password must be at least 8 characters"} />
        )}

        <button
          type="submit"
          className="flex flex-col items-center justify-center  text-booked_clicked rounded border border-disabled_border placeholder-disabled_border hover:bg-button_selected w-5/6 py-2 mt-8"
        >
          SIGN UP
        </button>
          {error ? <Error error={error} /> : <></>}
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
