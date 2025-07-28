import "@/assets/styles/modelWrapper.css";
import { CloseCircleOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React, { useEffect } from 'react';

interface ModelWrapperProps {
    children?: React.ReactNode;
    width?: number;
    height?: number;
    anchorEl?: HTMLElement | null;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    onClose?: () => void;
}

const ModelWrapper: React.FC<ModelWrapperProps> = (props) => {
    const { children, width, height, anchorEl, position = 'bottom-right', onClose } = props;
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            
            // Check if the click is within any of these Ant Design components
            const isModalClick = target.closest('.ant-modal, .ant-modal-root');
            const isImagePreviewClick = target.closest(
                '.ant-image-preview-root, ' + 
                '.ant-image-preview-wrap, ' + 
                '.ant-image-preview-mask, ' +
                '.ant-image-preview-close, ' +
                '.ant-image-preview-operations'
            );
            
            if (wrapperRef.current && 
                !wrapperRef.current.contains(event.target as Node) && 
                !isModalClick &&
                !isImagePreviewClick && 
                onClose) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const getPosition = (): React.CSSProperties => {
        if (!anchorEl) return {};

        const rect = anchorEl.getBoundingClientRect();
        const positions: Record<string, React.CSSProperties> = {
            'top-left': {
                top: rect.top - (height ?? 600),
                left: rect.left - (width ?? 500)
            },
            'top-right': {
                top: rect.top - (height ?? 600),
                left: rect.left
            },
            'bottom-left': {
                top: rect.bottom,
                left: rect.left - (width ?? 500)
            },
            'bottom-right': {
                top: rect.bottom,
                left: rect.left
            }
        };

        return positions[position];
    };

    const modelStyles: React.CSSProperties = {
        width: width ?? 500,
        height: height ?? 600,
        position: 'fixed',
        ...getPosition(),
        zIndex: 1000,
    };

    return (
        <div className="model-wrapper" style={modelStyles} ref={wrapperRef}>
            <Col>
                <Row justify="end">
                    <CloseCircleOutlined className="close-icon"  onClick={onClose} />
                </Row>
                {children ?? <h2>Failed to Load.. Dev only</h2>}
            </Col>
        </div>
    );
};

export default ModelWrapper;