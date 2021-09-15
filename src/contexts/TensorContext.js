import React, { useContext, useState, useEffect } from "react";
const TensorContext = React.createContext();

export const useTensor = () => {
  return useContext(TensorContext);
};

export const TensorProvider = ({ children }) => {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);


  const value = { image, setImage, imageName, setImageName };

  return (
    <TensorContext.Provider value={value}>{children}</TensorContext.Provider>
  );
};
