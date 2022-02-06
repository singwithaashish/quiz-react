import { Badge, ListGroup } from "react-bootstrap";

import React, { useEffect, useState } from "react";



function CardComp(props) {



  let correctIndex = 0;
  let he = require("he");
  
  
  function optionClicked(index, correct) {
    // alert(index == correct ? "Correct" : "Wrong");
    props.setUserAn(index);
    setTimeout(() => {
    props.setOpen(false);
    
    }, 1000);
    // props.chang();
  }


  return (
    <div className="box bg-warning">
      <div className="d-flex justify-content-around">
        <Badge bg="secondary">{props['quix']['category']}</Badge>
        <Badge bg="dark">{props['quix']['difficulty']}</Badge>
      </div>
      <h2>{he.decode(props['quix']['question'])}</h2>
      <ListGroup>
      {
      props.quix['answers'].map((ans, index) => {
        // console.log(ans);
        return (
          // if userans is not -1 then check if it is correct or not, also if index is not correct, and is userans, mark it yellow
          <ListGroup.Item key={index} action variant={props.userAn !== -1 ? index === props.quix.correctIndex ? "success" : props.userAn === index ? "danger" : "light" : "light"} onClick={() => optionClicked(index, props.quix.correctIndex)}>
          {he.decode(ans)}
        </ListGroup.Item>)
      })}
        
        
      </ListGroup>
    </div>
  );
}

export default CardComp;
