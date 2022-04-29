import React from 'react';
import { Dropdown } from 'semantic-ui-react';

// TODO: This is missing functionality for sub-menu here from SUI core examples.
// The "Publish To Web" item should contain a sub-menu.

const DropdownExampleDropdown = () => (
  <Dropdown icon='ellipsis vertical'>
    <Dropdown.Menu>
      <Dropdown.Item text='Edit Event' />
      <Dropdown.Item text='Delete Event' />
    </Dropdown.Menu>
  </Dropdown>
);

export default DropdownExampleDropdown;
