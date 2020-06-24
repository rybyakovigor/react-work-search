import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const VacancyCard = (props) => {
  let vacancyDate =
    props.data["creation-date"].substr(8, 2) +
    "." +
    props.data["creation-date"].substr(5, 2) +
    "." +
    props.data["creation-date"].substr(0, 4);

  return (
    <Card border="secondary" className="mb-3">
      <Card.Header className="cardHeaderText d-flex flex-column flex-md-row justify-content-md-between align-items-md-center">
        <Card.Title className="cardTitle mb-1 mb-md-0">
          {props.data["job-name"]}
        </Card.Title>
        {props.data.salary ? (
          <span className="d-inline-block font-weight-bolder text-md-right">
            {props.data.salary} {props.data.currency.slice(1, 5)}
          </span>
        ) : (
          <span className="text-muted">Не указана</span>
        )}
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <span className="d-inline-block mb-1">{props.data.company.name}</span>
          <br />
          <span>{props.data.addresses.address["0"].location}</span>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
        <Button className="order-1 order-sm-0" onClick={props.openVacancy}>
          Открыть вакансию
        </Button>
        <span className="order-0 order-sm-1 mb-2 mb-sm-0">
          Дата публикации: {vacancyDate}
        </span>
      </Card.Footer>
    </Card>
  );
};

export default VacancyCard;
