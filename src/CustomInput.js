import React from "react";
import { Form } from "react-bootstrap";

export default props => {
  let { placeholder, name, value, onChange = () => null } = props;
  return (
    // <div class="col-lg">
    <Form.Group>
      <Form.Control
        placeholder={placeholder}
        name={name}
        value={value ? value : ""}
        onChange={onChange}
      />
    </Form.Group>
  );
};
