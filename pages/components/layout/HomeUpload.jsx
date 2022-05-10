import React, { useRef } from "react";
import { Button, Form, Header, Icon, Image, Segment } from "semantic-ui-react";

const HomeUpload = ({ mediaPreview, defaultHomePic, handleChange, media, handleSubmit }) => {
  const inputRef = useRef(null);

  let type;
  if (media !== null) {
    type = media.type.substring(0, 5);
  }

  return (
    <div id="home-upload">
      {mediaPreview == null || type === "image" || media === null ? (
        <Image
          position="relative"
          className="adopt-image"
          objectfit="contain"
          src={mediaPreview === null ? defaultHomePic : mediaPreview}
        />
      ) : (
        <video className="adopt-video">
          <source src={mediaPreview} />
          Your browser does not support the video tag.
        </video>
      )}

      <div className="edit" style={{ position: "relative" }}>
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*,video/*"
          onChange={handleChange}
          name="media"
          ref={inputRef}
        />
        {mediaPreview == null ? (
          <Button
            onClick={(e) => inputRef.current.click()}
            style={{
              right: "-10px",
            }}
            icon="pencil"
            color="blue"
            title="upload"
          />
        ) : (
          <>
            <Button
              onClick={(e) => inputRef.current.click()}
              style={{
                right: "40px",
              }}
              icon="pencil"
              color="blue"
              title="edit"
            />
            <Button
              onClick={handleSubmit}
              style={{
                right: "-10px",
              }}
              icon="check"
              color="green"
              title="submit"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeUpload;
