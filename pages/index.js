import React, { Component } from "react";
import Layout from "../components/Layout";
import storyFactory from "../ethereum/factory";
import { Card, Icon, Image, Grid } from "semantic-ui-react";
import Story from "../ethereum/story";

class Index extends Component {
  static async getInitialProps() {
    const storiesAddresses = await storyFactory.methods.getAllStories().call();
    const stories = await Promise.all(
      storiesAddresses.map(async address => {
        const story = Story(address);
        const summary = await story.methods.getSummary().call();
        return {
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
              {story.title}
            </Card.Header>
            <Card.Meta
              content={story.creator}
              className="right floated"
              style={{ marginTop: "10px" }}
            />
          </Card.Content>
          <Card.Content description={story.description} />
          <Card.Content extra>
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Icon name="user" />
                  {story.contributors} Contributors
                </Grid.Column>
                <Grid.Column>
                  <Icon name="book" />
                  {story.paragraphs} Paragraphs
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
      );
    });
    return stories;
  }

  render() {
    return (
      <Layout>
        <h3>Stories...</h3>
        {this.renderStories()}
      </Layout>
    );
  }
}
export default Index;
