import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Upload,
    message,
    Progress,
    Button,
    Avatar,
    Typography,
    Form,
    Input,
    Modal,
    DatePicker,
    Tag,
    Select,
    Popconfirm,
    InputNumber
} from "antd";
import { ToTopOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
// import { personalData } from "./data";
import { useState } from "react";
import moment from "moment";
import { useData } from "../context/AppContext";
// var fs = require('bro-fs');

const { Title } = Typography;

const CreateForm = (props) => {
    const { visible, setVisible, onCreate } = props;
    const [form] = Form.useForm();

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const handleCreate = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                onCreate(values);
            })

            .catch((info) => {
                console.log("Validate Failed:", info);
            });
        setVisible(false);
    };
    return (
        <Modal
            visible={visible}
            title="Thêm công việc mới"
            okText="Ok"
            onCancel={() => {
                setVisible(false);
            }}
            onOk={handleCreate}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Tên công việc"
                    name="title"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <Input style={{ fontWeight: 400, color: "black" }} />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="desc"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <Input.TextArea style={{ fontWeight: 400, color: "black" }} />
                </Form.Item>
                <Form.Item
                    label="Nơi làm việc"
                    name="work"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <Select options={[
                        {
                            value: 'Phòng nghiên cứu',
                            label: 'Phòng nghiên cứu'
                        },
                        {
                            value: 'Trường đại học',
                            label: 'Trường đại học'
                        },
                        {
                            value: 'Chỗ làm thêm',
                            label: 'Chỗ làm thêm'
                        }
                    ]} />
                </Form.Item>
                <Form.Item
                    name="startDay"
                    label="Ngày bắt đầu"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <DatePicker onChange={onChange} style={{ width: '60%', height: '35px' }} />
                </Form.Item>
                <Form.Item
                    name="endDay"
                    label="Dự kiến kết thúc"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <DatePicker onChange={onChange} style={{ width: '60%', height: '35px' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

function convertPercentToNumber(percentString) {
    // Bỏ ký tự % cuối chuỗi
    percentString = percentString.slice(0, -1);
    // Chuyển chuỗi thành số nguyên
    return parseInt(percentString);
}

const returnTag = (string) => {
    if (string === "Done") return <Tag color="green">Done</Tag>
    if (string === "In progress") return <Tag color="blue">In progress</Tag>
    if (string === "Todo") return <Tag color="red">Todo</Tag>
}

const EditForm = ({ visible, onCreate, onCancel, initialValues }) => {
    const [form] = Form.useForm();
    return (
        <Modal visible={visible} title="Chỉnh sửa công việc" okText="Save" cancelText="Cancel" onCancel={onCancel} onOk={() => {
            form.validateFields().then((values) => {
                form.resetFields();
                onCreate(values);
            }).catch((info) => {
                console.log('Validate Failed:', info);
            });
        }}>
            <Form form={form} initialValues={initialValues} layout="vertical">
                <Form.Item style={{ display: 'none' }} name="key">
                    <Input type="hidden" />
                </Form.Item>
                <Form.Item
                    label="Tên công việc"
                    name="name"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <Input style={{ fontWeight: 400, color: "black" }} />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="desc"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <Input.TextArea style={{ fontWeight: 400, color: "black" }} />
                </Form.Item>
                <Form.Item
                    label="Nơi làm việc"
                    name="work"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <Select options={[
                        {
                            value: 'Phòng nghiên cứu',
                            label: 'Phòng nghiên cứu'
                        },
                        {
                            value: 'Trường đại học',
                            label: 'Trường đại học'
                        },
                        {
                            value: 'Chỗ làm thêm',
                            label: 'Chỗ làm thêm'
                        }
                    ]} />
                </Form.Item>
                <Form.Item
                    label="Trạng thái"
                    name="state"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <Select options={[
                        {
                            value: 'Todo',
                            label: 'Todo'
                        },
                        {
                            value: 'In progress',
                            label: 'In progress'
                        },
                        {
                            value: 'Done',
                            label: 'Done'
                        }
                    ]} />
                </Form.Item>
                <Form.Item
                    name="completion"
                    label="Mức độ hoàn thiện (%)"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <InputNumber min={0} max={100} />
                </Form.Item>
                <Form.Item
                    name="startDay"
                    label="Ngày bắt đầu"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <DatePicker style={{ width: '60%', height: '35px' }} />
                </Form.Item>
                <Form.Item
                    name="endDay"
                    label="Dự kiến kết thúc"
                    rules={[
                        { required: true, message: "Please input this field" }
                    ]}
                >
                    <DatePicker style={{ width: '60%', height: '35px' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};



function Tasks() {
    const { dataJson, setDataJson } = useData()
    const dataShow = dataJson.dataPersonal.sort((a, b) => convertPercentToNumber(a.Result) - convertPercentToNumber(b.Result))
    const dataReal = dataShow.map((item, index) => {
        return {
            key: item.TaskName,
            name: item.TaskName,
            from: item.StartDate,
            to: item.EndDate,
            state: item.State,
            desc: item.Description,
            work: item.Work,
            completion: convertPercentToNumber(item.Result)
        }
    })

    const [data, setData] = useState(dataReal)
    const [visible, setVisible] = useState(false);

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const handleEdit = (record) => {
        setSelectedRecord(record);
        setEditModalVisible(true);
    };

    const handleDelete = (record) => {
        // TODO: handle delete record
        const newData = data.filter((item) => item.key !== record.key);
        setData(newData)
        message.success("Xóa thành công!")
    };

    const handleEditSubmit = (values) => {
        // TODO: handle edit record
        console.log('Edit form submitted:', values);

        setData(data.map(item => {
            if (item.key === values.key) {
                return {
                    key: values.key,
                    name: values.name,
                    from: values.startDay.format("DD/MM/YYYY"),
                    to: values.endDay.format("DD/MM/YYYY"),
                    state: values.state,
                    desc: values.desc,
                    work: values.work,
                    completion: values.completion
                }
            }
            return item;
        }))

        message.success("Cập nhật thành công")

        const newDataPerson = dataJson.dataPersonal.map(item => {
            if (item.key === values.key) {
                return {
                    "id": `${dataJson.dataPersonal.length + 1}`,
                    "TaskName": values.name,
                    "State": values.state,
                    "StartDate": values.startDay.format("DD/MM/YYYY"),
                    "EndDate": values.endDay.format("DD/MM/YYYY"),
                    "Result": `${values.completion}%`,
                    "Description": values.desc,
                    "Work": values.work,
                }
            }
            return item
        })

        setDataJson({
            ...dataJson,
            dataPersonal: newDataPerson
        })

        setEditModalVisible(false);
    };

    const project = [
        {
            title: "TÊN CÔNG VIỆC",
            dataIndex: "name",
            width: "25%",
        },
        {
            title: "BẮT ĐẦU",
            dataIndex: "from",
            render: item => moment.isMoment(item) ? item.format("DD/MM/YYYY") : item
        },
        {
            title: "THỜI HẠN",
            dataIndex: "to",
            render: item => moment.isMoment(item) ? item.format("DD/MM/YYYY") : item
        },
        {
            title: "Nơi làm việc",
            dataIndex: "work",
            filters: [
                {
                    text: 'Trường đại học',
                    value: 'Trường đại học',
                },
                {
                    text: 'Nơi thực tập',
                    value: 'Nơi thực tập',
                },
                {
                    text: 'Phòng nghiên cứu',
                    value: 'Phòng nghiên cứu',
                },
            ],
            onFilter: (value, record) => record.work.indexOf(value) === 0,
            render: work => (<span style={{ padding: "2px 5px", borderRadius: "5px", background: "#a1af2f", color: "white", fontWeight: 600 }} >{work}</span>)
        },
        {
            title: "TRẠNG THÁI",
            dataIndex: "state",
            render: item => returnTag(item),
            filters: [
                {
                    text: 'Todo',
                    value: 'Todo',
                },
                {
                    text: 'In progress',
                    value: 'In progress',
                },
                {
                    text: 'Done',
                    value: 'Done',
                },
            ],
            onFilter: (value, record) => record.state.indexOf(value) === 0,
        },
        {
            title: "MỨC ĐỘ HOÀN THIỆN",
            dataIndex: "completion",
            render: item => (
                <>
                    <div className="ant-progress-project">
                        <Progress percent={item} size="small" />
                    </div>
                </>
            ),
        },
        {
            title: "THAO TÁC",
            render: (text, record) => (
                <div onClick={e => e.stopPropagation()}>
                    <Button type="primary" onClick={() => handleEdit(record)}>Sửa</Button>
                    <Popconfirm
                        title="Bạn có chắc chắn?"
                        onConfirm={() => handleDelete(record)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="danger" style={{ marginLeft: 5 }}>Xóa</Button>
                    </Popconfirm>

                </div>
            ),
        },
    ];

    const onChange = async (e) => {
        setData([
            {
                key: e.title,
                name: e.title,
                from: e.startDay.format("DD/MM/YYYY"),
                to: e.endDay.format("DD/MM/YYYY"),
                state: "Todo",
                desc: e.desc,
                work: e.work,
                completion: convertPercentToNumber("0%")
            },
            ...data,
        ])
        message.success("Tạo mới thành công!")
        setDataJson({
            ...dataJson,
            dataPersonal: [
                ...dataJson.dataPersonal,
                {
                    "id": `${dataJson.dataPersonal.length + 1}`,
                    "TaskName": e.title,
                    "State": "Todo",
                    "StartDate": e.startDay.format("DD/MM/YYYY"),
                    "EndDate": e.endDay.format("DD/MM/YYYY"),
                    "Result": "0%",
                    "Description": e.desc,
                    "Work": e.work,
                },
            ]
        })
    }
    const onCreate = (values) => {
        onChange(values);
        setVisible(false);
    };

    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (record, rowIndex) => {
        setSelectedRow(record);
    };

    const handleModalClose = () => {
        setSelectedRow(null);
    };

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Danh sách"
                            extra={
                                <>
                                    <Button
                                        type="primary"
                                        onClick={() => setVisible(true)}
                                    >
                                        <PlusCircleOutlined />
                                        Thêm
                                    </Button>
                                    <CreateForm
                                        visible={visible}
                                        setVisible={setVisible}
                                        onCreate={onCreate}
                                    />
                                </>
                            }
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={project}
                                    dataSource={data}
                                    pagination={false}
                                    className="ant-border-space"
                                    onRow={(record, rowIndex) => {
                                        return {
                                            onClick: () => {
                                                handleRowClick(record, rowIndex);
                                            },
                                        };
                                    }}
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Modal
                    visible={selectedRow !== null}
                    title={<span style={{ fontWeight: 600 }}>Thông tin chi tiết</span>}
                    onCancel={handleModalClose}
                    footer={null}
                >
                    {selectedRow !== null && (
                        <div>
                            <p>Tên: {<span style={{ fontWeight: 600 }}>{selectedRow.name}</span>}</p>
                            <p>Mô tả: {selectedRow.desc}</p>
                            <p>Bắt đầu: {selectedRow.from}</p>
                            <p>Thời hạn: {selectedRow.to}</p>
                        </div>
                    )}
                </Modal>
                {selectedRecord && (
                    <EditForm
                        visible={editModalVisible}
                        onCreate={handleEditSubmit}
                        onCancel={() => {
                            setEditModalVisible(false);
                            setSelectedRecord(null);
                        }}
                        initialValues={selectedRecord}
                    />
                )}
            </div>
        </>
    );
}

export default Tasks;