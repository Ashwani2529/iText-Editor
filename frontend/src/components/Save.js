import React from "react";
import Notes from "./Notes";
function Save(props) {
  const {showAlert}=props
  return (
    <>
      <div>
        <Notes showAlert={showAlert}/>
      </div>
    </>
  );
}
export default Save;
