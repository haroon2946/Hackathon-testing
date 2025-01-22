'use client'
import React, { useEffect, useState } from 'react';
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import WishlistButton from '@/components/WishlistButton';

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  slug: string;
}

const ProductsPage = () => {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "product" && image.asset != null]{
        _id,
        name,
        "slug": slug.current,
        "imageUrl": image.asset->url,
        price
      }`;
      const result = await client.fetch(query);
      setData(result || []);
    };

    fetchData();
  }, []);

  return (
    <section className="px-4 md:px-8 py-12 text-[#2A254B] mt-12">
      <h1 className="text-2xl font-semibold md:text-3xl">New Ceramics</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        {data.length > 0 ? (
          data.map((product) => (
            <div className="w-full h-auto" key={product._id}>
              <Link href={`/products/${product.slug}`}>
                <Image
                  src={product.imageUrl}
                  height={700}
                  width={700}
                  alt={product.name}
                  className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-md"
                />
              </Link>
              <div className="my-4 text-[#2A254B]">
                <p className="py-2 text-sm sm:text-base">{product.name}</p>
                <p className="text-lg font-semibold">${product.price}</p>
                <WishlistButton product={product} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-4">No products found</p>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;