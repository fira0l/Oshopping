import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';

const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($name: String!) {
    createCategory(name: $name) {
      category_id
      name
    }
  }
`;

const CREATE_SUBCATEGORY_MUTATION = gql`
  mutation CreateSubCategory($name: String!, $parentCategoryId: ID!) {
    createSubCategory(name: $name, parent_category_id: $parentCategoryId) {
      category_id
      name
      parent_category_id
    }
  }
`;

const GET_CATEGORIES_QUERY = gql`
  query GetCategories {
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

const Category = () => {
  const [categoryName, setCategoryName] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');

  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION, {
    refetchQueries: [{ query: GET_CATEGORIES_QUERY }]
  });
  const [createSubCategory] = useMutation(CREATE_SUBCATEGORY_MUTATION, {
    refetchQueries: [{ query: GET_CATEGORIES_QUERY }]
  });
  
  const { loading, error, data } = useQuery(GET_CATEGORIES_QUERY);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    try {
      await createCategory({ variables: { name: categoryName } });
      setCategoryName('');
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  const handleSubCategorySubmit = async (e) => {
    e.preventDefault();
    if (!subcategoryName.trim() || !parentCategoryId) return;
    try {
      await createSubCategory({ variables: { name: subcategoryName, parentCategoryId } });
      setSubcategoryName('');
      setParentCategoryId('');
    } catch (error) {
      console.error('Failed to add subcategory:', error);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;

  const categories = data.getAllCategories.filter(cat => !cat.parent_category_id);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Add Category Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Add Category</h3>
          <form onSubmit={handleCategorySubmit} className="space-y-4">
            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category name"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Category
            </button>
          </form>
        </div>

        {/* Add Subcategory Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Add Subcategory</h3>
          <form onSubmit={handleSubCategorySubmit} className="space-y-4">
            <div>
              <label htmlFor="subcategoryName" className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory Name
              </label>
              <input
                type="text"
                id="subcategoryName"
                value={subcategoryName}
                onChange={(e) => setSubcategoryName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter subcategory name"
                required
              />
            </div>
            <div>
              <label htmlFor="parentCategoryId" className="block text-sm font-medium text-gray-700 mb-2">
                Parent Category
              </label>
              <select
                id="parentCategoryId"
                value={parentCategoryId}
                onChange={(e) => setParentCategoryId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Parent Category</option>
                {categories.map(category => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button 
              type="submit" 
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              Add Subcategory
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Category;
