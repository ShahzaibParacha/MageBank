import React from "react";

const Image = ({ image }) => {
  return (
    <div className="file-item">
      <p>{image.name}</p>
    </div>
  );
};

const ImageList = ({ images }) => {
  const renderImage = (image, index) => {
    return <Image image={image} key={`${image.id}-image`} />;
  };
  return (
    <div>
        <h3>Uploading the following files:</h3>
      <section className="file-list">{images.map(renderImage)}</section>
      <br />
    </div>
  );
};

export default ImageList;
