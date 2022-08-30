import axios from "axios";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import Swal from "sweetalert2";

class Login extends React.Component {
  state = { email: "", password: "", redirectURL: "" };

  componentDidMount() {
    const user = reactLocalStorage.get("user");
    if (user) {
      this.setState({ redirectURL: "/" });
    }
  }

  onChangeHandle = (e) => {
    if (e.target.id == "email") {
      this.setState({ email: e.target.value });
    } else if (e.target.id == "password") {
      this.setState({ password: e.target.value });
    }
  };

  validation = (e) => {
    let email = this.state.email.trim();
    let password = this.state.password.trim();

    {
      email == ""
        ? document.getElementById("email").classNameList.add("border-red-600")
        : document.getElementById("email").classNameList.remove("border-red-600");
    }

    {
      password == ""
        ? document.getElementById("password").classNameList.add("border-red-600")
        : document
            .getElementById("password")
            .classNameList.remove("border-red-600");
    }

    axios
      .post("http://localhost:5050/login", { email, password })
      .then((resp) => {
        // console.log(resp.data.user.name);
        let token = resp.data.token;
        let id = resp.data.user.id;
        let first_name = resp.data.user.first_name
        let last_name = resp.data.user.last_name
        // console.log(resp.data.data.id);
        if (resp.data.status == "error") {
          Swal.fire({
            title: "Error!",
            text: resp.data.message,
            icon: "error",
          });
        } else if (resp.data.status == "success") {
          reactLocalStorage.setObject("user", {
            token: token,
            id:id,
            first_name: first_name,
            last_name: last_name
          });

          Swal.fire({
            title: "Login Successfully...",
            icon: "success",
          }).then(() => {
            this.setState({ redirectURL: "/" });
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        Swal.fire({
          title: "Error!",
          text: "Server error...",
          icon: "error",
        });
      });
  };

  render() {
    return (
      <div className="flex place-content-center h-screen items-center bg-slate-100">
        {!this.state.redirectURL ? (
          ""
        ) : (
          <Navigate to={this.state.redirectURL} />
        )}
        <form className=" bg-gray-100 shadow-md rounded lg:w-1/3 w-full  px-10 py-20 pb-10 mb-4 border-2 ">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="Email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              onChange={this.onChangeHandle}
            ></input>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={this.onChangeHandle}
            ></input>
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={this.validation}
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <Link
            to="/signup"
            className="inline-block align-baseline font-bold text-blue-500 hover:text-blue-800 mt-5 text-lg"
          >
            Create acaunt?
          </Link>
        </form>
      </div>
    );
  }
}

export { Login };
