import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function RadioCheckInput({ options }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedOption) {
      console.log("Form submitted with option:", selectedOption);
    } else {
      alert("Please select an option before submitting");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {options.map((option, index) => (
        <Form.Check
          key={index}
          type="radio"
          id={`option-${index}`}
          label={option.label}
          value={option.value}
          checked={selectedOption === option.value}
          onChange={handleChange}
        />
      ))}
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default RadioCheckInput;
