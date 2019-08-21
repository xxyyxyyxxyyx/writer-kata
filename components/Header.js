import React from "react";

import { Dropdown, Icon, Menu, Segment } from "semantic-ui-react";

export default () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Menu.Item>WriterKatas</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>Create New Story</Menu.Item>
        <Menu.Item>+</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
