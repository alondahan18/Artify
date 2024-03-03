import React, { memo } from 'react';
import { FixedSizeList as List  } from 'react-window';
import { ListGroup } from 'react-bootstrap';

const FilterOptionsList = memo(({ options, onSelect, selectedOptions }) => {
  const Row = ({ index, style }) => (
    <ListGroup.Item
      style={style}
      action
      onClick={() => onSelect(options[index])}
      className={selectedOptions.includes(options[index]) ? 'selected' : ''}
    >
      {options[index]}
    </ListGroup.Item>
  );

  return (
    <List
      height={150} // Adjust the height as needed
      itemCount={options.length}
      itemSize={50} // Adjust the itemSize as needed
      width="100%"
    >
      {Row}
    </List>
  );
});

export default FilterOptionsList;
