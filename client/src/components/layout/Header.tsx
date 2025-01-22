import { UserOutlined } from "@ant-design/icons";
import { Card } from "antd";
import '../../assets/css/appHeader.css';
import logo from "../../assets/img/logo.jpg";
import { useState, useRef } from 'react';
import ModelWrapper from '../common/ModelWrapper';
import MiniProfileView from "../feature/MiniProfileView";

const AppHeader: React.FC = () => {
    const [showProfile, setShowProfile] = useState(false);
    const profileIconRef = useRef<HTMLDivElement>(null);

    return (
        <div className="app-header">
            <div className="header-title">
                <img src={logo} alt="logo" className="logo" />
            </div>
            <div className="functional">
                <Card
                    className="mini-profile-bubble"
                    bordered={false}
                    ref={profileIconRef}
                    onClick={() => setShowProfile(!showProfile)}
                >
                    <UserOutlined className="profile-icon"/>
                </Card>
                {showProfile && (
                    <ModelWrapper
                        width={300}
                        height={400}
                        anchorEl={profileIconRef.current}
                        position="bottom-left"
                        onClose={() => setShowProfile(false)}
                    >
                        {/* Your profile modal content */}
                        <MiniProfileView />
                    </ModelWrapper>
                )}
            </div>
        </div>
    )
};

export default AppHeader;