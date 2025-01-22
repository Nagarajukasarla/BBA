import {
    EditOutlined,
    LoadingOutlined,
    LogoutOutlined,
    PlusOutlined,
    UserOutlined
} from '@ant-design/icons';
import {
    Button,
    Card,
    message,
    Modal,
    Typography,
    Upload,
    UploadProps
} from 'antd';
import React, { useState } from 'react';
import '../../assets/css/miniProfileView.css';
import useShopState from '../../states/useUserState';

const MiniProfileView: React.FC = () => {

    // States
    const { liteShop } = useShopState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    // Constants for file validation
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const MAX_FILE_SIZE_MB = 2;

    /**
     * Converts file to base64 string for preview
     */
    const getBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    /**
     * Validates file type and size before upload
     */
    const beforeUpload = (file: File): boolean => {
        // Check file type
        const isAllowedType = ALLOWED_FILE_TYPES.includes(file.type);
        if (!isAllowedType) {
            message.error('You can only upload JPG/PNG/WEBP files!');
            return false;
        }

        // Check file size
        const isLessThan2MB = file.size / 1024 / 1024 < MAX_FILE_SIZE_MB;
        if (!isLessThan2MB) {
            message.error(`Image must be smaller than ${MAX_FILE_SIZE_MB}MB!`);
            return false;
        }

        return true;
    };

    /**
     * Handles file change event from Upload component
     */
    const handleChange: UploadProps['onChange'] = async (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            // Get base64 URL for preview
            try {
                const url = await getBase64(info.file.originFileObj as File);
                setImageUrl(url);
                setLoading(false);
            } catch (error) {
                message.error('Error processing image');
                setLoading(false);
            }
        }
    };

    /**
     * Modal control handlers
     */
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => {
        setIsModalOpen(false);
        setImageUrl(undefined);
        setLoading(false);
    };

    /**
     * Handles the final upload action when user clicks Upload button
     */
    const handleUpload = async () => {
        if (!imageUrl) {
            message.error('Please select an image first');
            return;
        }

        try {
            // TODO: Implement actual API call to upload image
            // const response = await uploadImageToServer(imageUrl);
            console.log('Image ready for upload:', imageUrl);

            message.success('Profile picture updated successfully');
            handleCancel(); // Close modal after successful upload
        } catch (error) {
            message.error('Failed to update profile picture');
        }
    };

    /**
     * Render upload button inside Upload component
     */
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <div className='mini-profile-view'>
            <div className='profile-pic'>
                {liteShop?.image && <img src={liteShop.image} width={100} height={100} alt='profile-pic' />}
                {!liteShop?.image && <UserOutlined className='default-icon' />}
                <div className='edit-icon' onClick={showModal}>
                    <EditOutlined />
                </div>
            </div>
            <Typography.Text className='profile-name'>{liteShop?.name || ''}</Typography.Text>
            <Card className='card card-1'></Card>
            <Card className='card card-2'></Card>
            <Card className='card card-3'></Card>
            <Button className='logout-button'>
                Logout
                <LogoutOutlined />
            </Button>

            {/* Profile Picture Upload Modal */}
            <Modal
                title="Update Profile Picture"
                open={isModalOpen}
                okText="Upload"
                onOk={handleUpload}
                onCancel={handleCancel}
                okButtonProps={{ disabled: !imageUrl }}
            >
                <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188" // Temporary URL for handling upload status
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="avatar"
                            style={{ width: '100%', borderRadius: '50%' }}
                        />
                    ) : (
                        uploadButton
                    )}
                </Upload>
            </Modal>
        </div>
    );
};

export default MiniProfileView;