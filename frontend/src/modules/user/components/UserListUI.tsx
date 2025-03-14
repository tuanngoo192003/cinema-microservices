import React, {useState} from "react";
import {Divider, Radio, Space, Table, Tag} from 'antd';
import type { TableProps } from 'antd';

const { Column, ColumnGroup } = Table;

interface DataType {
    key: React.Key;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    tags: string[];
}

const data: DataType[] = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
        disabled: record.key === '1', // Column configuration not to be checked
        name: record.firstName,
    }),
};

export const UserList: React.FC = () => {
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    return (
        <>
            <div>
                <Radio.Group onChange={(e) => setSelectionType(e.target.value)} value={selectionType}>
                    <Radio value="checkbox">Checkbox</Radio>
                    <Radio value="radio">radio</Radio>
                </Radio.Group>
                <Divider />
                <Table<DataType>
                    style={{ marginTop: "4rem"}}
                    rowSelection={{ type: selectionType, ...rowSelection }}
                    pagination={{ pageSize: 5 }}
                    dataSource={data}
                >
                    <ColumnGroup title="Name">
                        <Column title="First Name" dataIndex="firstName" key="firstName" />
                        <Column title="Last Name" dataIndex="lastName" key="lastName" />
                    </ColumnGroup>
                    <Column title="Age" dataIndex="age" key="age" />
                    <Column title="Address" dataIndex="address" key="address" />
                    <Column
                        title="Tags"
                        dataIndex="tags"
                        key="tags"
                        render={(tags: string[]) => (
                            <>
                                {tags.map((tag) => {
                                    let color = tag.length > 5 ? 'geekblue' : 'green';
                                    if (tag === 'loser') {
                                        color = 'volcano';
                                    }
                                    return (
                                        <Tag color={color} key={tag}>
                                            {tag.toUpperCase()}
                                        </Tag>
                                    );
                                })}
                            </>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(_: any, record: DataType) => (
                            <Space size="middle">
                                <a>Invite {record.lastName}</a>
                                <a>Delete</a>
                            </Space>
                        )}
                    />
                </Table>
            </div>
        </>
    )
}