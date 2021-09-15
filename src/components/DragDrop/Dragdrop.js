import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTensor } from "../../contexts/TensorContext";
import "./Dragdrop.css";
import testImg from "../../images/Firebase.png";

const Dragdrop = () => {
  const [files, setFiles] = useState([]);
  const [imageUrl, setImageUrl] = useState({});
  const { image, setImage, setImageName } = useTensor();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFiles(acceptedFiles);
      const reader = new FileReader();
      reader.onabort = () => console.log("File reading was aborted");
      reader.onerror = () => console.log("File reading failed");
      reader.onloadend = () => {
        const dataUrl = reader.result;
        setImageUrl({
          url: dataUrl,
        });
        setImage(dataUrl);
        setImageName(acceptedFiles[0].name)
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    isDragAccept,
    fileRejections,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/jpg",
    multiple: false,
  });
  return (
    <div className="container" {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="draginfo">
        {acceptedFiles.length > 0 ? (
          <>
            <img
              className="uploadedImage"
              src={imageUrl.url}
              alt="selected file"
            ></img>
            <h6>{acceptedFiles[0].name}</h6>
          </>
        ) : (
          <p style={{ color: "beige" }}> Drop some files here</p>
        )}
        {fileRejections.length > 0 ? <p>File rejected</p> : null}

        {/* <img className="uploadedImage" src={testImg} alt="selected file"></img> */}
      </div>
    </div>
  );
};

export default Dragdrop;
