import React, { Component } from "react";
import firebase from "../services/firebase";

const polloyon =
  "http://colorspaceartandimaging.com/wp-content/uploads/2013/07/Very-Basic-Upload-icon.jpg";

class SubirArchivos extends Component {
  state = {
    link: null,
    file: null,
    progress: 0
  };

  makePreview = e => {
    const file = e.target.files[0];
    this.setState({ file });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({ link: reader.result });
    };
  };
  uploadFile = () => {
    const { file } = this.state;
    const body = new FormData();
    body.append("archivo", file);
    fetch("http://localhost:3000/new", {
      method: "post",
      body
    })
      .then(response => response.json())
      .then(respuesta => {
        this.setState({ link: respuesta });
      });
  };

  uploadToFirebase = () => {
    const { file } = this.state;
    const task = firebase
      .storage()
      .ref("navida")
      .child(file.name)
      .put(file);

    task.on("state_changed", snap => {
      var progress = (snap.bytesTransferred / snap.totalBytes) * 100;
      progress = Math.floor(progress);
      this.setState({ progress });
    });

    task
      .then(snap => snap.ref.getDownloadURL())
      .then(link => {
        console.log(link);
        //pongo la palomota
        this.setState({
          link:
            "https://previews.123rf.com/images/stuartphoto/stuartphoto1409/stuartphoto140900806/31545001-done-tick-showing-check-finished-and-completed.jpg"
        });
        //axios que manda el form o el obj con todo el link para db
      });
  };

  render() {
    const { link, progress } = this.state;
    return (
      <div>
        <h2>Subetesta foto</h2>
        <input
          hidden
          ref={i => (this.input = i)}
          onChange={this.makePreview}
          type="file"
        />
        <div
          style={{
            margin: "0 auto",
            width: "80%",
            backgroundColor: "black",
            height: 50
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              backgroundColor: progress > 99 ? "green" : "orange",
              height: "100%"
            }}
          />
        </div>
        <img
          onClick={() => this.input.click()}
          width="200"
          src={link || polloyon}
        />
        <button onClick={this.uploadToFirebase}>Si subela!</button>
      </div>
    );
  }
}

export default SubirArchivos;
