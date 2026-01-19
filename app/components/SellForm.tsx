"use client";
import { useState } from 'react';

export default function SellForm() {
  const [showForm, setShowForm] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...selectedFiles]);
    }
  };

  if (!showForm) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-700">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Sell your car your way</h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl">
          Quickly and securely cash-in your offer from a local dealer, or create a free listing to sell it yourself on Breezecars.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get instant offer</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Take the next step to get an exact, no obligation cash offer on your car 
              <span className="font-bold text-gray-900"> right now</span>.
            </p>

            <ul className="space-y-6">
              {[
                { t: "Sell your car quickly.", d: "Complete the transaction within 24 hours." },
                { t: "Full transparency.", d: "No hidden fees or aggressive haggling." },
                { t: "Secure payment.", d: "Direct bank transfer upon inspection." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-[#632197] flex items-center justify-center">
                    <span className="text-[#632197] text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-600"><span className="font-bold text-gray-900">{item.t}</span> {item.d}</p>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => setShowForm(true)}
              className="mt-10 px-10 py-4 bg-[#632197] text-white font-bold rounded-full hover:bg-[#4d1975] transition-all shadow-lg"
            >
              Get your instant offer
            </button>
          </div>

          <div className="relative">
            <img 
              src="https://www.cars.com/images/sell-v3/instant-offer-illustration.png" 
              alt="Sell illustration" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-500">
      <button onClick={() => setShowForm(false)} className="text-sm font-bold text-[#632197] mb-8 hover:underline italic">
        ← BACK TO INFO
      </button>

      <h2 className="text-4xl font-black text-gray-900 mb-10 italic uppercase tracking-tighter">Vehicle Submission Form</h2>

      <form className="space-y-8">
        {/* SECTION 1: BASIC IDENTIFICATION */}
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <h3 className="text-xl font-bold mb-6 text-[#632197]">1. Identification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input required placeholder="Year / Make / Model" className="p-4 rounded-xl border border-gray-200 bg-white font-bold outline-none focus:ring-2 focus:ring-[#632197]" />
            <input required placeholder="VIN or Plate Number" className="p-4 rounded-xl border border-gray-200 bg-white font-bold outline-none focus:ring-2 focus:ring-[#632197]" />
          </div>
        </div>

        {/* SECTION 2: MECHANICAL & USAGE */}
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <h3 className="text-xl font-bold mb-6 text-[#632197]">2. Mechanical Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input required type="number" placeholder="Current Mileage (km)" className="p-4 rounded-xl border border-gray-200 bg-white font-bold outline-none" />
            <select className="p-4 rounded-xl border border-gray-200 bg-white font-bold text-gray-500">
              <option>Engine Condition</option>
              <option>Runs Perfectly</option>
              <option>Minor Issues</option>
              <option>Needs Repair</option>
            </select>
            <select className="p-4 rounded-xl border border-gray-200 bg-white font-bold text-gray-500">
              <option>Transmission Type</option>
              <option>Automatic</option>
              <option>Manual</option>
            </select>
            <select className="p-4 rounded-xl border border-gray-200 bg-white font-bold text-gray-500">
              <option>Service History</option>
              <option>Full Service History</option>
              <option>Partial History</option>
              <option>No Records</option>
            </select>
          </div>
        </div>

        {/* SECTION 3: EXTERIOR & INTERIOR */}
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <h3 className="text-xl font-bold mb-6 text-[#632197]">3. Physical Condition</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select className="p-4 rounded-xl border border-gray-200 bg-white font-bold text-gray-500">
              <option>Body Condition</option>
              <option>No Dents/Scratches</option>
              <option>Minor Scratches</option>
              <option>Major Dents</option>
            </select>
            <select className="p-4 rounded-xl border border-gray-200 bg-white font-bold text-gray-500">
              <option>Interior Condition</option>
              <option>Clean / Like New</option>
              <option>Minor Wear</option>
              <option>Needs Deep Clean</option>
            </select>
            <textarea placeholder="List any specific damage or modifications..." className="p-4 rounded-xl border border-gray-200 bg-white font-bold md:col-span-2 h-32 outline-none"></textarea>
          </div>
        </div>

        {/* SECTION 4: PHOTO GALLERY */}
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <h3 className="text-xl font-bold mb-6 text-[#632197]">4. Photo Gallery</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-3xl p-10 text-center bg-white group cursor-pointer">
            <input type="file" multiple onChange={handleImageChange} className="hidden" id="car-photos" accept="image/*" />
            <label htmlFor="car-photos" className="cursor-pointer">
              <div className="text-4xl mb-2">📸</div>
              <p className="font-bold">Tap to upload photos</p>
              <p className="text-xs text-gray-400">Front, Rear, Interior, and Dashboard</p>
            </label>
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-4 mt-6">
              {images.map((file, i) => (
                <div key={i} className="aspect-square rounded-lg bg-gray-200 overflow-hidden">
                  <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="car preview" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 5: OWNER DETAILS */}
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <h3 className="text-xl font-bold mb-6 text-[#632197]">5. Owner Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input required placeholder="Full Name" className="p-4 rounded-xl border border-gray-200 bg-white font-bold outline-none" />
            <input required placeholder="Phone Number" className="p-4 rounded-xl border border-gray-200 bg-white font-bold outline-none" />
            <input required type="email" placeholder="Email Address" className="p-4 rounded-xl border border-gray-200 bg-white font-bold outline-none md:col-span-2" />
          </div>
        </div>

        <button type="submit" className="w-full py-6 bg-[#632197] text-white font-black rounded-3xl uppercase tracking-widest hover:scale-[1.01] transition-transform shadow-xl">
          SUBMIT
        </button>
      </form>
    </div>
  );
}