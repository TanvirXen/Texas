import Head from "next/head";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import firebase from '../../components/firebaseConfig'
import Router from "next/router";
import { useState } from "react";
import React from "react";


import { Container,Row,Col } from "react-bootstrap"
export default function Login() {
  async function doLogin(values) {
     window.alert(values); // 
    message.loading({ key: "login", content: "Logging in !" }); // Showing logging in message
    try {
      await firebase.login(values);
      message.success({ key: "login", content: "Logged in " }); // if success
      Router.push("products");
    } catch (error) {
      // if error
      message.error({
        key: "login",
        content: error.message || "Something went wrong !",
      });
    }
  }
	return (
		<div>
			<Head>
				<title>Texas- Login </title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
      <main>
        <Container>
          <Row>
            <Col md={4}></Col>
            <Col md={4}>
            <h2 style={{ fontSize: 25, marginBottom: 30 ,marginTop:120}}>Admin Login</h2>
        <Form
          name="login"
          style={{ width: "100%", maxWidth: 350 }}
          initialValues={{ remember: true }}
          onFinish={doLogin} // When click the Login Button
        >
          <Form.Item name="email" rules={[{ required: true, message: "" }]}>
            <Input size="large" prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "" }]}>
            <Input
              size="large"
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
            </Col>
            <Col md={4}></Col>
          </Row>
        </Container>

      </main>
		</div>
	);
}
