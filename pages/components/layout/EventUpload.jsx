import React, { useRef } from "react";
import { Button, Form, Header, Icon, Image, Segment } from "semantic-ui-react";

const EventUpload = ({
  handleChange,
  setMedia,
  setMediaPreview,
  media,
  mediaPreview,
}) => {
  const inputRef = useRef(null);
  return (
    <>
      <Form.Field style={{ margin: ".3rem" }}>
        <Segment placeholder basic secondary>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            name="media"
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
            }}
            onDragLeave={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();

              const droppedFile = e.dataTransfer.files[0];
              setMediaPreview(URL.createObjectURL(droppedFile));
              setMedia(droppedFile);
            }}
          >
            {mediaPreview == null ? (
              <Segment basic placeholder style={{ cursor: "pointer" }}>
                <Header icon>
                  <Icon name="file image outline" />
                  Drag & Drop or Click to Upload
                </Header>
              </Segment>
            ) : (
              <div>
                <Button
                  onClick={() => {
                    setMedia(null);
                    setMediaPreview(null);
                  }}
                  color="red"
                  aria-label="clear button"
                >
                  <Icon name="trash" />
                  Clear
                </Button>
                <Segment
                  placeholder
                  basic
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
                  }}
                >
                  <Image
                    src={mediaPreview}
                    style={{
                      margin: ".3rem",
                      width: "250px",
                      objectFit: "scale-down",
                    }}
                    centered
                  />
                </Segment>
              </div>
            )}
          </div>
        </Segment>
      </Form.Field>
    </>
  );
};

export default EventUpload;
