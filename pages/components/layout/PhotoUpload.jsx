import React, { useRef } from "react";
import { Image, Button } from "semantic-ui-react";

const PhotoUpload = ({ mediaPreview, defaultProfilePic, handleChange }) => {
  const inputRef = useRef(null);

  return (
    <div id="photo-upload">
      <Image
        src={mediaPreview === null ? defaultProfilePic : mediaPreview}
        circular
      />

      <div className="edit">
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={handleChange}
          name="media"
          ref={inputRef}
        />
          <Button
            onClick={(e) => inputRef.current.click()}
            style={{
              borderRadius: "50%",
              padding: "0",
              margin: "0",
              position: "relative",
              bottom: "20px",
              left: "45px",
              cursor: "pointer",
            }}
            // content={<Icon name="edit outline" />}
            icon="pencil"
            color="blue"
            title="upload"
          />
      </div>
    </div>
  );
};

export default PhotoUpload;
