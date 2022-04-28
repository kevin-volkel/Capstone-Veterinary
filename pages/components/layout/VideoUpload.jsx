import React, { useRef } from "react";
import { Form, Header, Icon, Image, Segment } from "semantic-ui-react";

const VideoUpload = ({
  handleChange,
  setVideo,
  setVideoPreview,
  video,
  videoPreview,
}) => {
  const inputRef = useRef(null);
  return (
    <>
      <Form.Field style={{ margin: ".3rem" }}>
        <Segment placeholder basic secondary>
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={handleChange}
            name="video"
            style={{ display: "none" }}
            ref={inputRef}
          />
          <div
            onClick={() => {
              inputRef.current.click();
            }}
            style={{ cursor: "pointer" }}
            onDragOver={(e) => {
              e.preventDefault();
              // setHightlighted(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              // setHightlighted(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              // setHightlighted(true);

              let files = e.dataTransfer.files;
              if (files.length === 1) {
                let droppedFiles = Object.values(files);
                setVideo((prev) => [...prev, droppedFiles[0]]);
                setVideoPreview((prev) => [
                  ...prev,
                  URL.createObjectURL(droppedFiles[0]),
                ]);
              } else {
                let droppedFiles = Object.values(files);
                droppedFiles.map((file) => {
                  setVideo((prev) => [...prev, file]);
                  setVideoPreview((prev) => [
                    ...prev,
                    URL.createObjectURL(file),
                  ]);
                });
              }
            }}
          >
            {!videoPreview.length ? (
              <Segment basic placeholder style={{ cursor: "pointer" }}>
                <Header icon>
                  <Icon name="file video outline" style={{ height: "100px" }} />
                  Drag & Drop or Click to Upload
                </Header>
              </Segment>
            ) : (
              <Segment
                placeholder
                basic
                color="green"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap"
                }}
              >
                {videoPreview.map((video, i) => {
                  return (
                    <video key={i} style={{ maxWidth: "180px", objectFit: "scale-down" }}>
                      <source src={videoPreview[i]} />
                      Your browser does not support the video tag.
                    </video>
                  );
                })}
              </Segment>
            )}
          </div>
        </Segment>
      </Form.Field>
    </>
  );
};

export default VideoUpload;
