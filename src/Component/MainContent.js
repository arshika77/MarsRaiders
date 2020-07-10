import React from "react"
import "../index.css"

function MainContent(){
  var rows = [];
for (var i = 0; i < 20; i++) {
  for(var j=0;j<30;j++){
    rows.push(<span style= {{border : 10}}>|__|  </span>)
  }    
  rows.push(<br></br>);
  
}
return (
  <div className = "gridContainer">
    {rows}
    
  </div>
)
}

export default MainContent