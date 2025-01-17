import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const host = "https://fashion-folio-ecom-store-backend.onrender.com";
// const host = 'http://localhost:5000'
const headers = {
  'Content-Type': 'application/json',
  'auth-token': localStorage.getItem('ecom-auth-token')
}
// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${host}/api/v1/product/getallproducts`, {
        method: 'GET',
        headers: headers,
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        return rejectWithValue(errorResponse.message || 'Failed to fetch products');
    }

    const result = await response.json();
    console.log('result of prod:',result)
    return result;
} catch (error) {
    return rejectWithValue(error.message);
}
});

// Fetch a single product by ID
export const fetchProduct = createAsyncThunk('product/fetchProduct', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`${host}/api/v1/product/getproduct/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error fetching product');
    }
    return data; // Return the fetched product data
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Initial state
const initialState = {
  products: [],
  product: null,
  cartItems: [],
  loading: false,
  error: null,
};

// Redux slice
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetch products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new fetch
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Error from fetchProducts thunk', action.payload);
      })
      // Handle fetch product
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new fetch
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload; // Set the fetched product
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Error from fetchProduct thunk', action.payload);
      });
  },
});

// Export action creators and reducer
export const { resetError } = productSlice.actions;

export default productSlice.reducer;
