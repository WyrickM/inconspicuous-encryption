import { Alert, Card, Col, Empty, PageHeader, Row } from "antd";
import * as React from "react";
import './App.css';

const Home = () => {

    return (
        <>
            <PageHeader title="Home">
                <Alert
                    message="Caution!"
                    description={
                        <div>
                            This is a test
                        </div>
                    }               
                />
            </PageHeader>
        </>
    );
};

export default Home;
