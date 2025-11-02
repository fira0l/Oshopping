import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import Upload from './ExampleComponent';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Plus, Package } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

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
      // Success message - you can add toast notification here
      setProductNameForUpload(name); // Preserve the product name for upload
      // Clear other form fields but not the name
      setDescription('');
      setPrice('');
      setStockQuantity('');
      setCategoryId('');
      setSellerId('');
    } catch (err) {
      console.error('Error creating product:', err);
      console.error('Failed to add product:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Product</h1>
          <p className="text-muted-foreground">Create a new product for your inventory</p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          New Product
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Product Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="mb-4 p-3 bg-primary/10 text-primary rounded-md text-sm">
                Submitting product...
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="productName" className="text-sm font-medium">Product Name *</label>
                <Input 
                  type="text" 
                  id="productName" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="Enter product name"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="productDescription" className="text-sm font-medium">Description *</label>
                <Input 
                  type="text" 
                  id="productDescription" 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  placeholder="Enter product description"
                  required 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="productPrice" className="text-sm font-medium">Price (Birr) *</label>
                  <Input 
                    type="number" 
                    id="productPrice" 
                    value={price} 
                    onChange={e => {
                      const newValue = e.target.value;
                      if (newValue > 0 || newValue === '') {
                        setPrice(newValue);
                      }
                    }} 
                    step="0.01" 
                    placeholder="0.00"
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="productQuantity" className="text-sm font-medium">Stock Quantity *</label>
                  <Input 
                    type="number" 
                    id="productQuantity" 
                    value={stockQuantity} 
                    onChange={e => {
                      const newValue = e.target.value;
                      if (newValue > 0 || newValue === '') {
                        setStockQuantity(newValue);
                      }
                    }} 
                    placeholder="0"
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category *</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {categoryId ? 
                        categoriesData?.getAllCategories.find(cat => cat.category_id === categoryId)?.name || 'Select Category'
                        : 'Select Category'
                      }
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    {categoriesData?.getAllCategories.map(category => (
                      <DropdownMenuItem 
                        key={category.category_id} 
                        onClick={() => setCategoryId(category.category_id)}
                      >
                        {category.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Seller *</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {sellerId ? 
                        sellersData?.sellers.find(seller => seller.seller_id === sellerId)?.username || 'Select Seller'
                        : 'Select Seller'
                      }
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    {sellersData?.sellers.map(seller => (
                      <DropdownMenuItem 
                        key={seller.seller_id} 
                        onClick={() => setSellerId(seller.seller_id)}
                      >
                        {seller.username}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Button type="submit" disabled={loading} className="w-full" size="lg">
                {loading ? 'Adding Product...' : 'Add Product'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Product Image</CardTitle>
          </CardHeader>
          <CardContent>
            <Upload name={productNameForUpload} clearForm={() => setName('')} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Product;
