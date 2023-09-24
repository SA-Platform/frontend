import { Space, Avatar } from "antd";

const Post = ({content, name, division}) => {
  console.log(content);
  
  return (
    <>
      <Space
        style={{
          alignItems: "baseline",
        //   boxShadow: "0 0 12px #bbb",
          padding: "15px 15px 30px 15px",
        //   borderRadius: 7,
          borderBottom: "1px solid #ddd",
          marginBottom: "20px"
        }}
      >
        <Avatar
          style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
          size={37}
        >
          {name[0]}
        </Avatar>
        <Space
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            textAlign: "left",
            alignItems: "flex-start",
          }}
        >
          <Space
            style={{
              justifyContent: "flex-start",
              textAlign: "left",
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontWeight: "bold" }}>{name}</span>
            <span style={{ color: "#888" }}>@{division}</span>
          </Space>
          <p style={{ margin: 0, width: "55vw" }}>
            {content}
          </p>
        </Space>
      </Space>
    </>
  );
};

export default Post;
