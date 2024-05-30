import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { message, Select } from 'antd';
import Upload from './ExampleComponent';

const { Option } = Select;

const ADD_PRODUCT_MUTATION = gql`
  mutation CreateProduct(
    $name: String!,
    $description: String!,
    $price: Float!,
    $category_id: ID!,
    $seller_id: ID!,
    $stock_quantity: Int!,
  ) {
    createProduct(
      name: $name,
      description: $description,
      price: $price,
      category_id: $category_id,
      seller_id: $seller_id,
      stock_quantity: $stock_quantity,
    ) {
      product_id
      name
      description
      price
      category_id
      seller_id
      stock_quantity
    }
  }
`;

const GET_CATEGORIES_QUERY = gql`
  query GetCategories {
    getAllCategories {
      category_id
      name
    }
  }
`;

const GET_SELLERS_QUERY = gql`
  query GetSellers {
    sellers {
      seller_id
      username
    }
  }
`;

const Product = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [productNameForUpload, setProductNameForUpload] = useState('');

  const [createProduct] = useMutation(ADD_PRODUCT_MUTATION);
  const { loading: categoriesLoading, data: categoriesData } = useQuery(GET_CATEGORIES_QUERY);
  const { loading: sellersLoading, data: sellersData } = useQuery(GET_SELLERS_QUERY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createProduct({
        variables: {
          name,
          description,
          price: parseFloat(price),
          category_id: categoryId,
          seller_id: sellerId,
          stock_quantity: parseInt(stockQuantity),
        },
      });
      message.success('Product added successfully');
      setProductNameForUpload(name); // Preserve the product name for upload
      // Clear other form fields but not the name
      setDescription('');
      setPrice('');
      setStockQuantity('');
      setCategoryId('');
      setSellerId('');
    } catch (err) {
      console.error('Error creating product:', err);
      message.error(err.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <h3 className='mb-4 title'>Add Product</h3>
      <div>
        {loading && <p>Submitting...</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">Product Name:</label>
            <input type="text" className="form-control" id="productName" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="productDescription" className="form-label">Product Description:</label>
            <input type="text" className="form-control" id="productDescription" value={description} onChange={e => setDescription(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">Product Price:</label>
            <input 
              type="number" 
              className="form-control" 
              id="productPrice" 
              value={price} 
              onChange={e => {
                const newValue = e.target.value;
                // Check if the new value is valid (greater than 0)
                if (newValue > 0 || newValue === '') {
                  setPrice(newValue);
                }
              }} 
              step="0.01" 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productQuantity" className="form-label">Product Quantity:</label>
            <input 
              type="number" 
              className="form-control" 
              id="productQuantity" 
              value={stockQuantity} 
              onChange={e => {
                const newValue = e.target.value;
                // Check if the new value is valid (greater than 0)
                if (newValue > 0 || newValue === '') {
                  setStockQuantity(newValue);
                }
              }} 
              required 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="categoryId" className="form-label">Category:</label>
            <Select value={categoryId} onChange={value => setCategoryId(value)} style={{ width: '100%' }} loading={categoriesLoading}>
              {categoriesData && categoriesData.getAllCategories.map(category => (
                <Option key={category.category_id} value={category.category_id}>{category.name}</Option>
              ))}
            </Select>
          </div>
          <div className="mb-3">
            <label htmlFor="sellerId" className="form-label">Seller:</label>
            <Select value={sellerId} onChange={value => setSellerId(value)} style={{ width: '100%' }} loading={sellersLoading}>
              {sellersData && sellersData.sellers.map(seller => (
                <Option key={seller.seller_id} value={seller.seller_id}>{seller.username}</Option>
              ))}
            </Select>
          </div>
          <button className='btn btn-success border-0 rounded-3 my-5' type="submit">Add Product</button>
        </form>
        
        <Upload name={productNameForUpload} clearForm={() => setName('')} />
      </div>
    </div>
  );
};

export default Product;
