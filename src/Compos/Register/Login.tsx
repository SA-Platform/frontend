import {
  UserOutlined,
  SolutionOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import React, { useState, FC, useMemo } from "react";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Divider,
  Steps,
  message,
} from "antd";
import type { FormInstance } from "antd/es/form";
import styles from "./RegisterLayout.module.css";

interface RegisterStepProps {
  form: FormInstance;
}

function setCookie(name, value, daysToExpire) {
  const expires = new Date();
  expires.setTime(expires.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

/**
  
   Dynamic Validation from backend #####################################################################
   */

const RegisterStep = ({ form }: RegisterStepProps) => {
  const validateUserHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const response: any = await fetch(
      `http://127.0.0.1:8000/users/check-username`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: form.getFieldValue("username") }),
      }
    );
    const data = await response.json();

  };


  const formProps = {
    username: {
      name: "username",
      onChange: validateUserHandler,
    },
  };

  return (
    <>
      <Col span={24}>
        <Form.Item {...formProps.username}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" label="">
          <Input.Password placeholder="Password" />
        </Form.Item>
      </Col>
    </>
  );
};

const LoginLayout = () => {
  const [form] = Form.useForm();

  return (
    <>
      {/* background styling */}
      <div className={`${styles.back}`}>
        <div className={`${styles.circle} ${styles.circle1}`}></div>

        <div className={`${styles.circle} ${styles.circle2}`}></div>
        <div className={`${styles.circle} ${styles.circle3}`}></div>
        <div className={`${styles.circle} ${styles.circle4}`}></div>
        <div className={`${styles.circle} ${styles.circle5}`}></div>
      </div>

      {/* Form */}

      <Form
        style={{
          maxWidth: 400,
          margin: "auto",
          alignSelf: "center",
          padding: 20,
          paddingBottom: 40,
          boxShadow: "0 0 12px #ccc",
          borderRadius: 12,
        }}
        className={styles.form}
        onFinish={(vals) => console.log(vals)}
        form={form}
      >
        <Divider
          orientation="center"
          plain
          style={{
            borderBlockColor: "#0077fd",
            fontSize: 25,
          }}
        >
          IEEE
        </Divider>

        <Row gutter={[16, 12]}>
          <RegisterStep form={form} />



          <Col span={24} style={{ justifySelf: "flex-end" }}>
            <Button type="primary" block>
              Login
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default LoginLayout;
