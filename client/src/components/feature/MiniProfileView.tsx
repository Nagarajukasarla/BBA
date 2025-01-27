import React, { useState } from "react";
import { Button, Card, Modal, Typography, message } from "antd";
import { EditOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import FileUploader from "../feature/FileUploader";
import useShopState from "../../states/useUserState";
import "../../assets/css/miniProfileView.css";
import { RcFile } from "antd/es/upload";

const MiniProfileView: React.FC = () => {
    const { liteShop } = useShopState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedFile(null); // Reset selected file when closing modal
    };

    const handleFileChange = (file: RcFile | null) => {
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            message.error("Please select an image first");
            return;
        }

        try {
            setIsUploading(true);
            // Simulate API call to upload the file
            console.log("Uploading file:", selectedFile);

            message.success("Profile picture updated successfully");
            setIsModalOpen(false); // Close modal after successful upload
            setSelectedFile(null); // Reset selected file after successful upload
        } catch (error) {
            message.error("Failed to update profile picture");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="mini-profile-view">
            <div className="profile-pic">
                {liteShop?.image && (
                    <img
                        src={liteShop.image}
                        width={100}
                        height={100}
                        alt="profile-pic"
                    />
                )}
                {!liteShop?.image && <UserOutlined className="default-icon" />}
                <div className="edit-icon" onClick={showModal}>
                    <EditOutlined />
                </div>
            </div>
            <Typography.Text className="profile-name">
                {liteShop?.name || ""}
            </Typography.Text>
            <Card className="card card-1"></Card>
            <Card className="card card-2"></Card>
            <Card className="card card-3"></Card>
            <Button className="logout-button">
                Logout
                <LogoutOutlined />
            </Button>

            <Modal
                title="Update Avatar"
                open={isModalOpen}
                okText="Upload"
                onOk={handleUpload}
                onCancel={handleCancel}
                confirmLoading={isUploading}
                okButtonProps={{ disabled: !selectedFile }}
            >
                <FileUploader onFileChange={handleFileChange} loading={isUploading}/>
            </Modal>
        </div>
    );
};

export default MiniProfileView;
