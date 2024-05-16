const pool = require('../db');

const product={
  // createProduct:async ({name,description,price,category_id ,seller_id, stock_quantity }
  // )=>{

  //   try {
  //     console.log("hi lato")
  //     const productQuery = `
  //       INSERT INTO products (name, description, price, category_id, seller_id, stock_quantity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  //     const values = [name, description, price, category_id, seller_id, stock_quantity];
  //     const result = await pool.query(productQuery, values);
  //     return result.rows[0];
  //   } catch (error) {

  //     console.log("Error found", error.message);
  //   }


  // },
  createCategory: async ({name}) => {
    try {
      console.log(name)
        const nameQuery = await pool.query(`SELECT * FROM categories WHERE name=$1`, [name]);

        if(nameQuery.rows.length > 0){
            throw new Error("name already exist");
             
        } 
           
        const newCategoryQuery = await pool.query(
                `INSERT INTO categories (name) VALUES ($1) RETURNING *`,
                [name]
                
            );
             return newCategoryQuery.rows[0];
        
       
    } catch (error) {
        console.log("error occured while creating name", error.message);
        throw error
    }
},
  createSubCategory: async (parent,{name,parent_category_id}) => {
    try {
     console.log(parent)
    

      // Check if parent_category exists
      let parentCategoryExists = true;
      if (parent_category_id) {
        const parentCategoryQuery = await pool.query(
          `SELECT * FROM categories WHERE parent_category_id = $1`,
          [parent_category_id]
        );
        if (parentCategoryQuery.rows.length === 0) {
          parentCategoryExists = false;
        }
      }
       
      // If parent_category does not exist, return an error
      if (!parentCategoryExists) {
        throw new Error('Parent category does not exist');
      }
      const nameQuery= await pool.query(`SELECT * FROM categories where name=$1`,[parent.name])
      if(nameQuery.rows.length>0){
        throw new Error('Error found')
      }
      // Insert the new category into the database
      const newCategoryQuery = await pool.query(
        `INSERT INTO categories (name,parent_category_id) VALUES ($1, $2) RETURNING *`,
        [parent.name, parent.parent_category_id]
      );

      // Return the newly created category
      return newCategoryQuery.rows[0];
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },
// delete category to delete category whe have to use cascade while creating table but since my table is created has forign key with it self but it did not on delete cascade while created so I will develop it when it is added to the table

postEditCategory: async({id, name}) => {
  try {
      const categoryQuery = await pool.query(`SELECT * FROM categories WHERE category_id = $1`, [id]);
      if(categoryQuery.rows.length === 0){
          throw new Error('Category not found');
      }
      const updatedName = await pool.query(
          `UPDATE categories SET name=$1 WHERE category_id=$2 RETURNING *`,
          [name, id]
      );
      return updatedName.rows[0];
  } catch (error) {
      console.log("Error found,", error.message);
      throw error;
  }
},
getAllCategories:async ()=>{
try {
  const categoryLIst= await pool.query(`SELECT * FROM categories WHERE parent_category_id IS NULL `)
  return (categoryLIst.rows)
} catch (error) {
  console.error("Error found",error.message)
  throw error
}

},
getSubCategories:async ()=>{
  try {
    const categoryLIst= await pool.query(`SELECT * FROM categories WHERE parent_category_id IS NOT NULL `)
    return (categoryLIst.rows)
  } catch (error) {
    console.error("Error found",error.message)
    throw error
  }
},
//deleteSubcategory
deleteSubCategory: async(parent, {id}) => {
  try {
    console.log(parent)

    const deleteSubCategory = await pool.query(`DELETE FROM categories WHERE category_id=$1 RETURNING *`, [parent.id]);
    
    return deleteSubCategory.rows[0];
  } catch (error) {
    console.log("error found", error.message)
    throw error
  }




  
}



}
 module.exports = {product}