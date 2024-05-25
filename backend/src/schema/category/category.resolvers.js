const db = require('../../../pgAdaptor').db;

const categoryResolvers = {
  Query: {
    getAllCategories: async () => {
      try {
        return await db.any('SELECT * FROM categories');
      } catch (error) {
        console.error('Error retrieving all categories:', error);
        throw error;
      }
    },
    getAllSubCategories: async () => {
      try {
        return await db.any('SELECT * FROM categories WHERE parent_category_id IS NOT NULL');
      } catch (error) {
        console.error('Error retrieving all subcategories:', error);
        throw error;
      }
    },
  },
  Mutation: {
    createCategory: async (_, { name }) => {
      const query = 'INSERT INTO categories (name) VALUES ($1) RETURNING *';
      const values = [name];
      try {
        return await db.one(query, values);
      } catch (err) {
        throw new Error('Error creating category: ' + err.message);
      }
    },
    createSubCategory: async (_, { name, parent_category_id }) => {
      try {
        const parentCategoryQuery = await db.oneOrNone('SELECT * FROM categories WHERE category_id = $1', [parent_category_id]);
        if (!parentCategoryQuery) {
          throw new Error('Parent category does not exist');
        }
        const existingSubCategory = await db.oneOrNone('SELECT * FROM categories WHERE name = $1 AND parent_category_id = $2', [name, parent_category_id]);
        if (existingSubCategory) {
          throw new Error('Subcategory name already exists');
        }
        return await db.one('INSERT INTO categories (name, parent_category_id) VALUES ($1, $2) RETURNING *', [name, parent_category_id]);
      } catch (error) {
        console.error('Error creating subcategory:', error);
        throw error;
      }
    },
    postEditCategory: async (_, { category_id, name }) => {
      try {
        const existingCategory = await db.oneOrNone('SELECT * FROM categories WHERE category_id = $1', [category_id]);
        if (!existingCategory) {
          throw new Error('Category not found');
        }
        return await db.one('UPDATE categories SET name = $1 WHERE category_id = $2 RETURNING *', [name, category_id]);
      } catch (error) {
        console.error('Error editing category:', error);
        throw error;
      }
    },
  },
  Category: {
    parent_category: async (parent) => {
      try {
        const parentCategory = await db.oneOrNone(
          'SELECT * FROM categories WHERE category_id = $1',
          [parent.parent_category_id]
        );
        return parentCategory;
      } catch (err) {
        throw new Error(`Failed to fetch parent category: ${err.message}`);
      }
    },
  },
};

module.exports = categoryResolvers;
