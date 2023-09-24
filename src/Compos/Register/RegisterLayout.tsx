import {
  UserOutlined,
  SolutionOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import React, { useState, FC, useMemo } from "react";
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
  message
} from "antd";
import ImgCrop from "antd-img-crop";
import type { FormInstance } from "antd/es/form";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
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

    console.log(data);

    if (response) {
      if (response.ok) {
        form.setFields([
          {
            name: "username",
            errors: [],
          },
        ]);
      } else if (response.status == 409) {
        form.setFields([
          {
            name: "username",
            errors: [data.detail],
          },
        ]);
      } else if (response.status == 422) {
        form.setFields([
          {
            name: "username",
            errors: [data.detail[0].msg],
          },
        ]);
      }
    }

    console.log("hi");
  };

  const validateEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {};

  // const validatePassHandler = (e: )

  const formProps = {
    username: {
      name: "username",
      onChange: validateUserHandler,
    },
    email: {
      name: "email",
      onChange: validateEmailHandler,
    },
  };

  return (
    <>
      <Col span={24}>
        <Form.Item {...formProps.username}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item {...formProps.email}>
          <Input placeholder="Email" />
        </Form.Item>
        {/* <Form.Item name="natID" label="">
          <Input placeholder="National ID" />
        </Form.Item> */}

        <Form.Item name="password" label="">
          <Input.Password placeholder="Password" />
        </Form.Item>
      </Col>
    </>
  );
};

interface ProfileStepProps {
  step: string;
  form: FormInstance;
  setUploaded: any;
  uploaded: any;
}

const ProfileStep = ({
  step,
  form,
  setUploaded,
  uploaded,
}: ProfileStepProps) => {
  const [gender, setGender] = useState<string>("");

  const validateFileType = (
    { type, name }: UploadFile,
    allowedTypes: string[] = ["image/jpg", "image/jpeg", "image/png"]
  ) => {
    return allowedTypes.includes(type!);
  };

  const uploadProps = useMemo(
    () =>
      ({
        multiple: true,
        beforeUpload: (file: UploadFile) => {
          const isAllowedType = validateFileType(file);
          if (!isAllowedType) {
            message.error(`${file.name} is not a valid image file`);
            return false;
          }
          setUploaded((prev) => {
            if (prev.length < 1) {
              return [...prev, file];
            }
            return prev;
          });
          return false;
        },
        onRemove: (file: UploadFile) => {
          setUploaded((prev) => prev.filter((item) => item.uid !== file.uid));
        },
        onChange: (info) => {
          if (info.fileList.length > 3) {
            setTimeout(
              () => form.setFieldsValue({ attachment: uploaded as any }),
              2000
            );
          }
        },
        onPreview: async (file: UploadFile) => {
          console.log(uploaded);

          let src = file.url as string;
          if (!src) {
            src = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.readAsDataURL(file.originFileObj as RcFile);
              reader.onload = () => resolve(reader.result as string);
            });
          }
          const image = new Image();
          image.src = src;
          const imgWindow = window.open(src);
          imgWindow?.document.write(image.outerHTML);
        },
      } as UploadProps),
    [uploaded]
  );

  const onUploadChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setUploaded(newFileList);
  };

  const validatePhoneHandler = () => {
    let re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    let num = form.getFieldValue("phone")
    if(re.test(num)){
      console.log("hi right");
      
      form.setFields([
        {
          name: "phone",
          errors: [],
        },
      ]);
    }else{
      console.log("hi wrong");
      form.setFields([
        {
          name: "phone",
          errors: [],
        },
      ]);
    }
  }

  const formProps = {
    phone: {
      name: "phone",
      onChange: validatePhoneHandler,
    }
  };


  const countryCode = (
    <Select defaultValue="+20">
      <Select.Option value="+1">+1</Select.Option>
      <Select.Option value="+2">+2</Select.Option>
      <Select.Option value="+3">+3</Select.Option>
      <Select.Option value="+20">+20</Select.Option>
    </Select>
  );

  return (
    <>
      <Col span={24}>
        <Form.Item name="attachment">
          <ImgCrop rotationSlider>
            <Upload
              listType="picture-circle"
              style={{
                boxShadow: "0 0 10px #888",
              }}
              {...uploadProps}
            >
              {uploaded.length < 1 && (
                <div>
                  <CameraOutlined
                    style={{
                      fontSize: "30px",
                      color: "#aaa",
                    }}
                  />
                </div>
              )}
            </Upload>
          </ImgCrop>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="firstName">
          <Input placeholder="First Name" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name="lastName">
          <Input placeholder="Last Name" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item {...formProps.phone}>
          <Input placeholder="Phone Number" addonBefore={countryCode} />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name="birth">
          <DatePicker style={{ width: "100%" }} placeholder="Birthdate" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="gender">
          <Radio.Group
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <Radio.Button value="male">Male</Radio.Button>
            <Radio.Button value="female">Female</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="uni">
          <Select
            showSearch
            placeholder="University"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            style={{
              width: "100%",
              textAlign: "left",
            }}
            options={[
              {
                value: "zagazig",
                label: "Zagazig",
              },
              {
                value: "mansoura",
                label: "Mansoura",
              },
              {
                value: "cairo",
                label: "Cairo",
              },
            ]}
          />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name="faculty">
          <Select
            showSearch
            placeholder="Faculty"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            style={{
              width: "100%",
              textAlign: "left",
            }}
            options={[
              {
                value: "engineering",
                label: "Engineering",
              },
              {
                value: "finearts",
                label: "Finearts",
              },
              {
                value: "businesses",
                label: "Businesses",
              },
            ]}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="department">
          <Select
            showSearch
            placeholder="Department"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            style={{
              width: "100%",
              textAlign: "left",
            }}
            options={[
              {
                value: "electrical",
                label: "electrical",
              },
              {
                value: "civil",
                label: "civil",
              },
              {
                value: "mechanical",
                label: "mechanical",
              },
            ]}
          />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="gradYear">
          <DatePicker
            picker="year"
            style={{ width: "100%" }}
            placeholder="Graduation Year"
          />
        </Form.Item>
      </Col>
    </>
  );
};

interface userData {
  username: string;
  email: string;
  password: string;
  bio: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  birthdate: Date;
  //   gender: string;
  university: string;
  faculty: string;
  faculty_department: string;
  graduation_year: number;
}

const RegisterLayout = () => {
  const [step, setStep] = useState<string>("register");
  const [form] = Form.useForm();
  const [user, setUser] = useState<userData>();
  const [uploaded, setUploaded] = useState<UploadFile<any>[]>([]);

  const validateFormHandler = async () => {
    if (step == "register") {
      if (form.getFieldValue("username").length < 3) {
        console.log("Err user");
        return;
      }

      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          form.getFieldValue("email")
        )
      ) {
        console.log("Err email");
        return;
      }

      if (form.getFieldValue("password").length < 3) {
        console.log("Err pass");
        return;
      }

      setStep("profile");
    } else {
      let temp: userData = {
        username: form.getFieldValue("username"),
        email: form.getFieldValue("email"),
        password: form.getFieldValue("password"),
        bio: "hi this is my bio",
        first_name: form.getFieldValue("firstName"),
        last_name: form.getFieldValue("lastName"),
        phone_number: form.getFieldValue("phone").trim(),
        birthdate: new Date(form.getFieldValue("birth")),
        // gender: form.getFieldValue("gender"),
        university: form.getFieldValue("uni"),
        faculty: form.getFieldValue("faculty"),
        faculty_department: form.getFieldValue("department"),
        graduation_year: new Date(form.getFieldValue("gradYear")).getFullYear(),
      };

      const response = await fetch("http://localhost:8000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(temp),
      }).then(async (res) => {
        let data = await res.json();
        console.log(data);

        const accessToken = data["access_token"];
        const expirationDays = 7; // Number of days until the cookie expires
        setCookie("user", accessToken, expirationDays);

        if (res.status == 201) {
          let formData = new FormData();

          formData.append("file", uploaded[0], uploaded[0].name);

          const fileResponse = await fetch(
            "http://localhost:8000/users/uploadfile/",
            {
              method: "POST",
              body: formData,
            }
          );
          window.location.reload();
        }
      });

      // Upload Image request
    }
  };

  const backHandler = () => {
    setStep("register");
  };

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

        <Steps
          items={[
            {
              title: "Register",
              status: step == "register" ? "finished" : "done",
              icon: <UserOutlined />,
            },
            {
              title: "Profile",
              status: step == "profile" ? "finished" : "wait",
              icon: <SolutionOutlined />,
            },
          ]}
          style={{
            marginBottom: 25,
          }}
        />

        <Row gutter={[16, 12]}>
          {/* 2 steps for registration */}
          {
            {
              register: <RegisterStep form={form} />,
              profile: (
                <ProfileStep
                  step={step}
                  form={form}
                  uploaded={uploaded}
                  setUploaded={setUploaded}
                />
              ),
            }[step]
          }

          {/* <Divider /> */}

          <Col span={12} style={{ justifySelf: "flex-end" }}>
            <Button block disabled={step == "register"} onClick={backHandler}>
              Previous
            </Button>
          </Col>

          <Col span={12} style={{ justifySelf: "flex-end" }}>
            <Button type="primary" onClick={validateFormHandler} block>
              Next
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default RegisterLayout;
