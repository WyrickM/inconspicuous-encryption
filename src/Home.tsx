import { PageHeader, Typography } from "antd";
import * as React from "react";
import './App.css';

const { Title } = Typography;

const Home:React.FC = () => {

    return (
        <>
            <PageHeader
                title={<Title style={{fontSize:"50px"}}>Home</Title>}
            >
                <div style={{fontSize:"25px"}}>
                    <p>
                        Welcome to Inconspicuous Encryption!
                    </p>
                    <p>
                        Inconspicuous Encryption is all about hiding in plain sight. With this application
                        you will be able to hide in plain sight. The ecryption process is called steganography.
                        It is the process of hiding information in objects without altering or changing the object 
                        to the naked eye. With steganography you are able to encrypt and decrypt messages in pictures,
                        videos, and audio. An advantage that steganography has over other encryption processes is that 
                        other encryption processes tend to show an attacker that this message is encrypted, but with steganography 
                        the information that there contains an encrypted message will be hidden to the naked eye of an attacker.
                        The first recorded use of steganography was in 1499 by Johannes Trithemius, where Johannes 
                        disguised a treatise on cryptography and steganography in a book about magic. The book was not published until
                        1606.
                    </p>
                    <p>
                        With Inconspicuous Encryption you will be encrypting and decrypting messages in images. Specifically 
                        .jpg, .png, and .pdf images. 
                    </p>
                    <p>
                        It is important to note that if someone really wanted to know your secret message that you are sending
                        or receiving it is still possible for them to read the plain text message. They would first have to be able
                        to intercept the message. Then they would need to know that the image you are sending/receiving has an
                        encrypted message. And finally would have to use the Inconspicuous Encryption application which is open to the
                        public to decrypt it. The likelihood that all of this would happen is very low but still possible.
                    </p>
                </div>
            </PageHeader>
        </>
    );
};

export default Home;
