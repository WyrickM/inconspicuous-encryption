import { Button, Card, Form, Input, message, PageHeader, Typography, Upload } from "antd";
import * as React from "react";
import { InboxOutlined } from '@ant-design/icons';

const {Dragger} = Upload
const {Title} = Typography

const Decrypt:React.FC = () => {

    const props = {
        name: 'file',
        multiple: false,
        previewVisible: true,
        onChange(info: any) {
            const {status} = info.file;
            if(status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if(status === 'done')
            {
                message.success('${info.file.name} file upload failed.');
            }
        },
        onDrop(e: any) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <>
            <PageHeader
                title= {
                    <Title style= {{ fontSize: "50px" }}>
                        Decrypt
                    </Title>
                }
                className="main-content"
            >
                <div 
                    style={{
                        fontSize: "25px",
                        paddingBottom:15
                    }}
                >
                    Descritpion
                </div>
                <Card>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag image to this area to upload.
                        </p>
                        <p className="ant-upload-hint">
                            Support for a single upload. Supported files include .png, .jpg, or .pdf
                        </p>
                    </Dragger>
                    <div
                        style={{paddingTop: 15}}
                    >
                    <Button 
                        type="primary"
                    >
                        Decrypt
                    </Button>
                    </div>
                </Card>
            </PageHeader>
        </>
    );
};

export default Decrypt;
