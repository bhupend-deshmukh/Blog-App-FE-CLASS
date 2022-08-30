import axios from "axios";
import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { reactLocalStorage } from "reactjs-localstorage";

export default class Signup extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    redirect: "",
  };

  componentDidMount() {
    const data = localStorage.getItem("user");
    if (data) {
      this.setState({ redirect: "/" });
    }
  }

  onChangeHandle = (e) => {
    if (e.target.id == "first_name") {
      this.setState({ first_name: e.target.value });
    } else if (e.target.id == "last_name") {
      this.setState({ last_name: e.target.value });
    } else if (e.target.id == "email") {
      this.setState({ email: e.target.value });
    } else if (e.target.id == "password") {
      this.setState({ password: e.target.value });
    }
  };

  valiDation = (e) => {
    let first_name = this.state.first_name.trim();
    let last_name = this.state.last_name.trim();
    let email = this.state.email.trim();
    let password = this.state.password.trim();
    let conform_pass = document.getElementById("conform-password").value;
    let match_pass = document.getElementById("match-pass");

    {
      first_name == ""
        ? document.getElementById("first_name").classNameList.add("border-red-600")
        : document
            .getElementById("first_name")
            .classNameList.remove("border-red-600");
    }

    {
      last_name == ""
        ? document.getElementById("last_name").classNameList.add("border-red-600")
        : document
            .getElementById("last_name")
            .classNameList.remove("border-red-600");
    }

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

    {
      conform_pass == ""
        ? document
            .getElementById("conform-password")
            .classNameList.add("border-red-600")
        : document
            .getElementById("conform-password")
            .classNameList.remove("border-red-600");
    }

    {
      conform_pass != password
        ? match_pass.classNameList.remove("hidden")
        : match_pass.classNameList.add("hidden");
    }

    if (
      first_name.length == 0 ||
      last_name.length == 0 ||
      email.length == 0 ||
      password.length == 0 ||
      conform_pass != password
    ) {
      return;
    }
    axios
      .post("http://localhost:5050/signup", { first_name,last_name, email, password })
      .then((resp) => {
        // console.log(resp);
        if (resp.data.status == "error") {
          Swal.fire({
            title: "Error!",
            text: resp.data.message,
            icon: "error",
          });
        } else if (resp.data.status == "success") {
          this.setState({ redirect: "/login" });

          Swal.fire({
            title: "Account Created!",
            text: "Go to login page.",
            icon: "success",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Server error...",
          icon: "error",
        });
      });
  };

  render() {
    return (
      <div className="flex place-content-center h-screen items-center bg-slate-900">
        {this.state.redirect ? <Navigate to={this.state.redirect} /> : ""} 
        <form className="w-full max-w-lg p-10 bg-slate-500">
          <div className="flex flex-wrap mb-6">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label
                className="text-lg block uppercase tracking-wide text-gray-900  font-bold mb-2"
                for="grid-first-name"
              >
                first_name
              </label>
              <input
                className="appearance-none block w-full text-lg bg-gray-200 text-gray-900 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="first_name"
                type="text"
                placeholder="first_name"
                onChange={this.onChangeHandle}
              />
            </div>
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label
                className="text-lg block uppercase tracking-wide text-gray-900  font-bold mb-2"
                for="grid-first-name"
              >
                last_name
              </label>
              <input
                className="appearance-none block w-full text-lg bg-gray-200 text-gray-900 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="last_name"
                type="text"
                placeholder="last_name"
                onChange={this.onChangeHandle}
              />
            </div>
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-900 text-lg font-bold mb-2"
                for="name"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full text-lg bg-gray-200 text-gray-900 border    rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="text"
                placeholder="Email"
                onChange={this.onChangeHandle}
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-900 text-lg font-bold mb-2"
                for="grid-password"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full text-lg bg-gray-200 text-gray-900 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="password"
                type="password"
                placeholder="password"
                onChange={this.onChangeHandle}
              />
            </div>
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-900 text-lg font-bold mb-2"
                for="grid-password"
              >
                Conform password
              </label>
              <input
                className="appearance-none text-lg block w-full bg-gray-200 text-gray-900 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="conform-password"
                type="password"
                placeholder="conform password"
                onChange={this.onChangeHandle}
              />
              <p
                id="match-pass"
                className="hidden mb-3 text-red-700 font-medium"
              >
                The password do not match
              </p>

              <div className="flex items-center justify-between">
                <button
                  onClick={this.valiDation}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Sign Up
                </button>
                <Link
                  className="inline-block align-baseline font-bold text-lg text-blue-800 hover:text-blue-700"
                  to="/login"
                >
                  Already have an account?
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
