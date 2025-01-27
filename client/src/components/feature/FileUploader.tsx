import React, { useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Flex, Image, message, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";

interface FileUploaderProps {
    onFileChange: (file: RcFile | null) => void;
    loading?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileChange, loading }) => {
    const [previewImage, setPreviewImage] = useState<string | undefined>();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const getBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const beforeUpload = (file: RcFile) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image must be smaller than 2MB!");
            return false;
        }
        return true;
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as File);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps["onChange"] = ({ file, fileList: newFileList }) => {
        if (file.status === 'removed') {
            setFileList([]);
            onFileChange(null);
            return;
        }

        if (file.originFileObj) {
            setFileList(newFileList.slice(-1));
            onFileChange(file.originFileObj as RcFile);
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <Flex align="start" gap="middle" style={{ width: "100%" }}>
            <Upload
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                maxCount={1}
                accept="image/jpeg,image/png"
                customRequest={({ onSuccess }) => {
                    if (onSuccess) onSuccess("ok");
                }}
            >
                {fileList.length === 0 && uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    style={{ display: "none" }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                    }}
                    src={previewImage}
                />
            )}
        </Flex>
    );
};

export default FileUploader;
