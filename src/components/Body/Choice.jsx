import React from "react";
import {
  Form,
  Button,
  Dropdown,
  DropdownButton,
  Row,
  Col,
} from "react-bootstrap";
import category from "./category";

function Choice(props) {
  const handleSelect = (cat) => {
    // console.log(cat.id);
    props.setCategory(cat.id);
  }

  const difficulty = [
    "easy",
    "medium",
    "hard",
  ];  

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setStart(true);
  }
  return (
    <Form onSubmit={handleSubmit} className="bg-warning w-50 p-3 position-absolute top-50 start-50 translate-middle">
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Category
        </Form.Label>
        <Col sm={10}>
          <DropdownButton
            variant="outline-secondary"
            title={props.category ? category.find(o => o.id == props.category).name : "Select Category"} 
            id="cat"
          >
            {category.map((cat, index) => {
              return <Dropdown.Item onClick={() => handleSelect(cat)} key={index} href="#helo">{cat['name']}</Dropdown.Item>;
            })}
          </DropdownButton>
        </Col>
      </Form.Group>

      
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            Difficulty
          </Form.Label>
          <Col sm={10}>

            {difficulty.map((diff, index) => {
              return (
                <Form.Check
                  key={index}
                  type="radio"
                  label={diff}
                  name="difficulty"
                  id={diff}
                  onChange={(e) => props.setDifficulty(diff)}
                />
              );

            }
            )}
          </Col>
        </Form.Group>
      </fieldset>

      <fieldset>
      <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            Question Type
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              onChange={(e) => props.setType("boolean")}
              type="radio"
              label="True/False"
              name="boolean"
              id="fhr1"
            />
            <Form.Check
            onChange={(e) => props.setType("multiple")}
              type="radio"
              label="MCQ"
              name="multiple"
              id="fhr2"
            />
            
          </Col>
        </Form.Group>
        </fieldset>
      

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Let's get started</Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default Choice;
