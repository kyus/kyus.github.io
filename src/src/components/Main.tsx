import React from "react";
import { RouteComponentProps } from "react-router-dom";
import {Button, Descriptions, PageHeader } from "antd";

function Main({ history, location, match }: RouteComponentProps) {
  return <div>
    <div className={"mainBanner"} />
    <div style={{maxWidth:1200, margin:"auto", padding:20}}>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          onBack={history.goBack}
          title="Kyus' DEV Blog"
          subTitle="React TypeScript Test Page 입니다... 짜투리 짬내서 업데이트 중.."
          extra={[
            <Button key="3">Operation</Button>,
            <Button key="2">Operation</Button>,
            <Button key="1" type="primary">
              Primary
            </Button>,
          ]}
        >
          <Descriptions  column={1}>
            <Descriptions.Item label="Created">KYUS</Descriptions.Item>
            <Descriptions.Item label="Association">
              <a>1615988464135</a>
            </Descriptions.Item>
            <Descriptions.Item label="Creation Time">
              2021-03-17
            </Descriptions.Item>
            <Descriptions.Item label="Bundle Time">
              2021-03-17
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </div>
    </div>
  </div>;
}

export default Main;
