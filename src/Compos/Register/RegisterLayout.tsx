import { UserOutlined, SolutionOutlined, CameraOutlined } from '@ant-design/icons';
import React, { useState, FC } from 'react';
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Upload,
  Row,
  Col,
  Divider,
  Steps,
} from 'antd';
import type { FormInstance } from 'antd/es/form';
import styles from "./RegisterLayout.module.css"



interface RegisterStepProps{
    form: FormInstance;
}


const RegisterStep = ({form} :  RegisterStepProps) => {




  const validateUserHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // backend request here 
    
    if (e.target.value == "de7ko") {
      form.setFields([
        {
          name: 'userName',
          errors: ['This user name is taken'],
        }
      ])
    } else {
      form.setFields([
        {
          name: 'userName',
          errors: [],
        }
      ])
    }

    console.log("hi");
    
  }

  const validateEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {}


  const formProps = {
    userName:{
        name: "userName",
        onChange: validateUserHandler
    },
    email: {
        name: "email",
        onChange: validateEmailHandler,
    }
  }

  return <>
  <Col span={24}>
  <Form.Item {...formProps.userName} >
      <Input placeholder='Username' />
    </Form.Item>
    <Form.Item {...formProps.email}  >
      <Input placeholder='Email' />
    </Form.Item>
    <Form.Item name="natID" label="" >
      <Input placeholder='National ID' />
    </Form.Item>

    <Form.Item name="password" label="" >
      <Input.Password placeholder='Password' />
    </Form.Item>
  </Col>



  </>
}


interface ProfileStepProps {
    step: string
}

const ProfileStep = ({ step } : ProfileStepProps) => {

  const [gender, setGender] = useState();
  const [uploaded, setUploaded] = useState();
  return <>

    <Col span={24}>
      <Upload
        accept='image/png, image/jpg,image/jpeg'
        listType="picture-circle"
        style={{
          boxShadow: "0 0 10px #888",
        }}

      >
        <div style={{ display: "none" }}>
          <CameraOutlined style={{
            fontSize: "30px",
            color: "#aaa"
          }} />
        </div>

      </Upload>

    </Col>
    <Col span={12}>
      <Input placeholder='First Name' />
    </Col>

    <Col span={12}>
      <Input placeholder='Last Name' />
    </Col>


    <Col span={24}>
      <Input placeholder='Phone Number' addonBefore={"+20"} />
    </Col>

    <Col span={12}>
      <DatePicker style={{ width: "100%" }} placeholder='Birthdate' />
    </Col>
    <Col span={12}>
      <Radio.Group value={gender} onChange={(e) => setGender(e.target.value)}>
        <Radio.Button value="male">Male</Radio.Button>
        <Radio.Button value="female">Female</Radio.Button>
      </Radio.Group>
    </Col>



    <Col span={24}>
      <Select
        showSearch
        placeholder="University"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        style={{
          width: "100%",
          textAlign: "left"
        }}
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'tom',
            label: 'Tom',
          },
        ]}
      />
    </Col>

    <Col span={24}>
      <Select
        showSearch
        placeholder="Faculty"

        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        style={{
          width: "100%",
          textAlign: "left"
        }}
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'tom',
            label: 'Tom',
          },
        ]}
      />
    </Col>


  </>
}


const RegisterLayout = () => {
  const [step, setStep] = useState<string>("register")
  const [form] = Form.useForm();
  return (
    <>
    {/* start background styling */}
      <div className={`${styles.back}`}>
        <div className={`${styles.circle} ${styles.circle1}`}></div>

        <div className={`${styles.circle} ${styles.circle2}`}></div>
        <div className={`${styles.circle} ${styles.circle3}`}></div>
        <div className={`${styles.circle} ${styles.circle4}`}></div>
        <div className={`${styles.circle} ${styles.circle5}`}></div>
      </div>

      {/* End background styling */}


      <Form style={{
        maxWidth: 400,
        margin: "auto",
        alignSelf: "center",
        padding: 20,
        paddingBottom: 40,
        boxShadow: "0 0 12px #ccc",
        borderRadius: 12,
      }} className={styles.form} onFinish={(vals) => console.log(vals)} form={form}>

        <Divider orientation="center" plain style={{
          borderBlockColor: "#0077fd",
          fontSize: 25
        }}>
          IEEE
        </Divider>

        <Steps
          items={[
            {
              title: "Register",
              status: (step == "register" ? 'finished' : "wait"),
              icon: <UserOutlined />,
            },
            {
              title: "Profile",
              status: (step == "profile" ? 'finished' : "wait"),
              icon: <SolutionOutlined />,
            },

          ]}
          style={{
            marginBottom: 25
          }}
        />

        <Row gutter={[16, 12]}>

        {/* 2 steps for registration */}
          {
            {
              register: <RegisterStep form={form} />,
              profile: <ProfileStep step={step} />
            }[step]
          }

          {/* <Divider /> */}

          <Col span={12} style={{ justifySelf: "flex-end" }}>
            <Button block disabled={step == "register"}>
              Previous
            </Button>
          </Col>

          <Col span={12} style={{ justifySelf: "flex-end" }}>
            <Button type="primary" htmlType='submit' block>
              Next
            </Button>
          </Col>

        </Row>

      </Form>
    </>
  );
};




export default RegisterLayout;