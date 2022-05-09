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
          style={{maxHeight: "50vw"}}
          position="relative"
          className="adopt-image"
          objectFit="contain"
          src={mediaPreview === null ? defaultHomePic : mediaPreview}
        />
      ) : (
        <video style={{maxHeight: "50vw"}}>
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
              borderRadius: "50%",
              padding: "0.5rem",
              margin: "0px",
              bottom: "-10px",
              cursor: "pointer",
              position: "absolute",
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
                borderRadius: "50%",
                padding: "0.5rem",
                margin: "0px",
                bottom: "-10px",
                cursor: "pointer",
                position: "absolute",
                right: "30px",
              }}
              icon="pencil"
              color="blue"
              title="edit"
            />
            <Button
              onClick={handleSubmit}
              style={{
                borderRadius: "50%",
                padding: "0.5rem",
                margin: "0px",
                bottom: "-10px",
                cursor: "pointer",
                position: "absolute",
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
