import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import Cat from "./cat";
import { Layout, Menu, Button } from "antd";
import "./App.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TwitterOutlined,
  QqOutlined,
  AreaChartOutlined,
  AliwangwangOutlined,
  AliwangwangFilled,
  LinkOutlined,
  SmileFilled,
  WomanOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import {RouteComponentProps} from "react-router-dom";
import {Main, About, Post} from "./component";

interface postingProps {
  category?:string|undefined,
  postNumber?:string|undefined
}

function App(props:RouteComponentProps<postingProps>) {
  const {history, location, match} = props;
  console.log('props', match);
  const [viewSide, setViewSide] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const { Header, Content, Sider, Footer } = Layout;

  const changeTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", darkMode ? "lightMode" : "darkMode");
  };

  const toggleSideBar = () => {
    setViewSide(!viewSide);
    localStorage.setItem("sideBar", viewSide ? "closed" : "opened");
  };

  const getContent = () => {
    const {pathname} = location;
    switch(true) {
      case /^\/about/.test(pathname): return <About />;
      case /^\/post/.test(pathname): return <Post {...props} />;
      default: return <Main {...props} />;
    }
  }

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const sideBar = localStorage.getItem("sideBar");
    if (theme === "darkMode") {
      changeTheme();
    }
    if (sideBar && sideBar !== "opened") {
      toggleSideBar();
    }
  }, []);

  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          theme={darkMode ? "dark" : "light"}
          breakpoint={"xs"}
          hidden={!viewSide}
        >
          <Menu theme={darkMode ? "dark" : "light"}>
            <div className={classNames({ darkMode })} style={{ padding: 20 }}>
              {<Cat />}
            </div>
            <Menu.Item icon={<TwitterOutlined />}>side1</Menu.Item>
            <Menu.Item icon={<QqOutlined />}>side2</Menu.Item>
            <Menu.Item icon={<LinkOutlined />}>
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
            <Menu.Item icon={<MenuUnfoldOutlined />} onClick={toggleSideBar}>
              hide menu
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }}>
            <Menu theme={darkMode ? "dark" : "light"} mode={"horizontal"}>
              <Menu.Item onClick={toggleSideBar}>
                <div>
                  {viewSide ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                </div>
              </Menu.Item>
              <Menu.Item icon={<AreaChartOutlined />} onClick={() => history.push('/')}>main</Menu.Item>
              <Menu.Item icon={<AliwangwangOutlined />} onClick={() => history.push('/about')}>About</Menu.Item>
              <Menu.Item icon={<WomanOutlined />} onClick={() => {history.push('/post/all/0')}}>Post</Menu.Item>
              <Menu.Item
                icon={darkMode ? <SmileFilled /> : <AliwangwangFilled />}
                onClick={changeTheme}
              >
                {darkMode ? "lightMode" : "darkMode"}
              </Menu.Item>
            </Menu>
          </Header>
          <Content>{getContent()}</Content>
          <Footer>
            <div>Copyright 2021. kyus.All rights reserved.</div>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
