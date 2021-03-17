import {
  AliwangwangOutlined,
  CommentOutlined,
  GithubOutlined,
  QqOutlined,
  TwitterOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import React from "react";

export const getIcon = (type: string):JSX.Element => {
  switch (type) {
    case "main":
      return <NotificationOutlined />;
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
