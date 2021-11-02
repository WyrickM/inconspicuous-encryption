import { Button, Card, Form, message, PageHeader, Typography, Upload } from "antd";
import * as React from "react";
import { InboxOutlined } from '@ant-design/icons';
import {decryptMessage} from "./EncryptDecrypt";


const {Dragger} = Upload
const {Title} = Typography

interface DecryptFormData {
    image: File;
}

const Decrypt:React.FC = () => {

    const [formData, setFormData] = React.useState<DecryptFormData | undefined>(undefined);
    const [decryptedMessage, setDecryptedMessage] = React.useState<string | undefined>(undefined);

    const onFinish = (items: DecryptFormData) => {
        setFormData(items);
        decrypt();
    }

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

    const decrypt = async () => {
        if(formData !== undefined)
        {
            const r = await decryptMessage(
                formData.image
            );
            if(r.status >= 400) {
                const text = await r.text();
                message.error(`Decrypting the image failed: ${text}`);
            }
            else {
                const json = await r.json();
                setDecryptedMessage(json.decryptedMessage)
                message.success("Decrypting the image succeeded!");
            }
        }
    }


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
                    <br/>
                    <br/>
                    NOTE: It is important to only try to decrypt messages that were encrypted using the Inconspicuous Encryption encryption algorithm.
                    If the image has a secret message from a different steganography application it may not produce the proper message.
                </div>
                <Card>
                    <Form
                        onFinish={(items) => {onFinish(items)}}
                    >
                        <Form.Item name="image" required={true}>
                            <Dragger 
                                name= 'file'
                                accept=".jpg, .png"
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
                                    Support for a single upload. Supported files include .png or .jpg
                                </p>
                            </Dragger>
                        </Form.Item>
                        <Form.Item>
                            <Button 
                                type="primary"
                                htmlType="submit"
                            >
                                Decrypt
                            </Button>
                        </Form.Item>
                    </Form>
                    {decryptedMessage ? (
                        <div>
                            <p>
                            The decrypted message is:
                            </p>
                            <p>
                                {decryptedMessage}
                            </p>
                        </div>
                        
                    ): null}
                </Card>
            </PageHeader>
        </>
    );
};

export default Decrypt;
