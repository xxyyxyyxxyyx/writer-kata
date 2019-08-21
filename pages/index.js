import React, { Component } from "react";
import Layout from "../components/Layout";
import storyFactory from "../ethereum/factory";
import { Card, Icon, Image, Grid, Label, Menu } from "semantic-ui-react";
import Story from "../ethereum/story";
import { Link } from "../routes";

class Index extends Component {
  static async getInitialProps() {
    const storiesAddresses = await storyFactory.methods.getAllStories().call();
    const stories = await Promise.all(
      storiesAddresses.map(async address => {
        const story = Story(address);
        const summary = await story.methods.getSummary().call();
        return {
          address: address,
          title: summary[0],
          description: summary[1],
          contributors: summary[2],
          paragraphs: summary[3],
          creator: summary[4]
        };
      })
    );
    return { stories };
  }

  renderStories() {
    const stories = this.props.stories.map((story, index) => {
      return (
        <Card fluid={true} key={index}>
          <Card.Content>
            <Image
              floated="right"
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            />

            <Card.Header className="left floated" style={{ marginTop: "10px" }}>
              <Link route={`/stories/${story.address}`}>{story.title}</Link>
            </Card.Header>
            <Card.Meta
              content={story.creator}
              className="right floated"
              style={{ marginTop: "10px" }}
            />
          </Card.Content>
          <Card.Content description={story.description} />
          <Card.Content extra>
            <Menu compact floated="right">
              <Menu.Item>
                <Icon name="user" /> Contributors
                <Label color="red" floating>
                  {story.contributors}
                </Label>
              </Menu.Item>
              <Menu.Item>
                <Icon name="book" /> Paragraphs
                <Label color="teal" floating>
                  {story.paragraphs}
                </Label>
              </Menu.Item>
            </Menu>
          </Card.Content>
        </Card>
      );
    });
    return stories;
  }

  render() {
    return (
      <Layout>
        <div style={{ margin: "20px 0px" }}>
          <Label color="teal" tag size="big">
            All Stories...
          </Label>
        </div>
        {this.renderStories()}
      </Layout>
    );
  }
}
export default Index;
