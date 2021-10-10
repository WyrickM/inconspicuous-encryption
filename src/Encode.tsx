import { Button, Card, Form, Input, message, PageHeader, Typography, Upload } from "antd";
import * as React from "react";
import { InboxOutlined } from '@ant-design/icons';


const {Dragger} = Upload
const {Title} = Typography

const Encrypt:React.FC = () => {

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
                message.success(`${info.file.name} file upload failed.`);
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
                    <Title style={{fontSize: "50px"}}>
                        Encrypt
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
                    This page is where you will encrypt a message inside a picture so you can inconspicuosly hide
                    a secret message. What seems to be an identical image of the one that was uploaded will be downloaded
                    to your machine, but with your secret message. Then you can send your message securely no matter how you send messages.
                </div>
                <Card>
                    <Form>
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

                        <Form.Item
                            label="Message"
                            name="message"
                            style={{paddingTop: 15}}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Button type="primary">Encrypt</Button>
                    </Form>
                </Card>
            </PageHeader>
        </>
    );
};

export default Encrypt;
