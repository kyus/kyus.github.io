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
  GithubOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import _ from "lodash";
import { mainMenu, subMenu, categoryMenu } from "./config/menu";
import { RouteComponentProps } from "react-router-dom";
import { Main, About, Post } from "./component";

interface postingProps {
  category?: string | undefined;
  postNumber?: string | undefined;
}

function App(props: RouteComponentProps<postingProps>) {
  const { history, location, match } = props;
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

  const getIcon = (type: string) => {
    switch (type) {
      case "main":
        return <AreaChartOutlined />;
      case "about":
        return <AliwangwangOutlined />;
      case "twitter":
        return <TwitterOutlined />;
      case "qq":
        return <QqOutlined />;
      case "comment":
        return <CommentOutlined />;
      default:
        return <GithubOutlined />;
    }
  };

  const getMainMenu = () => {
    return _.map(mainMenu, (m, k) => {
      return (
        <Menu.Item
          key={k}
          onClick={() => history.push(m.link)}
          icon={getIcon(m.icon)}
        >
          {m.name}
        </Menu.Item>
      );
    });
  };

  const getSideMenu = (): Array<{
    name: string;
    icon: string;
    link: string;
  }> => {
    type menuStructure = { [subLink: string]: Array<any> };
    const menu: menuStructure = subMenu;

    const { pathname } = location;
    const subLink = _.get(pathname.split("/"), `${1}`, "main");
    const key: string = subLink ? subLink : "main";
    return key === "post" ? categoryMenu : menu[key];
  };

  const getContent = () => {
    const { pathname } = location;
    switch (true) {
      case /^\/about/.test(pathname):
        return <About />;
      case /^\/post/.test(pathname):
        return <Post {...props} />;
      default:
        return <Main {...props} />;
    }
  };

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

  const sideMenu = getSideMenu();

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
            {_.map(sideMenu, (m, k) => {
              return (
                <Menu.Item
                  key={k}
                  icon={getIcon(m.icon)}
                  onClick={() => history.push(m.link)}
                >
                  {m.name}
                </Menu.Item>
              );
            })}
            <Menu.Item icon={<LinkOutlined />}>
              <Button type={"primary"}>
                <a
                  className="App-link"
                  href="https://github.com/kyus"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
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
              {getMainMenu()}
              <Menu.Item
                icon={
                  darkMode ? <AliwangwangOutlined /> : <AliwangwangFilled />
                }
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
