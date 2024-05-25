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

  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION);
  const [createSubCategory] = useMutation(CREATE_SUBCATEGORY_MUTATION);
  
  const { loading, error, data } = useQuery(GET_CATEGORIES_QUERY);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory({ variables: { name: categoryName } });
      console.log('Category added successfully');
      setCategoryName(''); // Clear the input field after successful submission
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  const handleSubCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await createSubCategory({ variables: { name: subcategoryName, parentCategoryId } });
      console.log('Subcategory added successfully');
      setSubcategoryName(''); // Clear the input field after successful submission
    } catch (error) {
      console.error('Failed to add subcategory:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const categories = data.getAllCategories;

  return (
    <div>
      <h3 className='mb-4 title'>Add Category</h3>
      <div>
        <form onSubmit={handleCategorySubmit}>
          <label htmlFor='categoryName'>Enter Category: </label>
          <input
            type='text'
            id='categoryName'
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button className='btn btn-success border-0 rounded-3 my-5' type="submit">Add Category</button>
        </form>
      </div>
      <h3 className='mb-4 title'>Add Subcategory</h3>
      <div>
        <form onSubmit={handleSubCategorySubmit}>
          <label htmlFor='subcategoryName'>Enter Subcategory: </label>
          <input
            type='text'
            id='subcategoryName'
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
          />
          <label htmlFor='parentCategoryId'>Parent Category ID: </label>
          <select
            id='parentCategoryId'
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option value=''>Select Parent Category ID</option>
            {categories.map(category => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_id}: {category.name}
              </option>
            ))}
          </select>
          <button className='btn btn-success border-0 rounded-3 my-5' type="submit">Add Subcategory</button>
        </form>
      </div>
    </div>
  );
}

export default Category;
