import React from 'react'
import {Card, Image, Button} from 'semantic-ui-react'

const AnimalCard = ({name, description, type, createdAt}) => {
  return (
    <>
        <Card>
            <Image src='/images/avatar/large/daniel.jpg' float="left" size="small" wrapped ui={false} />
            <Card.Content>
                <Card.Header>Doug</Card.Header>
                <Card.Meta>Posted 2-2-22</Card.Meta>
                <Card.Description>
                    they is an aminal lamo
                </Card.Description>
            </Card.Content>
    <Card.Content extra>
      <Button>Adopt Me!</Button>
    </Card.Content>
  </Card>
    </>
  )
}

export default AnimalCard