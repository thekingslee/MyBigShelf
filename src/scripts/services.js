import axios from 'axios';

// create a function that fetches the products

export const fetchProducts = async () => {
  try {
    const { data } = await axios.get(
      'https://bigshelf-node-i5vo.onrender.com/api/v1/books/available',
      {
        params: {
          pageNumber: 1,
          query: '',
          pageSize: 1000,
          genre: '',
        },
      }
    );

    return data?.data?.books || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
