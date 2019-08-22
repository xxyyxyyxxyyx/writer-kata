import React, { Component } from "react";
import Layout from "../../components/Layout";
import Story from "../../ethereum/story";
import { Segment, Label, Icon, Button, Image } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import { Link } from "../../routes";

export default class StoryShow extends Component {
  state = {
    isLoading: false,
    hasJoined: false
  };
  static async getInitialProps(props) {
    const address = props.query.address;
    const story = Story(address);
    const title = await story.methods.title().call();
    const paragraphCount = await story.methods.paragraphCount().call();
    const paragraphs = await Promise.all(
      Array(parseInt(paragraphCount))
        .fill()
        .map((element, index) => {
          console.log(index);
          return story.methods.paragraphs(index).call();
        })
    );
    console.log(paragraphs);
    return {
      address,
      title,
      paragraphCount,
      paragraphs
    };
  }

  async componentDidMount() {
    const accounts = await web3.getAccounts();
    const story = Story(this.props.address);
    const hasJoined = await story.methods.contributors(accounts[0]).call();
    this.setState({
      hasJoined
    });
  }

  join = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const accounts = await web3.getAccounts();
    const address = this.props.address;
    const story = Story(address);
    await story.methods.join().send({
      from: accounts[0]
    });
    this.setState({ isLoading: false });
  };

  renderParagraphs = () => {
    const paragraphRows = this.props.paragraphs.map(paragraph => {
      const index = paragraph[0];
      const content = paragraph[1];
      const writerAddress = paragraph[2];

      return (
        <Segment>
          <div style={{ margin: "20px 0px" }}>
            <Label color="teal" tag>
              Paragraph - {index}
            </Label>
            <Label image>
              <img
                src={`https://robohash.org/${index}?set=set3&size=180x180`}
              />
              {writerAddress}
            </Label>
          </div>
          {content}
        </Segment>
      );
    });

    console.log(paragraphRows);
    return paragraphRows;
  };
  render() {
    return (
      <Layout>
        <div style={{ margin: "20px 0px" }}>
          <Label color="teal" tag size="big">
            {this.props.title}
          </Label>

          {this.state.hasJoined ? (
            <Link route={`/stories/${this.props.address}/paragraphs/new`}>
              <Button color="blue" size="mini" floated="right">
                <Icon name="book" /> Write a paragraph
              </Button>
            </Link>
          ) : (
            <Button
              color="blue"
              size="mini"
              floated="right"
              onClick={this.join}
              loading={this.state.isLoading}
            >
              <Icon name="pencil" /> Join the journey
            </Button>
          )}
        </div>
        {this.renderParagraphs()}
      </Layout>
    );
  }
}
