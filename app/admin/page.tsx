"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '../components/AuthProvider';

type Car = {
  id: string;
  name: string;
  price: string;
  year: string; 
  imgs: string[];
  mileage: string;
  transmission: string;
  fuelType: string;
  description: string;
};

export default function AdminPage() {
  const { user } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [mileage, setMileage] = useState('');
  const [transmission, setTransmission] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [description, setDescription] = useState('');

  const [editingCarId, setEditingCarId] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('breezecars_cars');
    if (raw) {
      // Migrate old data with `img` to new format with `imgs`
      const parsedCars = JSON.parse(raw).map((car: Partial<Car> & { img?: string }) => {
        if (car.img && !car.imgs) {
          return { ...car, imgs: [car.img], img: undefined };
        }
        return car;
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCars(parsedCars);
    }
  }, []);

  const persist = (next: Car[]) => {
    setCars(next);
    localStorage.setItem('breezecars_cars', JSON.stringify(next));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
      setImagePreviews(files.map(file => URL.createObjectURL(file)));
    }
  };

  const resetForm = () => {
    setName(''); setPrice(''); setYear(''); setImages([]); setImagePreviews([]);
    setMileage(''); setTransmission(''); setFuelType(''); setDescription('');
    setEditingCarId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCarId) {
      const updatedCars = cars.map(car => {
        if (car.id === editingCarId) {
          return {
            ...car,
            name,
            price,
            year,
            imgs: images.length > 0 ? images.map(file => URL.createObjectURL(file)) : car.imgs,
            mileage,
            transmission,
            fuelType,
            description,
          };
        }
        return car;
      });
      persist(updatedCars);
    } else {
      const newCar: Car = { id: Date.now().toString(), name, price, year, imgs: images.map(file => URL.createObjectURL(file)), mileage, transmission, fuelType, description };
      persist([newCar, ...cars]);
    }
    resetForm();
  };

  const startEditing = (car: Car) => {
    setEditingCarId(car.id);
    setName(car.name);
    setPrice(car.price);
    setYear(car.year);
    setMileage(car.mileage);
    setTransmission(car.transmission);
    setFuelType(car.fuelType);
    setDescription(car.description);
    setImages([]); // Clear file input, but keep previews
    setImagePreviews(car.imgs || []);
  };

  const removeCar = (id: string) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      persist(cars.filter(c => c.id !== id));
    }
  };

  if (!user || !user.isAdmin) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-black">Access denied</h1>
        <p className="text-gray-600 mt-4">You must be an admin to view this page. Please sign in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black mb-6">Admin Panel</h1>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">{editingCarId ? 'Edit Car' : 'Create / Post New Car'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required placeholder="Year / Make / Model" value={name} onChange={(e) => setName(e.target.value)} className="p-3 border rounded-lg" />
          <input required placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="p-3 border rounded-lg" />
          <input required placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} className="p-3 border rounded-lg" />
          <input required placeholder="Mileage (e.g. 50,000 km)" value={mileage} onChange={(e) => setMileage(e.target.value)} className="p-3 border rounded-lg" />
          <input required placeholder="Transmission (e.g. Automatic)" value={transmission} onChange={(e) => setTransmission(e.target.value)} className="p-3 border rounded-lg" />
          <input required placeholder="Fuel Type (e.g. Petrol)" value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="p-3 border rounded-lg" />
          <textarea required placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="p-3 border rounded-lg md:col-span-2 h-24" />
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Car Images</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                <div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#632197] hover:text-[#4d1975] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#632197]"><span>Upload files</span><input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleImageChange} accept="image/*" /></label><p className="pl-1">or drag and drop</p></div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image src={src} alt="preview" fill className="object-cover rounded-md" unoptimized />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-2 flex gap-4">
            <button type="submit" className="flex-1 py-3 bg-[#632197] text-white rounded-lg font-bold">
              {editingCarId ? 'Update Car' : 'Post Car'}
            </button>
            {editingCarId && (
              <button type="button" onClick={resetForm} className="flex-1 py-3 bg-gray-200 text-black rounded-lg font-bold">Cancel</button>
            )}
          </div>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Current Cars</h2>
        <div className="space-y-4">
          {cars.length === 0 && <p className="text-gray-500">No cars posted yet.</p>}
          {cars.map((c) => (
            <div key={c.id} className="flex items-center justify-between border p-3 rounded-lg">
              <div>
                <div className="font-bold">{c.name} <span className="text-sm text-gray-500">{c.year}</span></div>
                <div className="text-sm text-[#632197] font-black">{c.price}</div>
              </div>
              <div className="flex items-center gap-3">
                {c.imgs?.[0] && <Image src={c.imgs[0]} alt={c.name} width={96} height={64} className="object-cover rounded-md" unoptimized />}
                <button onClick={() => startEditing(c)} className="py-2 px-3 bg-blue-500 text-white rounded-lg">Edit</button>
                <button onClick={() => removeCar(c.id)} className="py-2 px-3 bg-red-500 text-white rounded-lg">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
