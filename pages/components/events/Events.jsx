import React, { useState } from 'react';
import {
  Button,
  Icon,
  Dropdown,
  Container,
  Grid,
  Pagination,
  Modal,
  Divider,
} from 'semantic-ui-react';
import AdminEvent from './AdminEvent';
import AddEventModal from './AddEventModal';
import EventCard from './EventCard';

const Events = ({ user, events }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [susEvents, setSusEvents] = useState(events);
  return (
    <>
      <Button disabled={loading} onClick={() => setShowModal(true)}>
        <Icon name='plus' />
        Add Event
      </Button>
      {showModal && (
        <Modal
          id='add-event'
          open={showModal}
          closeIcon
          closeOnDimmerClick
          onClose={() => setShowModal(false)}
        >
          <Modal.Content>
            <AddEventModal
              user={user}
              setEvents={setSusEvents}
              setShowModal={setShowModal}
            />
          </Modal.Content>
        </Modal>
      )}
      <Container fluid className='events-list'>
        <Divider />
        {susEvents.map((event, i) => (
          <>
            <div className='event-card' key={i}>
              <AdminEvent event={event} setEvents={setSusEvents} />
            </div>
            {i !== susEvents.length - 1 && <Divider />}
          </>
        ))}
      </Container>
    </>
  );
};

export default Events;
