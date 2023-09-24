import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";

const { Option } = Select;

const CreatePost: React.FC = ({user}) => {
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const formSubmitHandler = async (values: any) => {
    console.log(values);
    let temp = {
      deadline: values.dateTime,
      description: values.description,
      division: values.division,
      title: values.title,
      weight: "20",
    };

    const response = await fetch("http://localhost:8000/assignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user}`
      },
      body: JSON.stringify(temp),
    });
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />} block>
        New Post
      </Button>
      <Drawer
        title="Create a new post"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={() => form.submit()}
              type="primary"
              htmlType="submit"
            >
              Post
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          onFinish={formSubmitHandler}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="division"
                label="Division"
                rules={[
                  { required: true, message: "Please select an division" },
                ]}
              >
                <Select placeholder="Please select an division">
                  <Option value="cs">CS</Option>
                  <Option value="ras">RAS</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: "Please choose the type" }]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="announcement">Announcement</Option>
                  <Option value="task">Task</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter a title" }]}
              >
                <Input placeholder="title..." />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[
                  { required: true, message: "Please choose the dateTime" },
                ]}
              >
                <DatePicker.RangePicker
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentElement!}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default CreatePost;
