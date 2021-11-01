import { Button, Card, message, PageHeader, Typography, Upload } from "antd";
import * as React from "react";
import { InboxOutlined } from '@ant-design/icons';

const {Dragger} = Upload
const {Title} = Typography

const Decrypt:React.FC = () => {

    const onChange = (info: any) => {
        const {status} = info.file;
        if(status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if(status === 'done')
        {
            message.success(`${info.file.name} file upload failed.`);
        }
    };

    const onDrop = (e: any) => {
        console.log('Dropped files', e.dataTransfer.files);
    };

    const onPreview = async (file: any) => {
        let src = file.url;
        if(!src){
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
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
                    This page is where you will decrypt a message that is inside a picture so you can inconspicuosly hide
                    a secret message. The after uploading an image, if there is an encrypted message that was encrypted with
                    the Inconspicuous Encryption encryption algorithm the message will appear below.
                </div>
                <Card>
                    <Dragger 
                        name= 'file'
                        accept=".jpg, .png, .pdf"
                        listType="picture"
                        maxCount={1}
                        onChange={(e) => {onChange(e);}}
                        onDrop={(e) => {onDrop(e);}}
                        onPreview={(file) => {onPreview(file);}}
                    >
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
