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
      <Link route="/">
        <h2 style={{ marginLeft: "10px", cursor: "pointer" }}>Writer Kata</h2>
      </Link>

      <Menu.Menu position="right">
        <Link route="/stories/new">
          <Menu.Item color="green">
            <h4>Create New Story</h4>
          </Menu.Item>
        </Link>

        <Link route="/stories/new">
          <Menu.Item color="teal">
            <h4>+</h4>
          </Menu.Item>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
