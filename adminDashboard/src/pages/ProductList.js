import React from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  {
    products {
      product_id
      name
      description
      price
      category_id
      seller_id
      image
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($product_id: ID!) {
    deleteProduct(product_id: $product_id) {
      product_id
    }
  }
`;

const ProductList = () => {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const handleDelete = async (productId) => {
    try {
      await deleteProduct({ variables: { product_id: productId } });
      message.success('Product deleted successfully');
      // Refetch products after deletion
      refetch();
    } catch (error) {
      console.error('Error deleting product:', error.message);
      message.error('Failed to delete product');
    }
  };

  const columns = [
    {
      title: 'SNo',
      key: 'sno',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="Product" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete this product?"
          onConfirm={() => handleDelete(record.product_id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" size="small" style={{color: 'red' }}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3 className='mb-4 title'>Products</h3>
      <div>
        <Table 
          columns={columns} 
          dataSource={data.products} 
          rowKey="product_id" // Provide a unique key for each row
        />
      </div>
    </div>
  );
};

export default ProductList;
