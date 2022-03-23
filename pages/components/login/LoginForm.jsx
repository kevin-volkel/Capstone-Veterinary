import React, {useState} from 'react'
import { Form, Segment, Message } from 'semantic-ui-react'

const LoginForm = ({ user: {email, password}, handleChange }) => {

  const [formLoading, setFormLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [showPassword, setShowPassword] = useState(false)


  return <>
    <Form
      loading={formLoading}
      error={errorMsg !== null}
      // onSubmit={handleSubmit}
    >
      <Message 
        error
        header="Oops!"
        content={errorMsg}
        onDismiss={() => setErrorMsg(null)}
      />
      <Segment>
        <Form.Input 
          label="Email"
          required
          placeholder="Email"
          value={email}
          name="email"
          onChange={handleChange}
          icon="envelope"
          iconPosition='left'
          type="email"
        />
        <Form.Input 
          label="Password"
          required
          placeholder="Password"
          value={password}
          name="password"
          onChange={handleChange}
          icon="envelope"
          iconPosition='left'
          type="password"
        />
      </Segment>
    </Form>
  </>
}

export default LoginForm