import React, { useState } from "react";
import { Dropdown, Modal } from "semantic-ui-react";
import { deleteEvent } from "../../util/eventActions";
import { useRouter } from "next/router";
import EditEventModal from "./EditEventModal";

const EventDropdown = ({ setEvents, event }) => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <Modal
          id="edit-event"
          open={showModal}
          closeIcon
          closeOnDimmerClick
          onClose={() => setShowModal(false)}
        >
          <Modal.Content>
            <EditEventModal
              event={event}
              setEvents={setEvents}
              setShowModal={setShowModal}
            />
          </Modal.Content>
        </Modal>
      )}
      <Dropdown icon="ellipsis vertical" title="Dropdown">
        <Dropdown.Menu>
          <Dropdown.Item text="Edit Event" onClick={() => setShowModal(true)} />
          <Dropdown.Item
            text="Delete Event"
            onClick={() => {
              deleteEvent(event._id, setEvents);
              router.push("/admin");
            }}
          />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default EventDropdown;
