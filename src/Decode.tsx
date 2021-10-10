import { Button, Card, Form, Input, message, PageHeader, Upload } from "antd";
import * as React from "react";
import { InboxOutlined } from '@ant-design/icons';
import { info } from "console";
import { resolve } from "path";
import { rejects } from "assert";
import { file } from "@babel/types";

const {Dragger} = Upload

const Decrypt = () => {

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
            <PageHeader title="Decrypt" className="main-content">
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
