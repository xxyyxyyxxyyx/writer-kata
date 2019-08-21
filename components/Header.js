import React from "react";
import { Link } from "../routes";

import { Dropdown, Icon, Menu, Segment } from "semantic-ui-react";

export default () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/">
        <Menu.Item color="teal">
          <img src="/static/typewriter.png" />
        </Menu.Item>
      </Link>

      <Menu.Menu position="right">
        <Link route="/stories/new">
          <Menu.Item color="green">Create New Story</Menu.Item>
        </Link>

        <Link route="/stories/new">
          <Menu.Item color="teal">+</Menu.Item>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
