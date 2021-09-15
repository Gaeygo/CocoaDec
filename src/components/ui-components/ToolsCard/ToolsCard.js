import React from "react";
import classes  from "./ToolsCard.module.css";

const ToolsCard = ({ imageSrc, ToolName, ToolDesc }) => {
  return (
      <div className={classes.ToolContainer}><div className={classes.ToolsContainer}>
      <div className={classes.ToolIMG}>
        <img className={classes.ToolIMG} src={imageSrc} alt={`${ToolName} logo` }/>
      </div>
      <div>
        <p
          className={[classes.DisplayedText, classes.ToolHeaderText].join(" ")}
        >
          {ToolName}
        </p>
        <h2 className={classes.ToolText}>{ToolDesc} </h2>
      </div>
    </div></div>
    
  );
};

export default ToolsCard;
