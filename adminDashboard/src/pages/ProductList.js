import React from 'react';
import { Table, Button, message } from 'antd';
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

const ProductList = () => {
  const { loading: productsLoading, error: productsError, data, refetch: refetchProducts } = useQuery(GET_PRODUCTS);
  const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_CATEGORIES);
  const [updateStockQuantityMutation] = useMutation(UPDATE_STOCK_QUANTITY);

  const getCategoryNameById = (categoryId) => {
    const category = categoriesData?.getAllCategories.find((cat) => cat.category_id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const handleUpdateStockQuantity = async (productId, stockQuantity) => {
    try {
      const { data } = await updateStockQuantityMutation({
        variables: { product_id: productId, stock_quantity: stockQuantity + 1 } // Increment stock quantity by 1
      });
      message.success('Stock quantity updated successfully');
      refetchProducts(); // Refetch products after updating stock
    } catch (error) {
      console.error('Error updating stock quantity:', error.message);
      message.error('Failed to update stock quantity');
    }
  };

  const columns = [
    {
      title: 'SNo',
      key: 'sno',
      render: (text, record, index) => index + 1,
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
      title: 'Stock Quantity',
      dataIndex: 'stock_quantity',
      key: 'stock_quantity',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" onClick={() => handleUpdateStockQuantity(record.product_id, record.stock_quantity)}>Edit Stock 1</Button>
      ),
    },
  ];

  if (productsLoading || categoriesLoading) return <p>Loading...</p>;
  if (productsError || categoriesError) return <p>Error: {productsError || categoriesError}</p>;

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
