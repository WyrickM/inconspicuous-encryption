import * as React from "react";
import { Button, Card, Form, Input, message, PageHeader, Typography, Upload } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { encryptMessage } from "./EncryptDecrypt";


const { Dragger } = Upload
const { Title } = Typography

interface EncryptFormData {
    image: File;
    message: string;
}


const Encrypt: React.FC = () => {
    const [formData, setFormData] = React.useState<EncryptFormData | undefined>(undefined);

    const onFinish = (items: EncryptFormData) => {
        setFormData(items);
        encrypt();
    }

    const onChange = (info: any) => {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file upload failed.`);
        }
    };

    const onDrop = (e: any) => {
        console.log('Dropped files', e.dataTransfer.files);
    };

    const onPreview = async (file: any) => {
        let src = file.url;
        if (!src) {
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

    const encrypt = async () => {

        if (formData !== undefined) {
            const r = await encryptMessage(
                formData.image,
                formData.message
            );
            if (r.status >= 400) {
                const text = await r.text();
                message.error(`Encrypting the image failed: ${text}`);
            }
            else {
                message.success("Encryting the image succeeded!");
            }
        }
    };

    React.useEffect(() => {
        onFinish(formData!);
    }, [formData]);


    return (
        <>
            <PageHeader
                title={
                    <Title style={{ fontSize: "50px" }}>
                        Encrypt
                    </Title>
                }
                className="main-content"
            >
                <div
                    style={{
                        fontSize: "25px",
                        paddingBottom: 15
                    }}
                >
                    This page is where you will encrypt a message inside a picture so you can inconspicuosly hide
                    a secret message. What seems to be an identical image of the one that was uploaded will be downloaded
                    to your machine, but with your secret message. Then you can send your message securely any way you desire.
                    <br />
                    <br />
                    NOTE: The new image will be saved as a PNG file type no matter the given image type. This is because JPG files
                    are lossy formats. And it is important to not lose any bits since they hold the secret message.
                </div>

                <Card>
                    <Form onFinish={(items) => { onFinish(items) }}>
                        <Form.Item name="image" required={true}>
                            <Dragger
                                name='file'
                                accept=".jpg, .png"
                                listType="picture"
                                maxCount={1}
                                onChange={(e) => { onChange(e); }}
                                onDrop={(e) => { onDrop(e); }}
                                onPreview={(file) => { onPreview(file); }}
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

                        <Form.Item
                            label="Message"
                            name="message"
                            required={true}
                            style={{ paddingTop: 15 }}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item name="button">
                            <Button type="primary" htmlType="submit">Encrypt</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </PageHeader>
        </>
    );
};

export default Encrypt;
