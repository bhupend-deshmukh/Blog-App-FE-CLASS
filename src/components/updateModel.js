import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import Swal from "sweetalert2";

export default class Updatemodel extends Component {
  state = { title: "", description: "", redirect: "" };

  componentDidMount() {
    var hrdata = window.location.href.split("/");
    var p_id = hrdata[hrdata.length - 1];
    const user = reactLocalStorage.getObject("user");
    if (Object.keys(user).length == 0) {
      this.setState({ redirect: "/login" });
    }
    axios
      .get("http://localhost:5050/getpostBy/" + p_id, {
        headers: {
          "Content-Type": "application/json",
          token: user.token,
        },
      })
      .then((resp) => {
        // if (resp.data.status == "error") {
        //   console.log();
        //   // Swal.fire({
        //   //   title: "Error!",
        //   //   text: resp.data.message,
        //   //   icon: "error",
        //   // });
        // }
        if (resp.data.status == "success") {
          let getData = resp.data.data 
          console.log(getData);
          this.setState({
            title: getData[0].title,
            description: getData[0].description,
          });

          // Swal.fire({
          //   title: "Post Updated!",
          //   text: "Go to blog page.",
          //   icon: "success",
          // });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChangeHandler = (e) => {
    if (e.target.id == "title") {
      this.setState({ title: e.target.value });
    } else {
      this.setState({ description: e.target.value });
    }
  };

  validations = () => {

    var hrdata = window.location.href.split("/");
    var p_id = hrdata[hrdata.length - 1];
    let title = this.state.title.trim();
    let description = this.state.description.trim();
    let user = reactLocalStorage.getObject("user");
    let bodyData = { title, description };
    {
      title == ""
        ? document.getElementById("title").classNameList.add("border-red-600")
        : document.getElementById("title").classNameList.remove("border-red-600");
    }
    {
      description == ""
        ? document.getElementById("description").classNameList.add("border-red-600")
        : document
            .getElementById("description")
            .classNameList.remove("border-red-600");
    }
    if (title.length == 0 || description.length == 0) {
      return;
    }
    axios
      .put("http://localhost:5050/updatePost/"+p_id, bodyData, {
        headers: {
          "Content-Type": "application/json",
          "token": user.token,
        },
      })
      .then((resp) => {
        // console.log(resp);
        if (resp.data.status == "error") {
          Swal.fire({
            title: "Error!",
            text: resp.data.message,
            icon: "error",
          });
        } else if (resp.data.status == "success") {
          this.setState({ redirect: "/" });

          Swal.fire({
            title: "Post Updated!",
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

  cancleButton = () => {
    this.setState({ redirect: "/" });
  };

  render() {
    return (
      <div>
        {!this.state.redirect ? "" : <Navigate to={this.state.redirect} />}

        <div className="w-full bg-slate-900  flex place-content-center h-screen items-center ">
          <form className="bg-gray-400 shadow-md rounded px-10 py-12 mb-4 lg:w-1/2 w-full">
            <div className="mb-4">
              <p className="text-2xl font-bold mb-6">Update Blog</p>
              <label
                id=""
                className="block text-slate-900 text-lg font-bold mb-2"
                for="username"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Enter Your Title..."
                value={this.state.title}
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-slate-900 text-lg font-bold mb-2"
                for="password"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full h-28 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="password"
                placeholder="Enter Your Content..."
                onChange={this.onChangeHandler}
                value={this.state.description}
              />
            </div>
            <div className="flex gap-6 justify-end">
              <button
                onClick={this.cancleButton}
                className="bg-red-500 hover:bg-red-700 text-white uppercase font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Cancle
              </button>
              <button
                onClick={this.validations}
                className="bg-green-700 hover:bg-green-600 text-white uppercase font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
