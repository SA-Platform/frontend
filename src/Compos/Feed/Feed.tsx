import { Space } from "antd";
import Post from "../Post/Post";
import { useEffect, useState } from "react";

const Feed = ({ user }) => {
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    console.log(user);

    const func = async () => {
      const resposne = await fetch("http://localhost:8000/announcements", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });

      let data = await resposne.json();
      setAnnouncements(data)
    };

    func();
  }, []);
  return (
    <>
    <Space style={{flexDirection: "column"}}>

      {announcements.map((e) => {
        return (
          <>
            <Post content={e["description"]} name={e.creator["first_name"] + " " + e.creator["last_name"]} division={e["division"].name} />
          </>
        );
      })}
      </Space>
    </>
  );
};

export default Feed;
