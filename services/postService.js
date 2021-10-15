const validationSchema = require('../helpers/validation_schema');
const { BlogPost, Category } = require('../models');

const createPost = async (data, user) => {
  const { error } = validationSchema.postSchema.validate(data);
  if (error) return { statusCode: 400, message: error.details[0].message };
  const { categoryIds: id } = data;
  const categoryExists = await Category.findOne({ where: { id } });
  if (!categoryExists) return { statusCode: 400, message: '"categoryIds" not found' };
  const { title, content } = data;
  const { id: userId } = user;
  const blogpost = await BlogPost.create({
    userId, title, content, published: new Date(), updated: new Date() });
  return { statusCode: 201, blogpost };
};

module.exports = {
  createPost,
};