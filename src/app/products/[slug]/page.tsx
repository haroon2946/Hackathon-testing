'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/redux/cartSlice';
import { client } from '@/sanity/lib/client';
import { useWishlist } from '@/app/context/WishlistContext';
import Link from 'next/link';

type Product = {
  _id: number;
  name: string;
  slug: string;
  imageUrl: string;
  categoryName: string;
  description: string;
  price: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
};

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]{
    _id,
    name,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    "categoryName": category->name,
    description,
    price,
    "dimensions": dimensions {
      width,
      height,
      depth
    },
    "categorySlug": category->slug.current
  }`;

  const product = await client.fetch(query);
  if (!product) return null;

  const relatedQuery = `*[_type == "product" && category->slug.current == "${product.categorySlug}" && slug.current != "${slug}"]{
    _id,
    name,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    price
  }`;

  const relatedProducts = await client.fetch(relatedQuery);
  return { product, relatedProducts };
}

const ProductListing = ({ params }: { params: { slug: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(params.slug);
      if (data) {
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts);
      }
    };
    fetchData();
  }, [params.slug]);

  if (!product) {
    return <div className="text-center text-lg mt-10">Product not found</div>;
  }

  // ✅ Add to Cart Function
  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.imageUrl,
      description: product.description,
    }));
    showPopup("Item added to cart!");
  };

  // ✅ Add to Wishlist Function
  const handleAddToWishlist = () => {
    addToWishlist({ ...product, _id: product._id.toString() });
    showPopup("Item added to wishlist!");
  };

  // ✅ Show Popup Message
  const showPopup = (message: string) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(null), 3000);
  };

  return (
    <section className="px-4 md:px-8 lg:px-12 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-1/2">
          <Image
            src={product.imageUrl}
            width={700}
            height={700}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-md"
          />
        </div>
        <div className="w-full md:w-1/2 px-4 md:px-10 py-6">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-lg md:text-xl py-2">${product.price}</p>
          <p className="text-[#505977] text-sm md:text-base">{product.description}</p>

          {/* ✅ Dimensions Section */}
          {/* ✅ Dimensions Section */}
{/* ✅ Dimensions Section */}
<div className="mt-4 p-4 border border-gray-300 rounded-md">
  <h3 className="text-lg font-semibold mb-3">Product Dimensions</h3>
  <div className="grid grid-cols-2 gap-y-2 text-gray-700">
    <span className="font-medium text-2xl">Width:</span>
    <span className="text-right text-xl">{product.dimensions.width} </span>

    <span className="font-medium text-2xl">Height:</span>
    <span className="text-right text-xl">{product.dimensions.height} </span>

    <span className="font-medium text-2xl">Depth:</span>
    <span className="text-right text-xl">{product.dimensions.depth} </span>
  </div>
</div>



          <div className="mt-6 flex gap-4">
            <button
              className="w-[150px] h-[50px] bg-[#2A254B] text-white rounded-md"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
            <button
              className="w-[150px] h-[50px] bg-red-500 text-white rounded-md"
              onClick={handleAddToWishlist}
            >
              Wishlist ❤️
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Popup Message */}
      {popupMessage && (
        <div className="fixed bottom-6 right-6 bg-[#2A254B] text-white px-6 py-3 rounded-lg shadow-lg transition-all transform duration-300 ease-in-out">
          <p className="font-medium">{popupMessage}</p>
        </div>
      )}

      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div key={item._id} className="border p-4 rounded-md shadow-md h-[350px] flex flex-col items-center justify-between">
                <Image
                  src={item.imageUrl}
                  width={200}
                  height={200}
                  alt={item.name}
                  className="w-full h-[200px] object-cover rounded-md"
                />
                <h3 className="mt-2 text-lg font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">${item.price}</p>
                <Link href={`/product/${item.slug}`} className="text-blue-600 mt-2">View Product</Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default ProductListing;