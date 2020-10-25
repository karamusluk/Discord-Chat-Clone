import "./Sidebar.css";

import React, { useEffect, useState } from 'react'
import db, { auth } from "./firebase";

import AddIcon from '@material-ui/icons/Add';
import { Avatar } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HeadsetIcon from '@material-ui/icons/Headset';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MicIcon from '@material-ui/icons/Mic';
import PhoneIcon from '@material-ui/icons/Phone';
import SettingsIcon from '@material-ui/icons/Settings';
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import { selectUser } from './features/userSlice'
import { useSelector } from 'react-redux'

function Sidebar() {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);
    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                channel: doc.data() 
            })))
        ))
    });
    const handleAddChannel = () => {
        const channelName = prompt("Enter a channel name");
        
        if(channelName){
            db.collection('channels').add({
                channelName: channelName,
            }); 
        }
    };
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>Demo Room</h3>
                <ExpandMoreIcon />
            </div>
            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
                </div>
                <div className="sidebar__channelsList">
                    {channels.map(({ id, channel }) => 
                        <SidebarChannel 
                            key={id} 
                            id={id} 
                            channelName={channel.channelName} 
                        />
                    )}
                </div>
            </div>

            <div className="sidebar__voice">
                <SignalCellularAltIcon className="sidebar__voiceIcon" fontSize="large"/>
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon />
                    <PhoneIcon />
                </div>
            </div>

            <div className="sidebar__profile">
                <Avatar onClick={ () => auth.signOut() } src={user.photo ? user.photo : "https://avatars1.githubusercontent.com/u/56627814?s=400&u=45900bff384e6d46518152734f27e62faece1f86&v=4"}/>
                <div className="sidebar__profilInfo">
                    <h3>@{user.displayName}</h3>
                    <p>#{user.uid.substring(0,5)}</p>
                </div>
                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
