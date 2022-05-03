import React, { useRef } from "react";
import { Button, Form, Header, Icon, Image, Segment } from "semantic-ui-react";

const AnimalUpload = ({
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
            multiple
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
                setMedia((prev) => [...prev, droppedFiles[0]]);
                setMediaPreview((prev) => [
                  ...prev,
                  URL.createObjectURL(droppedFiles[0]),
                ]);
              } else {
                let droppedFiles = Object.values(files);
                droppedFiles.map((file) => {
                  setMedia((prev) => [...prev, file]);
                  setMediaPreview((prev) => [
                    ...prev,
                    URL.createObjectURL(file),
                  ]);
                });
              }
              // console.log(media);
            }}
          >
            {!mediaPreview.length ? (
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
                    setMedia([]);
                    setMediaPreview([]);
                  }}
                >
                  Empty Input
                </Button>
                <Segment
                  placeholder
                  basic
                  color="green"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
                  }}
                >
                  {mediaPreview.map((pic, i) => {
                    return (
                      <Image
                        key={i}
                        src={pic}
                        style={{
                          margin: ".3rem",
                          width: "180px",
                          objectFit: "scale-down",
                        }}
                        alt={media.length ? media[i].name : "image"}
                        centered
                      />
                    );
                  })}
                </Segment>
              </div>
            )}
          </div>
        </Segment>
      </Form.Field>
    </>
  );
};

export default AnimalUpload;
