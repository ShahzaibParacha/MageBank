import React, { useCallback, useState } from "react";
import "../App.css";
import Dropzone from "./dnd.component";
import ImageList from "./imagelist.component";
import cuid from "cuid";

const AddImages = () => {
  const [keyWords, setKeyWords] = useState("");
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  const onDropAccepted = useCallback((acceptedFiles) => {
    // Loop through accepted files
    acceptedFiles.map((file) => {
      // Initialize FileReader browser API
      const reader = new FileReader();
      // onload callback gets called after the reader reads the file data
      reader.onload = function (e) {
        // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it.
        setImages((prevState) => [
          ...prevState,
          { id: cuid(), src: e.target.result, name: file.name },
        ]);
      };
      // Read the file as Data URL (since we accept only images)
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
    if(images.length > 0) {
      //handle uplaod
      setUploadMessage("Upload Sucessful!")
    }
    else {
      setUploadMessage("Upload Failed! Try again")
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
        <ImageList images={images} />
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
