import React, { useState } from "react";
import logo from "./logo.svg";
import { Layout, Menu, Button } from "antd";
import "./App.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TwitterOutlined,
  QqOutlined,
} from "@ant-design/icons";

function App() {
  const [viewSide, setViewSide] = useState(false);
  const { Header, Content, Sider, Footer } = Layout;

  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        {viewSide && (
          <Sider>
            <div style={{ width: "100%" }}>
              <img
                src={logo}
                className="App-logo"
                alt="logo"
                style={{ width: "100%" }}
              />
            </div>
            <Menu theme={"dark"}>
              <Menu.Item>
                <TwitterOutlined />
                side1
              </Menu.Item>
              <Menu.Item>
                <QqOutlined />
                side2
              </Menu.Item>
              <Menu.Item>
                <Button type={"primary"}>
                  <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn React
                  </a>
                </Button>
              </Menu.Item>
            </Menu>
          </Sider>
        )}
        <Layout>
          <Header>
            <Menu theme={"dark"} mode={"horizontal"}>
              <Menu.Item onClick={() => setViewSide(!viewSide)}>
                <div>
                  {viewSide ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                </div>
              </Menu.Item>
              <Menu.Item>frist</Menu.Item>
              <Menu.Item>second</Menu.Item>
              <Menu.Item>third</Menu.Item>
            </Menu>
          </Header>
          <Content>content layer</Content>
          <Footer>this is footer</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
