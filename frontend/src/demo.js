import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button } from 'antd';
import { fetchPeople, updatePerson, removePerson, addPerson } from './api';
const originData = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [loadPersons, setLoadPersons] = useState([]);

  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    fetchPeople().then(async (response) => {
      const results = await response.json();
      setData(results);
    });
  }, loadPersons);

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const add = () => {
    const newData = [
      {
        name: '',
        address: '',
        age: '',
        key: '---',
        id: '---',
      },
      ...data
    ];

    setData(newData);
    setEditingKey('---');

    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
    });
  }

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1 && key != '---') {
        const item = newData[index];
        newData.splice(index, 1, {...item, ...row});
        setData(newData);
        updatePerson({
          ...row,
          id: key,
        }).then(data => {
          setEditingKey('');
        });
      } else {
        addPerson(row).then((data)=>{
          newData.splice(index, 1, data);
          setData(newData);
          setEditingKey('');
        });
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const remove = async (record) => {
    try {
      const {key} = record;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        removePerson(record);
        newData.splice(index, 1);
        setData(newData);
      }

    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  }

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
            &nbsp;&nbsp;
            <Typography.Link disabled={editingKey !== ''} onClick={() => remove(record)}>
              Delete
            </Typography.Link>
          </span>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Button onClick={()=>add()} disabled={editingKey !== ''} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default () => <EditableTable />;