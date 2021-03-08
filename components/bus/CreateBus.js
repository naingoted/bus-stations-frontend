import { useEffect, useCallback } from "react";
import { Form, message, Input, Button, Select, Row, Switch } from "antd";
import { useAppState, useAppDispatch } from "@/contexts/appContext";
import httpService from "@/services/http.service";
import urlService from "@/services/url.service";
import Card from "@/components/common/Card";
const { Option } = Select;

/**
 * @todo select dropdown should be searchable
 * @returns component
 */
const CreateBus = () => {
  const { stations, routes, routesLoading, stationsLoading } = useAppState();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const setRoutesData = (data) => {
    dispatch({ type: "setRoutes", payload: data });
  };
  const setStationsData = (data) => {
    dispatch({ type: "setStations", payload: data });
  };
  const setStationsLoading = (status) => {
    dispatch({ type: "setStationsLoading", payload: status });
  };
  const setRoutesLoading = (status) => {
    dispatch({ type: "setRoutesLoading", payload: status });
  };
  const onFinish = async (values) => {
    if (values?.status == undefined || values?.status == false) {
      values.status = 0;
    } else {
      values.status = 1;
    }
    const response = await httpService.post(urlService.createBusUrl(), values);
    if (!response.data?.error) {
      message.success(`Bus ${response.data?.buses?.busCode} is Created`);
      form.resetFields();
    } else {
      message.error(response.data?.error?.busCode);
    }
  };
  const loadSelectOptions = useCallback(async () => {
    setRoutesLoading(true);
    setStationsLoading(true);
    const routeResponse = await httpService.get(urlService.getRoutesUrl());
    if (routeResponse?.data) {
      setRoutesData(routeResponse.data);
    }
    setRoutesLoading(false);
    const stationResponse = await httpService.get(urlService.getStationsUrl());
    if (stationResponse?.data) {
      setStationsData(stationResponse.data);
    }
    setStationsLoading(false);
  });
  useEffect(() => {
    loadSelectOptions();
  }, []);
  return (
    <Row justify="center" className={"card create-bus"}>
      <Form name="create-bus" form={form} onFinish={onFinish}>
        <Form.Item
          name="busCode"
          rules={[
            {
              required: true,
              message: "Please input your bus code!",
            },
          ]}
        >
          <Input placeholder="bus code" />
        </Form.Item>
        <Form.Item
          name="routeId"
          rules={[
            {
              required: true,
              message: "Please select route!",
            },
          ]}
        >
          <Select placeholder="Select route" allowClear loading={routesLoading}>
            {routes?.data?.map((item) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="stationId"
          rules={[
            {
              required: true,
              message: "Please select a bus stop!",
            },
          ]}
        >
          <Select
            placeholder="Select station"
            allowClear
            loading={stationsLoading}
          >
            {stations?.data?.map((item) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.stationCode} - {item.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Active" name="status">
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default CreateBus;
