import React, { memo } from 'react';
import {ListGroup} from 'react-bootstrap';

const FilterOptionsList = memo(({ options, onSelect, selectedOptions }) => {
  return (
    <ListGroup className="artist-list" variant="flush">
      {options.map((option, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => onSelect(option)}
          className={selectedOptions.includes(option) ? 'selected' : ''}
        >
          {option}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default FilterOptionsList;
