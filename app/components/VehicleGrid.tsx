"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';

type Car = {
  id: string | number;
  name: string;
  price: string;
  year: string;
  img: string;
  mileage?: string;
  transmission?: string;
  fuelType?: string;
  description?: string;
};

const initialVehicles: Car[] = [
  { id: 1, name: "Mercedes G-Wagon", price: "$145,000", year: "2024", img: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Porsche 911", price: "$120,500", year: "2023", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Range Rover", price: "$95,000", year: "2024", img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "BMW M4", price: "$82,000", year: "2024", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=400" },
  { id: 5, name: "Audi RS6", price: "$110,000", year: "2023", img: "https://images.unsplash.com/photo-1606148332571-3051375e46c7?auto=format&fit=crop&q=80&w=400" },
  { id: 6, name: "Mercedes G-Wagon", price: "$145,000", year: "2024", img: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=400" },
  { id: 7, name: "Porsche 911", price: "$120,500", year: "2023", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400" },
  { id: 8, name: "Audi RS6", price: "$110,000", year: "2023", img: "https://images.unsplash.com/photo-1606148332571-3051375e46c7?auto=format&fit=crop&q=80&w=400" },
  { id: 9, name: "Range Rover", price: "$95,000", year: "2024", img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=400" },
  { id: 10, name: "BMW M4", price: "$82,000", year: "2024", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=400" },
];

export default function VehicleGrid() {
  const [cars, setCars] = useState<Car[]>(initialVehicles);
  const { user } = useAuth();

  useEffect(() => {
    const raw = localStorage.getItem('breezecars_cars');
    if (raw) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCars(JSON.parse(raw));
    } else {
      // Seed the localStorage so Admin panel has data to start with
      localStorage.setItem('breezecars_cars', JSON.stringify(initialVehicles));
    }
  }, []);

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-black text-gray-900 italic uppercase tracking-tighter">
            Featured <span className="text-[#632197]">Stock</span>
          </h2>
          <div className="flex items-center gap-4">
            {user?.isAdmin && (
              <Link href="/admin" className="px-4 py-2 bg-[#632197] text-white text-xs font-bold rounded-lg hover:bg-[#4d1975] transition-all">
                + ADD CAR
              </Link>
            )}
            <Link href="/cars" className="text-sm font-bold border-b-2 border-black hover:text-[#632197] hover:border-[#632197] transition-all">
              VIEW ALL
            </Link>
          </div>
        </div>

        {/* The 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {cars.map((car) => (
            <div key={car.id} className="group cursor-pointer">
              {/* Image with tight aspect ratio for 5-col layout */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-gray-100">
                <Image
                  src={car.img}
                  alt={car.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute top-3 left-3 bg-black/80 text-white text-[10px] px-2 py-1 rounded-md font-bold">
                  {car.year}
                </div>
              </div>

              {/* Minimal Text to fit tight columns */}
              <div className="px-1">
                <h4 className="text-sm font-bold text-gray-900 truncate uppercase tracking-tight">
                  {car.name}
                </h4>
                <p className="text-[#632197] font-black text-sm mt-1">
                  {car.price}
                </p>
                <Link href={`/cars/${car.id}`} className="inline-block mt-2 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
                  Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}