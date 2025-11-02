import React from 'react';
import { Table } from 'antd';
import { gql, useQuery } from '@apollo/client';

const GET_CATEGORIES = gql`
  {
    getAllCategories {
      category_id
      name
      parent_category_id
      parent_category {
        category_id
        name
      }
    }
  }
`;

const columns = [
  {
    title: 'S.No',
    dataIndex: 'number',
    width: 80,
    align: 'center',
  },
  {
    title: 'Category ID',
    dataIndex: 'category_id',
    width: 120,
    align: 'center',
  },
  {
    title: 'Category Name',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: 'Parent Category',
    dataIndex: 'parent_category_name',
    width: 200,
    render: (text) => text || 'Main Category',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: 120,
    align: 'center',
    render: (text, record) => (
      <span className={`px-2 py-1 rounded text-xs font-medium ${
        record.parent_category_id ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
      }`}>
        {record.parent_category_id ? 'Subcategory' : 'Main Category'}
      </span>
    ),
  },
];

const CategoryList = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;

  const categoriesWithNumbers = data.getAllCategories.map((category, index) => ({
    ...category,
    number: index + 1,
    parent_category_name: category.parent_category?.name,
  }));

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-800">Product Categories</h3>
          <p className="text-gray-600 mt-1">Manage your product categories and subcategories</p>
        </div>
        <div className="p-6">
          <Table 
            columns={columns} 
            dataSource={categoriesWithNumbers} 
            rowKey="category_id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} categories`,
            }}
            className="custom-table"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
