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

const UpdatePost: React.FC = ({ user, postID }) => {
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onDelete = () => {
    console.log("deleted");
  };

  const formSubmitHandler = async (values: any) => {
    console.log(values);
    let temp = {
      deadline: values.dateTime,
      description: values.description,
      division: values.division,
      title: values.title,
      weight: "30",
    };

    const response = await fetch(
      `http://localhost:8000/assignments/${postID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify(temp),
      }
    );
  };

  return (
    <>
      <Drawer
        title="Update post"
        width={720}
        onClose={onClose}
        open={true}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button danger onClick={onClose}>
              Delete
            </Button>
            <Button
              onClick={() => form.submit()}
              type="primary"
              htmlType="submit"
            >
              Update
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
                <Select placeholder="Please select an division" disabled defaultValue={"cs"}>
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

export default UpdatePost;
