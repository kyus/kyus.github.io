import {
  AliwangwangOutlined,
  AreaChartOutlined,
  CommentOutlined,
  GithubOutlined,
  QqOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import React from "react";

export const getIcon = (type: string) => {
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
