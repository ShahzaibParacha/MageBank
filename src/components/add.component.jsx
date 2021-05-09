import React, { useCallback, useState } from "react";
import "../MageBank.css";
import Dropzone from "./dnd.component";
import ImageList from "./imagelist.component";
import cuid from "cuid";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddImages = () => {
  const history = useHistory();
  const [keyWords, setKeyWords] = useState("");
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  const onDropAccepted = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages((prevState) => [
          ...prevState,
          { id: cuid(), src: e.target.result, name: file.name },
        ]);
      };
      setErrorMessage("");
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const onDropRejected = () => {
    setErrorMessage("Invalid action! Retry with Images only.");
  };

  const handleChange = (e) => {
    setKeyWords(e.target.value);
    console.log(keyWords);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`We have ${images.length} images.`);
    if (images.length > 0) {
      images.forEach((image) => {
        axios({
          method: "post",
          url: `http://localhost:4000/image`,
          params: {
            address: "generated",
            filename: image.name,
            keywords: keyWords,
          },
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error();
          });
      });
      setUploadMessage("Upload Sucessful!");
      history.push("/Images");
    } else {
      setUploadMessage("Upload Failed! Try again");
    }
  };

  return (
    <div className="addImagesPage">
      <h1>Add New Images</h1>
      <div className="dropzone">
        <br />
        <Dropzone
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
          accept={"image/*"}
        />
        <br />
        <ImageList images={images} />{" "}
        {errorMessage && <h3> {errorMessage} </h3>}
        <form onSubmit={handleSubmit}>
          <label>
            Add Keywords:
            <input type="text" onChange={handleChange} />
          </label>
          <br />
          <button className="add-upload">Upload!</button>
        </form>
        {uploadMessage && <h3> {uploadMessage} </h3>}
      </div>
    </div>
  );
};

export default AddImages;
