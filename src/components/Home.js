import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import Image from "../assets/irb-6660-industrial-robot.jpg";
import ChatDrawer from "../components/ChatDrawer";
import { addMessage } from "../redux/chatSlice";
import {
  Layout,
  Menu,
  Avatar,
  Badge,
  Progress,
  theme,
  Dropdown,
  Space,
  Card,
  Input,
  Row,
  Col,
} from "antd";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  UserOutlined,
  DownOutlined,
  SettingOutlined,
  BarsOutlined,
  HistoryOutlined,
  MailOutlined,
  ShoppingOutlined,
  FileDoneOutlined,
  UsergroupAddOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  PoweroffOutlined,
  DollarOutlined,
  FolderOutlined,
  InfoCircleOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

// Menu items for the user profile
const userProfileItems = [
  {
    key: "1",
    label: "My Account",
    disabled: true,
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "Profile",
    icon: <UserOutlined />,
    extra: "⌘P",
  },
  {
    key: "3",
    label: "Billing",
    icon: <DollarOutlined />,
    extra: "⌘B",
  },
  {
    key: "4",
    label: "Logout",
    icon: <PoweroffOutlined />,
    extra: "⌘S",
  },
];

// Menu items for the sidebar
const items = [
  getItem("Overview", "sub1", <AppstoreOutlined />, [
    getItem("Escalate Issue", "2", <BarsOutlined />),
    getItem("History", "3", <HistoryOutlined />),
  ]),
  getItem("Messages", "4", <MailOutlined />),
  getItem("All Machines", "5", <ShoppingOutlined />),
  getItem("Solved Issues", "6", <FileDoneOutlined />),
  getItem("PE/Experts", "7", <UsergroupAddOutlined />),
  {
    type: "divider",
  },
  getItem("Settings", "8", <SettingOutlined />),
  getItem("Help", "9", <MessageOutlined />),
  getItem("Help Desk#", "10", <CustomerServiceOutlined />),
];

const Home = () => {
  const user = useSelector((state) => state.user);
  console.log("user data", user); // Get user data from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false); // State for sidebar collapse
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Drawer states
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const onClick = ({ key }) => {
    if (key == "4") {
      handleLogout();
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout()); // Clear user data in Redux
    navigate("/");
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      dispatch(
        addMessage({
          text: searchValue,
          timestamp: new Date().toLocaleTimeString(),
        })
      ); // Dispatch action to add search value as a message
      setDrawerOpen(true); // Open the drawer after sending the message
      setSearchValue(""); // Clear the search input
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar Component */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <div style={{ margin: "10px" }}>
            <Avatar
              shape="circle"
              src={user && user.photoURL ? user.photoURL : undefined} // Use user's photoURL or undefined
              icon={!user || !user.photoURL ? <UserOutlined /> : null} // Show UserOutlined icon if no photoURL
            />
          </div>
          <span
            style={{
              color: "white",
              fontSize: "1.5rem",
              margin: "2px",
              fontWeight: "bold",
            }}
          >
            {user && user.displayName ? user.displayName : "Anonymous User"}{" "}
          </span>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header Component */}
        <Header
          style={{
            display: "flex",
            background: colorBgContainer,
            padding: 0,
            height: "auto",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0px 16px",
            }}
          >
            <p style={{ margin: 0, fontWeight: "bold", fontSize: "x-large" }}>
              Welcome back,{" "}
              {user && user.displayName ? user.displayName : "Anonymous User"}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              <Badge count={5}>
                <Avatar
                  shape="circle"
                  src={user && user.photoURL ? user.photoURL : undefined} // Use user's photoURL or undefined
                  icon={!user || !user.photoURL ? <UserOutlined /> : null} // Show UserOutlined icon if no photoURL
                />
              </Badge>
              <Dropdown
                menu={{
                  items: userProfileItems,
                  onClick,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <p style={{ margin: "0 10px" }}>
                      {user && user.displayName
                        ? user.displayName
                        : "Anonymous User"}
                    </p>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
          <p style={{ margin: "-15px 16px", fontWeight: "bold", color: "red" }}>
            CRITICAL ALERT: PRODUCTION DOWN SINCE 20 MINUTES
          </p>
          <Progress
            percent={50}
            percentPosition={{
              align: "center",
              type: "inner",
            }}
            strokeColor={"rgb(170 170 170)"}
            strokeWidth={25}
            format={() => (
              <div
                style={{
                  fontSize: "2rem",
                  color: "black",
                  lineHeight: "1.5",
                }}
              >
                Progress Bar: Step A, Completed, Step B In Progress
              </div>
            )}
            style={{ margin: "0 16px 10px 16px", width: "calc(100% - 32px)" }}
          />
        </Header>

        {/* Content Section */}
        <Content
          style={{
            margin: "16px",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <div style={{ display: "flex", flex: 1, gap: "16px" }}>
            {/* Left Column (70%) */}
            <div
              style={{
                flex: "0 0 70%",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <Card
                  title={
                    <span
                      style={{
                        color: "white",
                        fontSize: "large",
                        fontWeight: "bold",
                      }}
                    >
                      TOP ERRORS
                    </span>
                  }
                  style={{
                    flex: 1,
                    backgroundColor: "#ffa834", // Card background color
                    color: "white", // Text color
                  }}
                >
                  <div
                    style={{
                      fontSize: "x-large",
                      color: "white",
                      lineHeight: "1.5",
                      fontWeight: "bold",
                    }}
                  >
                    <p>Machine1: IRB 6660</p>
                    <p>ERROR CODE: PST-B1</p>
                  </div>
                </Card>

                <Card
                  title="ROOT CAUSE"
                  style={{ flex: 1, fontWeight: "bold", fontSize: "large" }}
                >
                  <div
                    style={{
                      fontSize: "x-large",
                      lineHeight: "1.5",
                      fontWeight: "bold",
                    }}
                  >
                    <p>% Probability: 93%</p>
                    <p style={{ color: "#a22d57" }}>
                      OVER HEATED, POWERED DOWN
                    </p>
                  </div>
                </Card>
              </div>
              <Card
                style={{
                  flex: 1,
                  backgroundColor: "white", // Light background for better readability
                  padding: "20px",
                }}
              >
                <Row gutter={16}>
                  {/* First Column */}
                  <Col span={12}>
                    <div style={{ fontSize: "large", lineHeight: "1.8" }}>
                      <p>Here's The Root Cause of the Issues:</p>
                      <ol style={{ margin: 0, paddingLeft: "20px" }}>
                        <li>Check that there actually is a problem</li>
                        <li>Find the root cause of the issue</li>
                        <li>Correct the root cause</li>
                        <li>Make sure the problem is solved</li>
                        <li>Confirm production is back online</li>
                      </ol>
                    </div>
                  </Col>

                  {/* Second Column */}
                  <Col span={12}>
                    <img
                      src={Image}
                      alt="Root Cause Diagram"
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </Col>
                </Row>
              </Card>
            </div>

            {/* Right Column (30%) */}
            <div
              style={{
                flex: "0 0 29%",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                maxHeight: "calc(100vh - 160px)", // Adjust to fit within window height, keeping space for header/footer
                overflowY: "auto", // Allows scrolling if content exceeds the allocated height
              }}
            >
              <Card style={{ flex: "0 0 39%", maxHeight: "39%" }}>
                <iframe
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none", // Remove default border
                    margin: "1px", // Add margin around the iframe
                    boxSizing: "border-box", // Ensure padding and border are included in the element's total width and height
                  }}
                  src="https://www.youtube.com/embed/mORjHSphRi4?si=lofQyHbkPjSiFlW-"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </Card>

              {/* Second Row: 7 Rows with custom layout */}
              <Card
                style={{ flex: "0 0 60%", maxHeight: "60%", overflowY: "auto" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    height: "100%",
                  }}
                >
                  {/* Row 1: Two columns, left and right aligned */}
                  <Row justify="space-between" style={{ width: "100%" }}>
                    <Col>
                      <p
                        style={{
                          fontSize: "x-large",
                          lineHeight: "1.5",
                          fontWeight: "bold",
                        }}
                      >
                        IRB 6660 Documents
                      </p>
                    </Col>
                    <Col>
                      <PlusCircleFilled style={{ fontSize: "34px" }} />
                    </Col>
                  </Row>

                  {/* Row 2 */}
                  <Row>
                    <Col span={24}>
                      <p
                        style={{
                          fontSize: "medium",
                          lineHeight: "1.5",
                          fontWeight: "bold",
                        }}
                      >
                        SME: JOHN SMITH
                      </p>
                    </Col>
                  </Row>

                  {/* Row 3: Individual content with Folder icon, text, and Info icon */}
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ width: "100%" }}
                  >
                    <Col>
                      <FolderOutlined
                        style={{ fontSize: "20px", color: "#1890ff" }}
                      />
                    </Col>
                    <Col style={{ marginLeft: "8px" }}>
                      <p style={{ margin: 0 }}>Videos</p>
                    </Col>
                    <Col flex="auto" style={{ textAlign: "right" }}>
                      <InfoCircleOutlined
                        style={{ fontSize: "20px", color: "#1890ff" }}
                      />
                    </Col>
                  </Row>

                  {/* Row 4: Individual content */}
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ width: "100%" }}
                  >
                    <Col>
                      <FolderOutlined
                        style={{ fontSize: "20px", color: "#1890ff" }}
                      />
                    </Col>
                    <Col style={{ marginLeft: "8px" }}>
                      <p style={{ margin: 0 }}>Images</p>
                    </Col>
                    <Col flex="auto" style={{ textAlign: "right" }}>
                      <InfoCircleOutlined
                        style={{ fontSize: "20px", color: "#1890ff" }}
                      />
                    </Col>
                  </Row>

                  {/* Row 5: Individual content */}
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ width: "100%" }}
                  >
                    <Col>
                      <FolderOutlined
                        style={{ fontSize: "20px", color: "#1890ff" }}
                      />
                    </Col>
                    <Col style={{ marginLeft: "8px" }}>
                      <p style={{ margin: 0 }}>User Manuals</p>
                    </Col>
                    <Col flex="auto" style={{ textAlign: "right" }}>
                      <InfoCircleOutlined
                        style={{ fontSize: "20px", color: "#1890ff" }}
                      />
                    </Col>
                  </Row>

                  {/* Row 6: Individual content */}
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ width: "100%" }}
                  >
                    <Col>
                      <FolderOutlined
                        style={{ fontSize: "20px", color: "#1890ff" }}
                      />
                    </Col>
                    <Col style={{ marginLeft: "8px" }}>
                      <p style={{ margin: 0 }}>Repair Manuals</p>
                    </Col>
                    <Col flex="auto" style={{ textAlign: "right" }}>
                      <InfoCircleOutlined
                        style={{ fontSize: "20px", color: "#1890ff" }}
                      />
                    </Col>
                  </Row>

                  {/* Row 7: Individual content */}
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ width: "100%" }}
                  >
                    <Col>
                      <FolderOutlined
                        style={{ fontSize: "20px", color: "#1890ff" }}
                      />
                    </Col>
                    <Col style={{ marginLeft: "8px" }}>
                      <p style={{ margin: 0 }}>WO Logs</p>
                    </Col>
                    <Col flex="auto" style={{ textAlign: "right" }}>
                      <InfoCircleOutlined
                        style={{ fontSize: "20px", color: "#1890ff" }}
                      />
                    </Col>
                  </Row>
                </div>
              </Card>
            </div>
          </div>

          {/* Search Box */}
          <div style={{ marginTop: "16px" }}>
            <Input.Search
              placeholder="Ask your question..."
              enterButton="ASK CAR PAL AI"
              size="large"
              value={searchValue} // Bind input value to searchValue state
              onChange={(e) => setSearchValue(e.target.value)} // Update searchValue state
              onPressEnter={handleSearch}
              onSearch={handleSearch} // Call handleSearch on button click
              style={{ width: "100%" }}
            />
          </div>
          {/* Chat Drawer Component */}
          <ChatDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </Content>

        {/* Footer Component */}
        <Footer style={{ textAlign: "center" }}>
          RJ Design ©{new Date().getFullYear()} Created by Rahul Akella
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
