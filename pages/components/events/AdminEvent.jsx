import React, { useRef, useEffect } from 'react';
import { Icon, Image } from 'semantic-ui-react';
import { convertDate } from '../../util/dateFuncs';

const AdminEvent = ({ event, eventElem }) => {
  return (
    <>
      <div className='event-info'>
        <div className='event-title'>{event.title}</div>
        <div className='event-desc'>
          {event.desc.length > 20
            ? `${event.desc.slice(0, 17)}...`
            : event.desc}
        </div>
        <div className='event-date'>{convertDate(event.date)}</div>
      </div>
      <div className='event-pic'>
        <Image src={event.bannerPic} />
      </div>
      <div className='options'>
        <Icon name='ellipsis vertical' size='large' />
      </div>
    </>
  );
};

export default AdminEvent;
