import React, { Component } from "react";
import Layout from "../../components/Layout";
import Story from "../../ethereum/story";
import { Segment, Label, Icon, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";

export default class StoryShow extends Component {
  state = {
    isLoading: false
  };
  static async getInitialProps(props) {
    console.log("Hello");
    const accounts = await web3.getAccounts();
    console.log(accounts);
    const address = props.query.address;
    const story = Story(address);
    const title = await story.methods.title().call();
    const paragraphCount = await story.methods.paragraphCount().call();
    // const hasJoined = await story.methods.contributors(accounts[0]).call();
    return {
      address,
      title,
      paragraphCount
    };
  }

  async componentDidMount() {
    const accounts = await web3.getAccounts();
    console.log(accounts);
  }

  join = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const accounts = await web3.getAccounts();
    console.log(accounts);
    const address = this.props.address;
    const story = Story(address);
    await story.methods.join().send({
      from: accounts[0]
    });
    this.setState({ isLoading: false });
  };
  render() {
    return (
      <Layout>
        <div style={{ margin: "20px 0px" }}>
          <Label color="teal" tag size="big">
            {this.props.title}
          </Label>
          <Button
            color="blue"
            size="mini"
            floated="right"
            onClick={this.join}
            loading={this.state.isLoading}
          >
            <Icon name="pencil" /> Join the journey
          </Button>
        </div>
        <Segment>{this.props.title}</Segment>
        <Segment>{this.props.paragraphCount}</Segment>
      </Layout>
    );
  }
}
