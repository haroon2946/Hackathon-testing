"use client"; // This is an interactive component

import { useWishlist } from "../context/WishlistContext";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <section className="px-4 md:px-8 py-12 text-[#2A254B] mt-12">
      <h1 className="text-2xl font-semibold">My Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {wishlist.map((product) => (
            <div className="w-full h-auto" key={product._id}>
              <Link href={`/products/${product.slug}`}>
                <Image
                  src={product.imageUrl}
                  height={700}
                  width={700}
                  alt={product.name}
                  className="w-full h-[80%] object-cover"
                />
              </Link>
              <div className="mt-4 text-[#2A254B]">
                <p className="py-2">{product.name}</p>
                <p>${product.price}</p>
                <button
                  className="mt-2 bg-red-500 text-white py-2 px-4 rounded"
                  onClick={() => removeFromWishlist(product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12">Your wishlist is empty</p>
      )}
    </section>
  );
}