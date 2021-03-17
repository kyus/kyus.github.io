import { RouteComponentProps } from "react-router-dom";
import { Button, Layout, Menu } from "antd";
import { categoryMenu, subMenu } from "./config/menu";
import _ from "lodash";
import classNames from "classnames";
import Cat from "./cat";
import { getIcon } from "./lib/utils";
import { LinkOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import React, { Dispatch, useEffect } from "react";

interface sideMenuProps extends RouteComponentProps {
  darkMode: boolean;
  viewSide: boolean;
  selectedSideMenu: string;
  setSelectedSideMenu: Dispatch<string>;
  toggleSideBar: () => void;
}
function SideMenu(props: sideMenuProps) {
  const { Sider } = Layout;
  const {
    location,
    history,
    darkMode,
    viewSide,
    selectedSideMenu,
    setSelectedSideMenu,
    toggleSideBar,
  } = props;
  const { pathname } = location;

  interface ISideMenu {
    name: string;
    icon: string;
    link: string;
  }
  const getSideMenu = (): ISideMenu[] => {
    type menuStructure = {
      [subLink: string]: ISideMenu[];
    };
    const menu: menuStructure = subMenu;
    const subLink = _.get(pathname.split("/"), `${1}`, "main");
    const key: string = subLink ? subLink : "main";
    return key === "post" ? categoryMenu : menu[key];
  };

  const sideMenu = getSideMenu();

  useEffect(() => {
    _.map(sideMenu, (m, k) => {
      if (k.toString() !== selectedSideMenu && pathname === m.link) {
        setSelectedSideMenu(k.toString());
      }
    });
  }, [selectedSideMenu, pathname, setSelectedSideMenu, sideMenu]);

  return (
    <Sider
      theme={darkMode ? "dark" : "light"}
      breakpoint={"xs"}
      hidden={!viewSide}
    >
      <Menu
        theme={darkMode ? "dark" : "light"}
        selectedKeys={[selectedSideMenu]}
      >
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
  );
}

export default SideMenu;
