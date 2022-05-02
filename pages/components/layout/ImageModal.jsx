import {
  Card,
  Image,
  Segment,
} from "semantic-ui-react";

const ImageModal = ({ image }) => {
  return (
    <Segment basic>
      <Card fluid>
        <Image
          src={image}
          style={{ cursor: "pointer" }}
          floated="left"
          wrapped
          ui={false}
          alt="AnimalImage"
        />
      </Card>
    </Segment>
  );
};

export default ImageModal;
