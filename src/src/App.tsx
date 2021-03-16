import React, { useState, useEffect, FC } from "react";
import { Layout, Menu, Switch } from "antd";
import "./App.scss";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import _ from "lodash";
import { mainMenu } from "./config/menu";
import { RouteComponentProps } from "react-router-dom";
import { Main, About, Post } from "./components";
import { getIcon } from "./lib/utils";
import { nightIcon, sunIcon } from "./lib/svgIcons";
import SideMenu from "./SideMenu";

interface postingProps {
  category?: string | undefined;
  postNumber?: string | undefined;
}
function App(props: RouteComponentProps<postingProps>) {
  const { history, location } = props;
  const [viewSide, setViewSide] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("0");
  const [selectedSideMenu, setSelectedSideMenu] = useState("0");
  const { Header, Content, Footer } = Layout;
  const { pathname } = location;

  const changeTheme = (): void => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", darkMode ? "lightMode" : "darkMode");
  };

  const toggleSideBar = (): void => {
    setViewSide(!viewSide);
    localStorage.setItem("sideBar", viewSide ? "closed" : "opened");
  };

  const GetMainMenu: FC = () => {
    const _setSelectedMenu = (
      k: number,
      pathnameArr: string[],
      link: string[]
    ): void => {
      if (k.toString() !== selectedMenu && pathnameArr[1] === link[1]) {
        setSelectedMenu(k.toString());
      }
    };
    const pathnameArr: string[] = pathname.split("/");

    return (
      <Menu
        theme={darkMode ? "dark" : "light"}
        mode={"horizontal"}
        selectedKeys={[selectedMenu]}
      >
        <Menu.Item onClick={toggleSideBar}>
          <div>{viewSide ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}</div>
        </Menu.Item>
        {_.map(mainMenu, (m, k) => {
          const link: string[] = m.link.split("/");
          _setSelectedMenu(k, pathnameArr, link);
          return (
            <Menu.Item
              key={k}
              onClick={() => history.push(m.link)}
              icon={getIcon(m.icon)}
            >
              {m.name}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  };

  const GetContents: FC = () => {
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
    if (sideBar && sideBar === "opened") {
      toggleSideBar();
    }
  }, []);

  useEffect(() => {
    _.map(mainMenu, (m) => {
      if (selectedSideMenu !== "0" && pathname === m.link) {
        setSelectedSideMenu("0");
      }
    });
  }, [pathname, selectedSideMenu]);

  const sideMenuProps = {
    darkMode,
    viewSide,
    selectedSideMenu,
    setSelectedSideMenu,
    toggleSideBar,
    ...props,
  };

  return (
    <div className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <SideMenu {...sideMenuProps} />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GetMainMenu />
            <div className={"toggleTheme"}>
              <Switch
                autoFocus
                checked={darkMode}
                onChange={changeTheme}
                checkedChildren={nightIcon(14, 14)}
                unCheckedChildren={sunIcon(14, 14)}
              />
            </div>
          </Header>
          <Content>
            <GetContents />
          </Content>
          <Footer>
            <div>Copyright 2021. kyus.All rights reserved.</div>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
