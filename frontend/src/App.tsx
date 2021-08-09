import { Form, Input, message, Tabs } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import "./App.css";
import http, { AjaxResult } from "./http";

const { Search } = Input;

const { TabPane } = Tabs;

function App() {
  const [long_url, setLongUrl] = useState("");

  const [show_long_url_res, setShowLongUrlRes] = useState(false);

  const [short_url, setShortUrl] = useState("");

  const [show_short_url_res, setShowShortUrlRes] = useState(false);

  const [gen_short_form] = Form.useForm();

  const [get_long_url_form] = Form.useForm();

  /**
   * 生成短网址
   *
   * @param {string} value 输入的是长网址
   */
  async function genShortUrl(value: string) {
    try {
      const values = await gen_short_form.validateFields();
      const res: AjaxResult<any> = await http.post("/url", {
        origin_url: value,
      });
      setShortUrl(res.data);
      if (res.success) {
        setShowShortUrlRes(true);
        message.info("恭喜，生成短网址成功！");
      } else {
        message.warning(res.msg);
      }
    } catch (err) {
      console.log("Failed:", err);
    }
  }

  async function getLongUrl(value: string) {
    const res: AjaxResult<any> = await http.get(`/url?short_url=${value}`);
    if (res.success) {
      setShowLongUrlRes(true);
    } else {
      message.error(res.msg);
    }
    setLongUrl(res.data ?? "");
  }

  return (
    <div className="App">
      <div className="container">
        <Tabs style={{ width: 500, height: 400 }}>
          <TabPane tab="网址压缩" key="gen-short">
            <div>
              <span className={"text-9xl"}> 请输入长网址：</span>
              <Form form={gen_short_form}>
                <Form.Item
                  name={"gen_short"}
                  rules={[
                    {
                      type: "url",
                      message: "请输入正确的url！",
                    },
                    {
                      required: true,
                      message: "请输入url！",
                    },
                  ]}
                >
                  <Search
                    placeholder="请输入长网址"
                    allowClear
                    enterButton="压缩一下"
                    size="large"
                    onSearch={genShortUrl}
                  />
                </Form.Item>
              </Form>

              {show_short_url_res && (
                <div>
                  <span>查询结果：</span>
                  <a href={short_url}>{short_url}</a>
                </div>
              )}
            </div>
          </TabPane>
          <TabPane tab="短网址还原" key="gen-long43 ``e">
            <div>
              <span> 请输入要还原的短网址：</span>
              <Form form={get_long_url_form}>
                <Form.Item
                  name={"get_long_url"}
                  rules={[
                    {
                      type: "url",
                      message: "请输入正确的url！",
                    },
                    {
                      required: true,
                      message: "请输入url！",
                    },
                  ]}
                >
                  <Search
                    placeholder="请输入要还原的短网址"
                    allowClear
                    enterButton="网址还原"
                    size="large"
                    onSearch={getLongUrl}
                  />
                </Form.Item>
              </Form>

              {show_long_url_res && (
                <div>
                  <span>查询结果：</span>
                  <a href={long_url}>{long_url}</a>
                </div>
              )}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
