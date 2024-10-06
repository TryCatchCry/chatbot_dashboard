import React, { useState } from "react";
import { Drawer, Button, Input, Space, List, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/chatSlice";
import { UserOutlined } from "@ant-design/icons";

const ChatDrawer = ({ open, onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  // Access user's name and avatar (displayName and photoURL) from Redux state
  const user = useSelector((state) => state.user);
  const chatHistory = useSelector((state) => state.chat.messages);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      dispatch(
        addMessage({
          text: inputValue,
          timestamp: new Date().toLocaleTimeString(),
        })
      );
      setInputValue("");
    }
  };

  return (
    <Drawer
      title={"Chat with Car Pal AI"} // Display user's name in the drawer title
      placement="bottom"
      height={400}
      onClose={onClose}
      open={open}
    >
      {/* Chat History using Ant Design List */}
      <List
        itemLayout="horizontal"
        dataSource={chatHistory}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={user && user.photoURL ? user.photoURL : undefined} // Use user's Google avatar or undefined
                  icon={!user || !user.photoURL ? <UserOutlined /> : null} // Fallback to UserOutlined if no avatar
                />
              }
              title={
                <span style={{ fontWeight: "bold" }}>
                  {user && user.displayName
                    ? user.displayName
                    : "Anonymous User"}{" "}
                  {/* Display user's name */}
                  {` at ${item.timestamp}`}:
                </span>
              }
              description={item.text}
            />
          </List.Item>
        )}
        style={{ maxHeight: "250px", overflowY: "auto" }} // Limit height of list and enable scrolling
      />

      <Space direction="vertical" style={{ width: "100%", marginTop: "10px" }}>
        <Input
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSendMessage} // Send message on Enter key press
        />
        <Button type="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Space>
    </Drawer>
  );
};

export default ChatDrawer;
