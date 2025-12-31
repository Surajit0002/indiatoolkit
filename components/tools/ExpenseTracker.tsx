"use client";

import { useState, useEffect } from "react";
import { BarChart3, Plus, Trash2, DollarSign, Tag, Calendar, ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: "income" | "expense";
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");
  const [type, setType] = useState<"income" | "expense">("expense");

  const addEntry = () => {
    if (!description || !amount) return;
    const newEntry: Expense = {
      id: Math.random().toString(36).substr(2, 9),
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString(),
      type
    };
    setExpenses([newEntry, ...expenses]);
    setDescription("");
    setAmount("");
  };

  const removeEntry = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const totalIncome = expenses.filter(e => e.type === "income").reduce((acc, e) => acc + e.amount, 0);
  const totalExpense = expenses.filter(e => e.type === "expense").reduce((acc, e) => acc + e.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 uppercase tracking-tight">Add Entry</h3>
                <p className="text-xs text-gray-400 font-bold uppercase">Income or Expense</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex p-1 bg-gray-50 rounded-xl border border-gray-100">
                <button onClick={() => setType("expense")} className={`flex-1 h-10 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${type === "expense" ? "bg-white text-red-500 shadow-sm" : "text-gray-400"}`}>Expense</button>
                <button onClick={() => setType("income")} className={`flex-1 h-10 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${type === "income" ? "bg-white text-emerald-500 shadow-sm" : "text-gray-400"}`}>Income</button>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Rent, Coffee, Client Pay..." className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount ($)</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-black text-lg" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold appearance-none">
                  <option>General</option>
                  <option>Food & Drinks</option>
                  <option>Rent & Bills</option>
                  <option>Shopping</option>
                  <option>Work</option>
                  <option>Salary</option>
                </select>
              </div>

              <button
                onClick={addEntry}
                disabled={!description || !amount}
                className={`w-full h-14 rounded-2xl text-white font-bold transition-all shadow-lg ${type === "expense" ? "bg-red-500 hover:bg-red-600 shadow-red-100" : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100"}`}
              >
                Add {type === "income" ? "Income" : "Expense"}
              </button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-3xl p-8 text-white space-y-6 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign className="h-32 w-32" />
            </div>
            <div className="relative">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Balance</p>
              <h2 className="text-4xl font-black mt-1">${balance.toLocaleString()}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 relative">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Income</p>
                <p className="text-emerald-400 font-black flex items-center gap-1">
                  <ArrowDownLeft className="h-3 w-3" />
                  ${totalIncome.toLocaleString()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Expenses</p>
                <p className="text-red-400 font-black flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  ${totalExpense.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Transaction History</h3>
            <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-2 py-1 rounded-md uppercase">{expenses.length} Entries</span>
          </div>

          <div className="space-y-3">
            {expenses.length > 0 ? expenses.map((e) => (
              <div key={e.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-100 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${e.type === "income" ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-500"}`}>
                    {e.type === "income" ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 leading-tight">{e.description}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {e.category}
                      </span>
                      <span className="text-[10px] font-bold text-gray-300">•</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {e.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-lg font-black ${e.type === "income" ? "text-emerald-500" : "text-gray-900"}`}>
                    {e.type === "income" ? "+" : "-"}${e.amount.toLocaleString()}
                  </span>
                  <button onClick={() => removeEntry(e.id)} className="h-10 w-10 bg-gray-50 text-gray-300 rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )) : (
              <div className="bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 py-32 text-center space-y-4">
                <BarChart3 className="h-12 w-12 text-gray-200 mx-auto" />
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No transactions yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
