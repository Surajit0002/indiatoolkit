"use client";

import { useState } from "react";
import { ShoppingBag, Plus, Trash2, Download, Printer, User, Building, Truck } from "lucide-react";

interface POItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export default function PurchaseOrderGenerator() {
  const [items, setItems] = useState<POItem[]>([
    { id: "1", description: "Office Supplies", quantity: 10, rate: 25 }
  ]);
  
  const [vendor, setVendor] = useState({ name: "", email: "", address: "" });
  const [poDetails, setPoDetails] = useState({
    number: "PO-2025-001",
    date: new Date().toISOString().split("T")[0],
    deliveryDate: ""
  });

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(36).substr(2, 9), description: "", quantity: 1, rate: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof POItem, value: POItem[keyof POItem]) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const total = items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-8">
            <div className="flex justify-between items-start">
              <div className="space-y-4 flex-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Vendor</label>
                <div className="space-y-2">
                  <input type="text" placeholder="Vendor Name" value={vendor.name} onChange={e => setVendor({...vendor, name: e.target.value})} className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
                  <input type="email" placeholder="Vendor Email" value={vendor.email} onChange={e => setVendor({...vendor, email: e.target.value})} className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
                  <textarea placeholder="Vendor Address" value={vendor.address} onChange={e => setVendor({...vendor, address: e.target.value})} className="w-full h-24 p-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium resize-none" />
                </div>
              </div>
              <div className="space-y-4 w-48 ml-8">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest text-right block">PO Details</label>
                <div className="space-y-2">
                  <input type="text" value={poDetails.number} onChange={e => setPoDetails({...poDetails, number: e.target.value})} className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-black text-right" />
                  <input type="date" value={poDetails.date} onChange={e => setPoDetails({...poDetails, date: e.target.value})} className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-right text-xs" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Items to Order</label>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <input
                      type="text"
                      placeholder="Item description"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      className="flex-[4] h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, "quantity", parseFloat(e.target.value))}
                      className="flex-1 h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-center"
                    />
                    <input
                      type="number"
                      placeholder="Rate"
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, "rate", parseFloat(e.target.value))}
                      className="flex-[2] h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-right"
                    />
                    <button onClick={() => removeItem(item.id)} className="h-12 w-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-100 transition-all shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addItem}
                className="w-full h-12 bg-amber-50 text-amber-600 rounded-xl border-2 border-dashed border-amber-200 font-bold flex items-center justify-center gap-2 hover:bg-amber-100 transition-all"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 rounded-3xl p-8 text-white space-y-6 shadow-2xl">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">PO Summary</h3>
            <div className="space-y-4">
              <div className="pt-4 flex justify-between items-center">
                <span className="text-lg font-black uppercase tracking-tight">Total PO Value</span>
                <span className="text-2xl font-black text-amber-400">${total.toLocaleString()}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 pt-4">
              <button className="h-14 bg-amber-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-amber-700 transition-all">
                <Download className="h-4 w-4" />
                Download PO
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 space-y-4">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-gray-400" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Shipping Method</span>
            </div>
            <select className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold appearance-none">
              <option>Standard Shipping</option>
              <option>Express Courier</option>
              <option>Local Pickup</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
