import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { IoMdNotifications } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { BsPlusCircle, BsCodeSlash, BsClock } from "react-icons/bs";
import { GoMention } from "react-icons/go";
import { HiOutlineGif } from "react-icons/hi2";
import { FaCrown,  FaAward} from "react-icons/fa";
import type { MenuProps } from "antd";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Row,
  Col,
  Input,
  Avatar,
  Space,
  Anchor,
  Button,
  Divider,
} from "antd";
import styles from "./Home.module.css";
import Feed from "../Feed/Feed";
import CreatePost from "../CreatePost/CreatePost";
import UpdatePost from "../CreatePost/UpdatePost";

const { Header, Content, Footer, Sider } = Layout;

const items2: MenuProps["items"] = [
  {
    label: "Home",
    icon: AiOutlineHome,
    key: "home",
  },
  {
    label: "Feed",
    icon: LaptopOutlined,
    key: "feed",
  },
  {
    label: "Tasks",
    icon: NotificationOutlined,
    key: "tasks",
  },
].map((item, index) => {
  return {
    key: `${item.key}`,
    icon: React.createElement(item.icon, { style: { fontSize: 21 } }),
    label: `${item.label}`,
  };
});

const rankedMembers: MenuProps["items"] = [
  {
    label: "Khaled Fahmy",
    icon: FaCrown,
    key: "home",
  },
  {
    label: "Amr Yasser",
    icon: FaAward,
    key: "feed",
  },
  {
    label: "Sherbo",
    icon: FaAward,
    key: "tasks",
  },
].map((item, index) => {
  return {
    key: `${item.key}`,
    icon: React.createElement(item.icon, { style: { fontSize: 19 } }),
    label: `${item.label}`,
  };
});

const postOptions = [
  {
    icon: BsPlusCircle,
    action: () => {
      console.log("hi");
    },
  },
  {
    icon: GoMention,
    action: () => {},
  },
  {
    icon: HiOutlineGif,
    action: () => {},
  },
  {
    icon: BsCodeSlash,
    action: () => {},
  },
  {
    icon: BsClock,
    action: () => {},
  },
].map((item) => {
  return (
    <Col span={1} style={{ margin: "0 8px" }}>
      {React.createElement(item.icon, {
        style: { fontSize: 21, cursor: "pointer", color: "#7e7e7e" },
        onClick: item.action,
      })}
    </Col>
  );
});

const HomeLayout: React.FC = ({user}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <>
      <div
        style={{
          background: "#fff",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -1,
        }}
      ></div>
      <Layout
        style={{
          height: "100%",
          background: "#fff",
          maxWidth: "100%",
          margin: "auto",
        }}
      >
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            background: "white",
            justifyItems: "center",
            borderBottom: "1px solid #eee",
          }}
        >
          <Row style={{ width: "100%" }}>
            <Col span={2}>
              <span
                style={{
                  color: "#0077fd",
                  fontSize: 22,
                }}
              >
                IEEE-ZSB
              </span>
            </Col>
            <Col span={6} style={{ display: "grid", alignItems: "center" }}>
              <Input
                addonBefore={<SearchOutlined />}
                placeholder="Search..."
                style={{
                  justifySelf: "center",
                }}
              />
            </Col>
            <Col span={12}></Col>
            <Col span={2}>
              <CreatePost user={user}/>
              <UpdatePost />
            </Col>
            <Col span={1}>
              <Avatar
                shape="circle"
                size={45}
                icon={<IoMdNotifications style={{ color: "#00a2ff" }} />}
                style={{ background: "none", color: "#999", cursor: "pointer" }}
              />
            </Col>
            <Col span={0.5}>
              <Avatar
                shape="circle"
                size={36}
                icon={<UserOutlined style={{ color: "#00a2ff" }} />}
                style={{ cursor: "pointer", background: "#e5f4ff" }}
              />
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: "0 50px", overflowY: "scroll" }}>
          <Layout style={{ padding: "24px 0", background: colorBgContainer }}>
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["feed"]}
                style={{
                  height: "100%",
                  // textAlign: "left",
                  fontSize: 19,
                  color: "#808080",
                }}
                items={items2}
              />
            </Sider>
            <Content
              style={{
                padding: "0 24px",
                color: "#000",
                justifyItems: "flex-start",
                display: "flex",
                paddingLeft: 50,
                flexDirection: "column",
              }}
            >
              <Space
                style={{
                  width: "90%",
                  height: "fit-content",
                  // border: "1px solid #aaa",
                  borderRadius: 12,
                  padding: 12,
                  flexDirection: "column",
                  background: "#f7f7f7",
                }}
                className={styles["inputSpace"]}
              >
                <Input.TextArea
                  showCount
                  style={{
                    height: 80,
                    marginBottom: 24,
                    outline: "none",
                    border: "none",
                    backgroundColor: "#f7f7f7",
                    minWidth: "100%",
                    fontSize: 19,
                  }}
                  className={styles.txtArea}
                  placeholder="Make an Announcement"
                ></Input.TextArea>
                <Space>
                  <Row>{postOptions}</Row>
                </Space>
              </Space>
              <Divider />
              <Space>
                <Feed user={user} />
              </Space>
            </Content>
            <Sider style={{ background: colorBgContainer }} width={300}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["feed"]}
                style={{
                  // height: "80vh",
                  textAlign: "left",
                  borderInlineEnd: "none",
                  borderInlineStart: "1px solid #999",
                  fontSize: 19,
                }}
                items={rankedMembers}
                selectedKeys={[]}
              />
            </Sider>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center", background: "" }}>
          IEEE ©2023 Created by Hollow Knights
        </Footer>
      </Layout>
    </>
  );
};

export default HomeLayout;
