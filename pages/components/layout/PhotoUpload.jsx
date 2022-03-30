import React, { useRef } from 'react';
import { Image, Button } from 'semantic-ui-react'


const PhotoUpload = ({ mediaPreview, defaultProfilePic, handleChange}) => {

  const inputRef = useRef(null);

  return (
    <div
      style={{
        width: '70px',
        height: '70px',
        borderRadius: '35px',
        position: 'absolute',
        right: '15px',
        top: '10px',
      }}
    >
      <Image
        src={mediaPreview === null ? defaultProfilePic : mediaPreview}
        style={{ borderRadius: '50%', height: '70px', width: '70px' }}
      />

      <div className="edit">
        <input
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={handleChange}
          name="media"
          ref={inputRef}
        />
        <Button
          onClick={(e) => inputRef.current.click()}
          style={{
            width: '25px',
            height: '25px',
            borderRadius: '50%',
            padding: '0',
            margin: '0',
            position: 'relative',
            bottom: '20px',
            left: '45px',
            cursor: 'pointer'
          }}
          // content={<Icon name="edit outline" />}
          icon="pencil"
          color="blue"
        />
      </div>
    </div>
  );
};

export default PhotoUpload;
