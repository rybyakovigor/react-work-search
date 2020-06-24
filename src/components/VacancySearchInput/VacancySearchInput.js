import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const VacancySearchInput = (props) => {
  return (
    <React.Fragment>
      <InputGroup className="mb-3">
        <FormControl
          onKeyPress={props.keyHandler}
          onChange={props.searchInput}
          placeholder="Введите название вакансии"
          aria-label="Поле для ввода вакансии"
          aria-describedby="Поле для ввода вакансии"
        />
        <InputGroup.Append>
          <Button onClick={props.searchButton} variant="outline-secondary">
            Искать
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </React.Fragment>
  );
};

export default VacancySearchInput;
