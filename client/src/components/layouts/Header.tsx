import { UserOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import '@/assets/styles/appHeader.css'
import { useState, useRef } from 'react'
import ModelWrapper from '@/components/core/ModelWrapper'
import MiniProfileView from '@/components/features/MiniProfileView'

const AppHeader: React.FC = () => {
    const [showProfile, setShowProfile] = useState(false);
    const profileIconRef = useRef<HTMLDivElement>(null);

    return (
        <div className="app-header">
            <Card
                className="mini-profile-bubble"
                bordered={false}
                ref={profileIconRef}
                onClick={() => setShowProfile(!showProfile)}
            >
                <UserOutlined className="profile-icon" />
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
    )
}

export default AppHeader
