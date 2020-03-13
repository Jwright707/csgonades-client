import { NextPage } from "next";
import { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { ContactApi } from "../api/ContactApi";
import { Layout2 } from "../common/layout/Layout2";
import { ConctactDTO } from "../models/Contact";
import { withRedux } from "../utils/WithRedux";

const ContactPageContainer: NextPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<null | string>(null);

  async function onSubmit() {
    if (email.length === 0 || name.length === 0 || message.length === 0) {
      setError("Something missing");
      return;
    }

    const contactMessage: ConctactDTO = {
      name,
      email,
      message,
    };

    const result = await ContactApi.sendMessage(contactMessage);

    if (result.isErr()) {
      return setError(result.error.message);
    }

    setError(null);
    setSuccess(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <>
      <Layout2 title="Contact" canonical="/contact">
        <div className="contact">
          <h1>Contact</h1>
          {!!error && <p>{error}</p>}
          <Form widths="equal" onSubmit={onSubmit}>
            <Form.Input
              required
              fluid
              label="Name"
              placeholder="Your name"
              value={name}
              onChange={(_, input) => setName(input.value)}
            />
            <Form.Input
              required
              fluid
              label="E-mail"
              placeholder="name@example.com"
              value={email}
              onChange={(_, input) => setEmail(input.value)}
            />
            <Form.TextArea
              required
              label="Message"
              placeholder="Tell us more about you..."
              value={message}
              onChange={(_, input) => {
                const value = input.value as string;
                setMessage(value);
              }}
            />
            <Button positive type="submit">
              Send
            </Button>
          </Form>
          {success && (
            <Message positive>
              <Message.Header>Message sent</Message.Header>
              <p>Your message has been sent.</p>
            </Message>
          )}
        </div>
      </Layout2>
      <style jsx>{`
        .contact {
          max-width: 900px;
          padding: 50px;
          margin: 0 auto;
          min-height: 82vh;
        }
      `}</style>
    </>
  );
};

export default withRedux(ContactPageContainer, { ssr: false });
