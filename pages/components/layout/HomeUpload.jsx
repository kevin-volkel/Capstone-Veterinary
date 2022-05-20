import React, { useRef } from "react";
import { Button, Form, Header, Icon, Image, Segment } from "semantic-ui-react";

const HomeUpload = ({
  user,
  mediaURL,
  media,
  mediaType,
  handleChange,
  mediaPreview,
  defaultHomePic,
  handleSubmit,
}) => {
  const inputRef = useRef(null);

  let newType;
  if (media !== null) {
    newType = media.type.substring(0, 5);
  }

  return (
    <div id="home-upload">
      {/* no old media and no new media = default picture */}
      {mediaPreview === null && mediaURL === null && (
        <Image
          position="relative"
          className="adopt-image"
          objectfit="contain"
          src={defaultHomePic}
        />
      )}

      {/* old image and no new media = old image */}
      {mediaPreview === null && mediaType === "image" && (
        <Image
          position="relative"
          className="adopt-image"
          objectfit="contain"
          src={mediaURL}
        />
      )}

      {/* old video and no new media = old video */}
      {mediaPreview === null && mediaType === "video" && (
        <video className="adopt-video" controls>
          <source src={mediaURL} />
          Your browser does not support the video tag.
        </video>
      )}

      {/* new media & it is an image = new image */}
      {mediaPreview !== null && newType === "image" && (
        <Image
          position="relative"
          className="adopt-image"
          objectfit="contain"
          src={mediaPreview}
        />
      )}

      {/* new media & it is a video = new video */}
      {mediaPreview !== null && newType === "video" && (
        <video className="adopt-video" controls>
          <source src={mediaPreview} />
          Your browser does not support the video tag.
        </video>
      )}
      {user && user.role === 'teacher' && (
        <>
          <div className="edit" style={{ position: "relative" }}>
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*,video/*"
              onChange={handleChange}
              name="media"
              ref={inputRef}
            />
            {mediaPreview === null ? (
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
        </>
      )}
    </div>
  );
};

export default HomeUpload;
