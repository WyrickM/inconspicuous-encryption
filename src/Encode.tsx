import { Button, Card, Form, Input, message, PageHeader, Upload } from "antd";
import * as React from "react";
import { InboxOutlined } from '@ant-design/icons';
import { info } from "console";
import { resolve } from "path";
import { rejects } from "assert";
import { file } from "@babel/types";

const {Dragger} = Upload

const Encrypt = () => {

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
            <PageHeader title="Encrypt" className="main-content">
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
                            <Input />
                        </Form.Item>
                        <Button type="primary">Encrypt</Button>
                    </Form>
                </Card>
            </PageHeader>
        </>
    );
};

export default Encrypt;
