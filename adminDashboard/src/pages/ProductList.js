import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Edit, Trash2, Package, Plus, Eye } from 'lucide-react';

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
  const navigate = useNavigate();
  const { loading: productsLoading, error: productsError, data, refetch: refetchProducts } = useQuery(GET_PRODUCTS);
  const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_CATEGORIES);
  const [updateStockQuantityMutation] = useMutation(UPDATE_STOCK_QUANTITY);
  const [deleteProductMutation] = useMutation(DELETE_PRODUCT);

  const getCategoryNameById = (categoryId) => {
    const category = categoriesData?.getAllCategories.find((cat) => cat.category_id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const [editingStock, setEditingStock] = useState(null);
  const [newStockQuantity, setNewStockQuantity] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleUpdateStockQuantity = async (productId, stockQuantity) => {
    try {
      await updateStockQuantityMutation({
        variables: { product_id: productId, stock_quantity: parseInt(newStockQuantity) } 
      });
      setEditingStock(null);
      setNewStockQuantity('');
      refetchProducts();
    } catch (error) {
      console.error('Error updating stock quantity:', error.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProductMutation({
        variables: { product_id: productId }
      });
      setDeleteDialogOpen(false);
      setProductToDelete(null);
      refetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  const openDeleteDialog = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const openEditStock = (product) => {
    setEditingStock(product.product_id);
    setNewStockQuantity(product.stock_quantity.toString());
  };



  if (productsLoading || categoriesLoading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading products...</p>
      </div>
    </div>
  );
  
  if (productsError || categoriesError) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center text-destructive">
        <p>Error loading products: {productsError?.message || categoriesError?.message}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory and stock levels
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product Inventory ({data.products.length} items)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.products.map((product) => (
                <TableRow key={product.product_id}>
                  <TableCell>
                    <img 
                      src={product.image || '/placeholder-product.jpg'} 
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getCategoryNameById(product.category_id)}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.price} Birr</TableCell>
                  <TableCell>
                    <Badge 
                      variant={product.stock_quantity < 10 ? "destructive" : "default"}
                    >
                      {product.stock_quantity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/admin/product-detail/${product.product_id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditStock(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openDeleteDialog(product)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Stock Dialog */}
      <Dialog open={editingStock !== null} onOpenChange={() => setEditingStock(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Stock Quantity</DialogTitle>
            <DialogDescription>
              Enter the new stock quantity for this product.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              type="number"
              value={newStockQuantity}
              onChange={(e) => setNewStockQuantity(e.target.value)}
              placeholder="Enter stock quantity"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingStock(null)}>
              Cancel
            </Button>
            <Button onClick={() => handleUpdateStockQuantity(editingStock, newStockQuantity)}>
              Update Stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => handleDeleteProduct(productToDelete?.product_id)}
            >
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductList;
