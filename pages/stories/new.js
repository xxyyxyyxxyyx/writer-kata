import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Button, Message, Form } from "semantic-ui-react";
import storyFactory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

export default class StoryNew extends Component {
  state = {
    title: "",
    description: "",
    errorMessage: "",
    isLoading: false
  };

  onInput = event => {
    switch (event.target.name) {
      case "title":
        this.setState({ title: event.target.value });
        break;
      case "description":
        this.setState({ description: event.target.value });
        break;
    }
  };

  // Creates a new story
  onSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true, errorMessage: "" });
    try {
      const accounts = await web3.getAccounts();
      // Create a new story
      const newStory = await storyFactory.methods
        .createStory(this.state.title, this.state.description)
        .send({
          from: accounts[0]
        });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    // Clear state variables
    this.setState({
      title: "",
      description: "",
      isLoading: false
    });
  };
  render() {
    return (
      <Layout>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <h3>Start a new story</h3>
          <Form.Field>
            <label>Title</label>
            <input
              value={this.state.title}
              onChange={this.onInput}
              name="title"
            />
          </Form.Field>

          <Form.TextArea
            label="Description"
            placeholder="Describe a starting theme for the story..."
            value={this.state.description}
            name="description"
            onChange={this.onInput}
          />
          <Message
            error
            header="There was some errors with your submission"
            content={this.state.errorMessage}
          />
          <Button primary loading={this.state.isLoading}>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}
