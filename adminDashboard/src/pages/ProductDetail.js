import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ArrowLeft, Package, DollarSign, Warehouse, Tag } from 'lucide-react';

const GET_PRODUCT_BY_ID = gql`
  query GetProduct($product_id: ID!) {
    product(product_id: $product_id) {
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

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { loading: productLoading, error: productError, data: productData } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { product_id: id }
  });
  
  const { loading: categoriesLoading, data: categoriesData } = useQuery(GET_CATEGORIES);

  const getCategoryName = (categoryId) => {
    const category = categoriesData?.getAllCategories.find((cat) => cat.category_id === categoryId);
    return category ? category.name : 'Unknown';
  };

  if (productLoading || categoriesLoading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading product details...</p>
      </div>
    </div>
  );

  if (productError) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center text-destructive">
        <p>Error loading product: {productError.message}</p>
      </div>
    </div>
  );

  const product = productData?.product;

  if (!product) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <p>Product not found</p>
      </div>
    </div>
  );

  return (
    <div className=" space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/product-list')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          <p className="text-muted-foreground">Product Details</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Product Image */}
        <Card>
          <CardContent className="p-6">
            <img
              src={product.image || '/placeholder-product.jpg'}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg border"
            />
          </CardContent>
        </Card>

        {/* Product Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="text-lg font-semibold">{product.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-sm">{product.description || 'No description available'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Category</label>
                  <div className="mt-1">
                    <Badge variant="outline" className="flex items-center gap-1 w-fit">
                      <Tag className="h-3 w-3" />
                      {getCategoryName(product.category_id)}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Product ID</label>
                  <p className="text-sm font-mono">{product.product_id}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing & Inventory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Price</label>
                  <p className="text-2xl font-bold text-primary">{product.price} Birr</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Stock Quantity</label>
                  <div className="mt-1">
                    <Badge 
                      variant={product.stock_quantity < 10 ? "destructive" : "default"}
                      className="flex items-center gap-1 w-fit"
                    >
                      <Warehouse className="h-3 w-3" />
                      {product.stock_quantity} units
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Seller ID</label>
                <p className="text-sm font-mono">{product.seller_id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;