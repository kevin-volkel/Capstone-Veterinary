import axios from 'axios';
import React from 'react';
import { baseURL } from './util/auth';
import { parseCookies } from 'nookies';
import { convertDate, extractTime, getLogDate, sortDates } from './util/dateFuncs';

const changelog = ({ log, errorLoading }) => {
  return (
    <div className="changelog-container">
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
                    {getLogDate(message.createdAt)}{` `}
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
