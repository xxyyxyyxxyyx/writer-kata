import React from "react";

import { Dropdown, Icon, Menu, Segment } from "semantic-ui-react";

export default () => {
  return (
    <Menu attached="top">
      <Menu.Item>WriterKatas</Menu.Item>
      <Menu.Menu position="right">
        <div className="ui right aligned category search item">
          <div className="ui transparent icon input">
            <input
              className="prompt"
              type="text"
              placeholder="Filter stories..."
            />
            <i className="search link icon" />
          </div>
          <div className="results" />
        </div>
      </Menu.Menu>
    </Menu>
  );
};
