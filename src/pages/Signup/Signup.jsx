import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ user, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfirmation, setPasswordconfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("works");

    const request = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        passwordconfirmation,
      }),
    });

    const data = await request.json();

    if (request.ok) {
      setUser(data);
      navigate("/books");
    } else {
      request.json().then((err) => console.log(err));
    }
  };

  // function handlesubmit(e){
  // e.preventDefault();
  // setErrors([])

  // fetch("/signup", {
  //     method: "POST",
  //     headers: {
  //         "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //         firstname,
  //         lastname,
  //         password,
  //         password_confirmation: passwordconfirmation,
  //         bio,

  // })
  // }).then((r) => {
  //     if(r.ok){
  //         r.json().then((user) => setUser(user ))
  //     } else {
  //         r.json().then((err) => setErrors(err.errors))
  //     }
  //     navigate('/')
  // })

  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-[100%] mt-4">
      <div className="hidden sm:block">
        <img
          className="w-full h-full object-cover"
          src="https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
        />
      </div>

      <div className="bg-white-800 flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8">
          <h2 className="text-4xl light:text-white font-bold text-center">
            SIGN UP
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <input
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <input
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              value={passwordconfirmation}
              onChange={(e) => setPasswordconfirmation(e.target.value)}
              placeholder="Confirm your Password"
              autoComplete="off"
            />
          </div>
          <button
            onClick={(e) => handlesubmit(e)}
            style={{ backgroundColor: "#d946ef" }}
            className="w-full my-5 py-2 bg-purple-500 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/40 text-white font-semibold rounded-lg"
            type="submit"
          >
            SIGN UP
          </button>
          <p className="text-gray-400">
            Having an existing account? <Link to="/login">Login Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
