import { Card, Image, Segment } from "semantic-ui-react";

const ImageModal = ({ image }) => {
  return (
    <Segment basic>
      <Card fluid style={{ boxShadow: "none" }}>
        <Image
          src={image}
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
