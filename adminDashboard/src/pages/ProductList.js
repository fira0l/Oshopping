import React, { useState } from 'react';
import { Table, Button, message, Popconfirm } from 'antd';
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
      stock_quantity
    }
  }
`;

const GET_CATEGORIES = gql`
  {
    getAllCategories {
      category_id
      name
    }
  }
`;

const UPDATE_STOCK_QUANTITY = gql`
  mutation UpdateStockQuantity($product_id: ID!, $stock_quantity: Int!) {
    updateStockQuantity(product_id: $product_id, stock_quantity: $stock_quantity) {
      product_id
      stock_quantity
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
  const [currentPage, setCurrentPage] = useState(1);
  const { loading: productsLoading, error: productsError, data, refetch: refetchProducts } = useQuery(GET_PRODUCTS);
  const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_CATEGORIES);
  const [updateStockQuantityMutation] = useMutation(UPDATE_STOCK_QUANTITY);
  const [deleteProductMutation] = useMutation(DELETE_PRODUCT);

  const getCategoryNameById = (categoryId) => {
    const category = categoriesData?.getAllCategories.find((cat) => cat.category_id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const handleUpdateStockQuantity = async (productId, stockQuantity) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = await updateStockQuantityMutation({
        variables: { product_id: productId, stock_quantity: stockQuantity + 1 } 
      });
      message.success('Stock quantity updated successfully');
      refetchProducts(); // Refetch products after updating stock
    } catch (error) {
      console.error('Error updating stock quantity:', error.message);
      message.error('Failed to update stock quantity');
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProductMutation({
        variables: { product_id: productId }
      });
      message.success('Product deleted successfully');
      refetchProducts(); // Refetch products after deleting
    } catch (error) {
      console.error('Error deleting product:', error.message);
      message.error('Failed to delete product');
    }
  };

  const columns = [
    {
      title: 'SNo',
      dataIndex: 'sno',
      key: 'sno',
      render: (text, record, index) => index + 1 + (currentPage - 1) * 10,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="Product" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category_id',
      key: 'category',
      render: (category_id) => getCategoryNameById(category_id),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock Quantity',
      dataIndex: 'stock_quantity',
      key: 'stock_quantity',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => handleUpdateStockQuantity(record.product_id, record.stock_quantity)}>Edit Stock 1</Button>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDeleteProduct(record.product_id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" style={{ marginLeft: 10, color: 'red' }}>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  if (productsLoading || categoriesLoading) return <p>Loading...</p>;
  if (productsError || categoriesError) return <p>Error: {productsError || categoriesError}</p>;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const productsWithSNo = data.products.map((product, index) => ({ ...product, sno: index }));

  return (
    <div>
      <h3 className='mb-4 title'>Products</h3>
      <div>
        <Table
          columns={columns}
          dataSource={productsWithSNo}
          rowKey="product_id"
          pagination={{ onChange: handlePageChange }}
        />
      </div>
    </div>
  );
};

export default ProductList;
