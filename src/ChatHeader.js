import "./ChatHeader.css";

import EditLocationRoundedIcon from "@material-ui/icons/EditLocationRounded";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import React from "react";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

function ChatHeader({ channelId, channelName }) {
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        {channelId ? (
          <h3>
            <span className="chatHeader__hash">#</span>
            {channelName}
          </h3>
        ) : (
          <h5>Select a Channel</h5>
        )}
      </div>
      <div className="chatHeader__right">
        <NotificationsIcon />
        <EditLocationRoundedIcon />
        <PeopleAltRoundedIcon />
        <div className="chatHeader__search">
          <input type="text" placeholder="Search" />
          <SearchRoundedIcon />
        </div>
        <SendRoundedIcon />
        <HelpRoundedIcon />
      </div>
    </div>
  );
}

export default ChatHeader;
