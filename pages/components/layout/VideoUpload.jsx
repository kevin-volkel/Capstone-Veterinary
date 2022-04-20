import React, { useRef } from 'react';
import { Image, Button } from 'semantic-ui-react';

const PhotoUpload = ({ videoPreview, defaultVideoPic, handleChange }) => {
  const inputRef = useRef(null);

  return (
    <div
      id="video-upload"
      style={{
        borderRadius: '35px',
        width: "70px",
        height: "70px",
      }}
    >
      <Image
        src={videoPreview === null ? defaultVideoPic : videoPreview}
        circular
        style={{objectFit: 'cover' ,width: "70px",
        height: "70px",}}
      />

      <div className="edit">
        <input
          style={{ display: 'none' }}
          type="file"
          accept="video/*"
          onChange={handleChange}
          name="video"
          ref={inputRef}
        />
        <Button
          onClick={(e) => inputRef.current.click()}
          // content={<Icon name="edit outline" />}
          icon="pencil"
          color="blue"
          style={{
            borderRadius: '50%',
            padding: '0',
            margin: '0',
            position: 'relative',
            bottom: '20px',
            left: '45px',
            cursor: 'pointer',
          }}
        />
      </div>
    </div>
  );
};

export default PhotoUpload;
