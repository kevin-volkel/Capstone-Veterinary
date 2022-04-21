import { Form, Header, Icon, Image, Segment } from "semantic-ui-react";

const VideoUpload = ({
  handleChange,
  inputRef,
  setVideo,
  setVideoPreview,
  video,
  videoPreview,
}) => {
  return (
    <>
      <Form.Field>
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
              let droppedFiles = Object.values(files)
              setVideoPreview(() => URL.createObjectURL(droppedFiles[0]));
              setVideo(() => droppedFiles);
            }}
          >
            {videoPreview === null ? (
              <Segment
                basic
                placeholder
                style={{ cursor: "pointer" }}
                // {...(highlighted && { color: "green" })}
              >
                <Header icon>
                  <Icon name="video" />
                  Drag & Drop or Click to Upload
                </Header>
              </Segment>
            ) : (
              <Segment placeholder basic color="green">
                <video>
                  <source src={videoPreview}/>
                  Your browser does not support the video tag.
                </video>
              </Segment>
            )}
          </div>
        </Segment>
      </Form.Field>
    </>
  );
};

export default VideoUpload;