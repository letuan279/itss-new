import React, {useEffect, useState} from 'react'
import { Card, Table, Row, Col, Button, Input, Modal, Descriptions, Tag, Space, message, Popconfirm } from 'antd';
import { useData } from '../../context/AppContext';
import ThemThanhVienModal from './ThemThanhVienModal';
import { BACK_END_URL } from '../../context/const';

const NhomChiTiet = (props) => {
    const { id } = props.match.params;
    const {user, group, fetchNhom} = useData()
    const members = group.find(i => i.id == id)?.members
    const columnMembers = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: '30%'
        },
        {
            title: 'Vai trò',
            render: item => {
                if(item.isLeader) return <Tag color='green'>trưởng nhóm</Tag>
                return <Tag color='blue'>thành viên</Tag>
            },
            width: '15%'
        },
        {
            title: 'Thao tác',
            render: (text, record) => 
                {
                    const ans = (<div onClick={e => e.stopPropagation()}>
                                    <Popconfirm
                                        title="Xóa thành viên"
                                        description="Bạn có chắc chắn muốn xóa"
                                        okText="OK"
                                        cancelText="NO"
                                    >
                                        <Button onClick={() => handleDeleteThanhVien(record.id, parseInt(id))} size='small' style={{marginLeft: 5}} type='danger'>Xóa</Button>
                                    </Popconfirm>
                                </div>)
                    const idLeader = members.filter(item => item.isLeader)[0]?.id
                    if(idLeader === user[0]?.id && record.id !== idLeader) return ans
                    else return <></>
                },
          }
    ]

    const handleDeleteThanhVien = async (idUser, idGroup) => {
        try {
            const options = {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({idUser, idGroup})
            }
            const res = await fetch(`${BACK_END_URL}member/delete`, options)
            const data = await res.json()
            if(data.success === true){
                fetchNhom()
                message.success('Xóa thành công')
            }else {
                message.warning('Xóa thất bại')
            }
        } catch (error) {
            message.warning("lỗi: " + error.message)
        }
    }

    const columnMarket = []

    const [addThanhVienModalVisible, setAddThanhVienModalVisible] = useState(false);
    const handleAddThanhVien = () => {
        setAddThanhVienModalVisible(true);
    };

    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={16}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Chia sẻ món đồ cần mua"
                        extra={
                            <Space>
                                <Space>
                                    
                                </Space>
                            </Space>
                        }>
                        <Table 
                            pagination={false} 
                            columns={columnMarket} 
                            dataSource={[]}
                            className="ant-border-space"
                        />
                        </Card>
                </Col>
                <Col xs="24" xl={8}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Thành viên"
                        extra={
                            <Space>
                                <Space>
                                    <Button type="primary" onClick={handleAddThanhVien}>Thêm thành viên</Button>
                                </Space>
                            </Space>
                        }>
                        <Table 
                            pagination={false} 
                            columns={columnMembers} 
                            dataSource={members}
                            className="ant-border-space"
                        />
                    </Card>
                    { addThanhVienModalVisible && <ThemThanhVienModal 
                        editModalVisible={addThanhVienModalVisible}
                        setEditModalVisible={setAddThanhVienModalVisible}
                        idGroup={id}
                        />}
                </Col>
            </Row>
        </div>    
    )
}

export default NhomChiTiet