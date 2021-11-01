import React from 'react';
import {Link, Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Layout, Menu, Typography } from 'antd';
import * as Navigation from './navigatoin';
import './App.css';
import Home from './Home';
import Encrypt from './Encrypt';
import Decrypt from './Decrypt';



const App:React.FC = () => {
  const location = useLocation();
  const title = "Inconspicuous Encryption";

  return (
    <>
        <Layout className="App" style={{ height: "100%" }}>
          <Layout.Sider 
            style={{ 
              background:"#11274c",
            }}>
            <Typography style={{width:"110%"}}>

              <Typography.Title
                level={4}
                style={{
                    margin: 25,
                    color:"white",
                    background:"#11274c",
                    fontSize:"x-large",
                  }}
                >
                {title}
              </Typography.Title>
            </Typography>
            <Menu
              mode="inline"
              selectedKeys={selectedMenuKeys(location.pathname)}
              style={{
                background:"#11274c",
                minHeight: "90vh",
                width:"100.5%"
              }}
            >
              <Menu.Item
                key={Navigation.HOME}
                className="customclass"
              >
                <Link 
                  to={Navigation.HOME}
                  style={{color:"white", fontSize:"large"}}
                >
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item
                key={Navigation.ENCRYPT}
                className="customclass"
              >
                <Link
                  to={Navigation.ENCRYPT}
                  style={{color:"white", fontSize:"large"}}
                >
                  Encrypt
                </Link>
              </Menu.Item>
              <Menu.Item
                key={Navigation.DECRYPT}
                className="customclass"
              >
                <Link 
                  to={Navigation.DECRYPT}
                  style={{color:"white", fontSize:"large"}}
                >
                  Decrypt
                </Link>
              </Menu.Item>
            </Menu>
          </Layout.Sider>
          <div className="main-content">
            <Switch>
              <Route
                path={Navigation.HOME}
                component={Home}
              />
              <Route
                path={Navigation.ENCRYPT}
                component={Encrypt}
              />
              <Route
                path={Navigation.DECRYPT}
                component={Decrypt}
              />
              <Redirect
                from="/"
                to={Navigation.HOME}
              />
            </Switch>
          </div>
        </Layout>
    </>
  );
}

function selectedMenuKeys(pathname: string): string[] {
  if (pathname.startsWith(Navigation.HOME)) {
    return [Navigation.HOME];
  }
  if (pathname.startsWith(Navigation.ENCRYPT)) {
    return [Navigation.ENCRYPT];
  }
  if (pathname.startsWith(Navigation.DECRYPT)) {
    return [Navigation.DECRYPT];
  }
  return [];
}

export default App;
