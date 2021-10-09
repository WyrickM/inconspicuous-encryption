import React, { FC } from 'react';
import {Link, Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Layout, Menu, Typography } from 'antd';
import * as Navigation from './navigatoin';
import './App.css';



const App = () => {
  const location = useLocation();
  const title = "Inconspicuous Encryption";

  return (
    <>
        <Layout className="App" style={{ height: "100%" }}>
          <Layout.Sider>
            <Typography.Title level={4} style={{margin: 23, color:"white"}}>
              {title}
            </Typography.Title>
            <Menu className="App-navigation" mode="inline" selectedKeys={selectedMenuKeys(location.pathname)}>
              <Menu.Item
                key={Navigation.HOME}
              >
                <Link to={Navigation.HOME}>
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item
                key={Navigation.ENCRYPT}
              >
                <Link to={Navigation.ENCRYPT}>
                  Encrypt
                </Link>
              </Menu.Item>
              <Menu.Item
                key={Navigation.DECRYPT}
                style={{}}
              >
                <Link to={Navigation.DECRYPT}>
                  Decrypt
                </Link>
              </Menu.Item>

            </Menu>
          </Layout.Sider>
        </Layout>
    </>
  );
}

function selectedMenuKeys(pathname: string): string[] {
  return [];
}

export default App;
