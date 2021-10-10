import { Alert, Card, Col, Empty, PageHeader, Typography } from "antd";
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
                        This is a test.
                    </p>
                </div>
            </PageHeader>
        </>
    );
};

export default Home;
