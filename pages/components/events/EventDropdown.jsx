import React from "react";
import { Dropdown } from "semantic-ui-react";
import { deleteEvent } from "../../util/eventActions";
import { useRouter } from "next/router";

// TODO: This is missing functionality for sub-menu here from SUI core examples.
// The "Publish To Web" item should contain a sub-menu.

const DropdownExampleDropdown = ({ setEvents, eventId }) => {
  const router = useRouter();

  return (
    <Dropdown icon="ellipsis vertical">
      <Dropdown.Menu>
        <Dropdown.Item text="Edit Event" />
        <Dropdown.Item
          text="Delete Event"
          onClick={() => {
            deleteEvent(eventId, setEvents);
            router.push("/admin");
          }}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownExampleDropdown;
