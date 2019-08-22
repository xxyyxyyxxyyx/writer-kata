import React, { Component } from "react";
import Layout from "../../../components/Layout";
import Story from "../../../ethereum/story";
import { Label, Segment, Form, TextArea, Button } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import { Router } from "../../../routes";
export default class ParagraphNew extends Component {
  state = {
    isLoading: false,
    text: ""
  };
  static async getInitialProps(props) {
    console.log("Hello");
    const address = props.query.address;
    const story = Story(address);
    // Get the latest paragraph index
    const lastParagraphIndex = await story.methods.paragraphCount().call();
    if (lastParagraphIndex === "0") {
      return { address, firstParagraph: true };
    } else {
      // Get the last paragraph of the story
      const lastParagraph = await story.methods
        .paragraphs(lastParagraphIndex - 1)
        .call();
      return { address, lastParagraph };
    }
  }

  onPost = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const accounts = await web3.getAccounts();
    const story = Story(this.props.address);
    await story.methods.createParagraph(this.state.text).send({
      from: accounts[0]
    });
    this.setState({ isLoading: false, text: "" });
    Router.pushRoute(`/stories/${this.props.address}`);
  };

  onInput = event => {
    this.setState({
      text: event.target.value
    });
  };
  render() {
    return (
      <Layout>
        {this.props.firstParagraph ? (
          <div style={{ margin: "20px 0px" }}>
            <Label color="teal" tag>
              Write the first paragraph...
            </Label>
          </div>
        ) : (
          <Segment inverted>
            <div style={{ margin: "20px 0px" }}>
              <Label color="teal" tag>
                Last paragraph...
              </Label>
            </div>
            {this.props.lastParagraph.content}
          </Segment>
        )}

        <Segment>
          <div style={{ margin: "20px 0px" }}>
            <Label color="blue" tag>
              Add new paragraph...
            </Label>
          </div>
          <Form>
            <Form.TextArea
              placeholder="Continue the story.."
              rows="8"
              value={this.state.text}
              onChange={this.onInput}
            />
            <Button
              color="blue"
              loading={this.state.isLoading}
              onClick={this.onPost}
            >
              Post!
            </Button>
          </Form>
        </Segment>
      </Layout>
    );
  }
}
