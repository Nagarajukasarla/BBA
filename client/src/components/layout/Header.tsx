import { UserOutlined } from "@ant-design/icons";
import { Card } from "antd";
import '../../assets/css/appHeader.css';
import logo from "../../assets/img/logo.jpg";
import { IconSize } from "../../constants/styles";
import { useState, useRef } from 'react';
import ModelWrapper from '../common/ModelWrapper';

const AppHeader: React.FC = () => {
    const [showProfile, setShowProfile] = useState(false);
    const profileIconRef = useRef<HTMLDivElement>(null);

    const profileStyles = {
        fontSize: IconSize.DEFAULT,
    }

    return (
        <div className="app-header">
            <div className="header-title">
                <img src={logo} alt="logo" className="logo" />
            </div>
            <div className="functional">
                <Card
                    className="mini-profile"
                    bordered={false}
                    ref={profileIconRef}
                    onClick={() => setShowProfile(!showProfile)}
                >
                    <UserOutlined style={profileStyles} />
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
                        <h3>Profile Content</h3>
                    </ModelWrapper>
                )}
            </div>
        </div>
    )
};

export default AppHeader;