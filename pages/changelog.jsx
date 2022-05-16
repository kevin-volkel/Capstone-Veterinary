import axios from 'axios';
import React from 'react';
import { baseURL } from './util/auth';
import { parseCookies } from 'nookies';
import Cookies from 'js-cookie';
import {
  convertDate,
  extractTime,
  getLogDate,
  sortDates,
} from './util/dateFuncs';
import { Button, Dropdown } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const changelog = ({ log, errorLoading, user }) => {
  const router = useRouter();

  const [filterObj, setFilterObj] = useState({
    campus: 'all',
    session: 'all',
    user: 'all',
  });

  const sessionOptions = [
    {
      text: 'Session One',
      value: '1',
    },
    {
      text: 'Session Two',
      value: '2'
    }
  ];

  const campusOptions = [
    {
      text: 'Northwest',
      value: 'northwest',
    },
    {
      text: 'Northeast',
      value: 'northeast',
    },
    {
      text: 'Southwest',
      value: 'southwest',
    },
    
  ];

  
  const [filteredLogs, setFilteredLogs] = useState(log);

  const handleChange = (_, data) => {
    const { name, value } = data;
    const newFilterObj = { ...filterObj, [name]: value };
    setFilterObj(newFilterObj);
    filterResults(newFilterObj);
  };

  const filterResults = (obj) => {
    setFilteredLogs(log);

    const { campus, session, user } = obj;
    if (campus !== 'any') {
      setFilteredLogs((prev) =>
        prev.filter((log) => entry.campus === campus)
      );
    }
    if (session !== 'any') {
      setFilteredLogs((prev) =>
        prev.filter((log) => log.session === session)
      );
    }
    if (user !== 'any') {
      setFilteredLogs((prev) => prev.filter((log) => log.user === user));
    }
  };

  const clearLog = async () => {
    try {
      const token = Cookies.get('token');
      const deleted = await axios.delete('/api/v1/log', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(deleted);
      router.reload('/changelog');
    } catch (err) {
      console.log(err);
    }
  };

  return (

    
    <div className="changelog-container">

<div className='sort-div'>
        <Dropdown
          placeholder='Campus'
          name='campus'
          selection
          options={campusOptions}
          onChange={handleChange}
          value={filterObj.campus}
        />
        <Dropdown
          placeholder='Session'
          name='session'
          selection
          options={sessionOptions}
          onChange={handleChange}
          value={filterObj.session}
        />
      </div>

      <h1 className="changelog-title"> Changelog </h1>
      <div className="log-container">
        {errorLoading !== null ? (
          <div className="log-text error">
            An error has occurred. Please try again later
          </div>
        ) : (
          log.entries
            .sort((a, b) => {
              const aSec = new Date(a.createdAt).getTime();
              const bSec = new Date(b.createdAt).getTime();
              return bSec - aSec;
            })
            .map((message) => {
              return (
                <div className="log-text" key={message._id}>
                  <span className="log-date">
                    {getLogDate(message.createdAt)}
                    {` `}
                    {extractTime(message.createdAt)}:{` `}
                  </span>
                  {message.details}
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};

changelog.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseURL}/api/v1/log`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const log = res.data;

    return { errorLoading: null, log: log };
  } catch (err) {
    console.log(err);
    return { errorLoading: err, log: {} };
  }
};

export default changelog;
