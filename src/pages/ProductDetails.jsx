import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart as addToCartAction } from '../features/product/cartSlice'; 
import { useParams } from 'react-router-dom';
import { RelatedProducts } from "../components";
import { fetchProduct } from '../features/product/productSlice';  
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.product);  
    const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const [selectedSize, setSelectedSize] = useState('');

    useEffect(() => {
        dispatch(fetchProduct(id));  
    }, [id, dispatch]);

    const addToCart = () => {
        if (!selectedSize) {
            alert("Please select a size before adding to the cart.");
            return;
        }
        dispatch(addToCartAction({ productId: id, quantity: 1, size: selectedSize }));
        console.log("Product added to cart with size:", selectedSize);
        toast.success(`${product.productName} has been added to the cart!`, {
            className: 'toast-custom' // Apply custom class for removal
          });
    };

    if (!product) return <h1 className="text-center">Loading...</h1>;
    const sliderSettings = {dots: true,infinite: true,speed: 500,slidesToShow: 1,slidesToScroll: 1,};

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div> 
                    <Slider {...sliderSettings}>
                        <div> <img src={product.featuredImage} alt="Product" className="w-full mb-4" /> </div>
                        <div> <img src={product.subImage1} alt="Thumbnail 1" className="w-full mb-4" />  </div>
                        <div><img src={product.subImage2} alt="Thumbnail 2" className="w-full mb-4" /> </div>
                        <div> <img src={product.subImage3} alt="Thumbnail 3" className="w-full mb-4" /> </div>
                    </Slider> 
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{product.productName}</h1>
                    <p className="text-gray-500">Brand: {product.brand}</p>
                    <p className="text-green-600 font-medium">In Stock: {product.countOfStock}</p>
                    <p className="text-2xl font-bold mt-4">₹{product.price}</p>
                    <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                    <p className="text-sm text-gray-600 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, explicabo! Laborum saepe sunt eligendi illum assumenda. Harum saepe adipisci ipsum ab praesentium placeat est nam laborum! Sapiente totam tempore quis, at debitis exercitationem obcaecati voluptatum facilis ducimus ut in, repellendus deleniti numquam corrupti commodi quam fugiat eum vitae maxime. Similique labore sit possimus dicta nisi provident sapiente eaque, voluptatibus accusamus unde magnam dignissimos esse assumenda, dolorem ipsa laboriosam saepe. Corporis inventore dicta voluptates? Ullam quod magnam doloremque provident repellendus minus delectus tempore expedita. Nisi pariatur ab eligendi veniam, odit necessitatibus id non? Veniam in repellat magnam hic sit porro aperiam facilis, illo, iste reiciendis minima. Inventore, exercitationem? Doloremque suscipit atque eveniet iusto, dignissimos sapiente error commodi itaque eos dolore ducimus delectus ullam ratione doloribus qui fugit cupiditate similique assumenda illum voluptas quisquam minima modi. Totam ea voluptate laudantium earum praesentium? Animi, sapiente qui. Dolore, saepe reiciendis! Dolorem dignissimos illum quas!</p>

                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-2">Select Size:</h2>
                        <div className="flex space-x-2">
                            {availableSizes.map((size) => ( <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 border border-gray-300 rounded-md transition-colors duration-200 ${selectedSize === size ? 'bg-red-600 text-white border-red-600' : 'bg-gray-100 hover:bg-red-500 hover:text-white' }`} >{size} </button> ))}
                        </div>
                        {selectedSize && ( <p className="mt-2 text-sm text-gray-600">Selected size: <span className="font-medium">{selectedSize}</span></p> )}
                    </div>
                    <button onClick={addToCart} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md">Add to Cart</button>
                </div>
            </div>
            <RelatedProducts idOfPRoduct={id} />
        </div>
    );
};

export default ProductDetails;
