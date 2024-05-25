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
    title: 'SNo',
    dataIndex: 'number',
  },
  {
    title: 'Name of Categories',
    dataIndex: 'name',
  },

];




const CategoryList = () => {
  // Use useQuery hook to execute the GraphQL query
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const categoriesWithNumbers = data.getAllCategories.map((category, index) => ({
    ...category,
    number: index+1,
  }));

  return (
    <div>
      <h3 className='mb-4 title'>Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={categoriesWithNumbers} rowKey="category_id"  />
      </div>
    </div>
  );
};

export default CategoryList;
