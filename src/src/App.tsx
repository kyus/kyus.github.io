import React, { useState, useEffect, FC, useCallback } from "react";
import { Layout, Menu, Switch as AntSwitch } from "antd";
import "./App.scss";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import _ from "lodash";
import classNames from "classnames";
import { mainMenu } from "./config/menu";
import {
  BrowserRouter,
  Route,
  RouteComponentProps,
  withRouter,
  Switch,
} from "react-router-dom";
import { Main, About, Post, ErrorPage } from "./components";
import { getIcon } from "./lib/utils";
import { nightIcon, sunIcon } from "./lib/svgIcons";
import SideMenu from "./SideMenu";

interface matchProps {
  category: string;
  postNumber: string;
}
function App(props: RouteComponentProps<matchProps>) {
  const { history, location } = props;
  const [viewSide, setViewSide] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("0");
  const [selectedSideMenu, setSelectedSideMenu] = useState("0");
  const { Header, Content, Footer } = Layout;
  const { pathname } = location;
  const pathnameArr: string[] = pathname.split("/");

  const changeTheme = (): void => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", darkMode ? "lightMode" : "darkMode");
  };

  const toggleSideBar = (): void => {
    setViewSide(!viewSide);
    localStorage.setItem("sideBar", viewSide ? "closed" : "opened");
  };

  const GetMainMenu: FC = () => {
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

  const initialize = useCallback((): void => {
    const theme = localStorage.getItem("theme");
    const sideBar = localStorage.getItem("sideBar");
    if (theme === "darkMode") {
      changeTheme();
    }
    if (sideBar && sideBar === "opened") {
      toggleSideBar();
    }
  }, []);

  const _setSelectedMenu = useCallback(
    (k: number, pathnameArr: string[], link: string[]): void => {
      if (k.toString() !== selectedMenu && pathnameArr[1] === link[1]) {
        setSelectedMenu(k.toString());
      }
    },
    [selectedMenu]
  );

  useEffect(initialize, [initialize]);

  useEffect(() => {
    _.map(mainMenu, (m, k) => {
      const link: string[] = m.link.split("/");
      _setSelectedMenu(k, pathnameArr, link);
      if (selectedSideMenu !== "0" && pathname === m.link) {
        setSelectedSideMenu("0");
      }
    });
  }, [pathname, selectedSideMenu, _setSelectedMenu, pathnameArr]);

  const sideMenuProps = {
    darkMode,
    viewSide,
    selectedSideMenu,
    setSelectedSideMenu,
    toggleSideBar,
    ...props,
  };

  return (
    <div className={classNames("App", { darkMode })}>
      <Layout style={{ minHeight: "100vh" }}>
        <SideMenu {...sideMenuProps} />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GetMainMenu />
            <div className={"toggleTheme"}>
              <AntSwitch
                autoFocus
                checked={darkMode}
                onChange={changeTheme}
                checkedChildren={nightIcon(14, 14)}
                unCheckedChildren={sunIcon(14, 14)}
              />
            </div>
          </Header>
          <div id={"main-banner"} />
          <Content className={"content-wrapper"}>
            <Switch>
              <Route path={"/post/:category/:postNumber"} component={Post} />
              <Route path={"/post/:category/"} component={Post} />
              <Route path={"/about"} component={About} />
              <Route path={"/main"} component={Main} />
              <Route path={"/"} exact component={Main} />
              <Route path={"*"} component={ErrorPage} />
            </Switch>
          </Content>
          <Footer>
            <div>Copyright 2021. kyus.All rights reserved.</div>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default withRouter(App);
