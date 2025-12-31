"use client";

import { useState } from "react";
import { Calculator, Plus, Trash2, DollarSign, Clock, Users } from "lucide-react";

interface ProjectTask {
  id: string;
  name: string;
  hours: number;
  rate: number;
}

export default function ProjectCostEstimator() {
  const [tasks, setTasks] = useState<ProjectTask[]>([
    { id: "1", name: "Initial Research", hours: 10, rate: 50 }
  ]);
  const [resourcesCost, setResourcesCost] = useState("500");
  const [contingency, setContingency] = useState("10");

  const addTask = () => {
    setTasks([...tasks, { id: Math.random().toString(36).substr(2, 9), name: "", hours: 0, rate: 50 }]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateTask = (id: string, field: keyof ProjectTask, value: any) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const laborCost = tasks.reduce((acc, t) => acc + (t.hours * t.rate), 0);
  const resourceCostNum = parseFloat(resourcesCost) || 0;
  const baseTotal = laborCost + resourceCostNum;
  const contingencyAmount = (baseTotal * (parseFloat(contingency) || 0)) / 100;
  const totalEstimate = baseTotal + contingencyAmount;

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 uppercase tracking-tight">Labor & Tasks</h3>
                <p className="text-xs text-gray-400 font-bold uppercase">Work Breakdown</p>
              </div>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex gap-3 items-start">
                  <input
                    type="text"
                    placeholder="Task name"
                    value={task.name}
                    onChange={(e) => updateTask(task.id, "name", e.target.value)}
                    className="flex-[4] h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                  <input
                    type="number"
                    placeholder="Hrs"
                    value={task.hours}
                    onChange={(e) => updateTask(task.id, "hours", parseFloat(e.target.value))}
                    className="flex-1 h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-center"
                  />
                  <input
                    type="number"
                    placeholder="Rate"
                    value={task.rate}
                    onChange={(e) => updateTask(task.id, "rate", parseFloat(e.target.value))}
                    className="flex-[2] h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-right"
                  />
                  <button onClick={() => removeTask(task.id)} className="h-12 w-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-100 transition-all shrink-0">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={addTask}
                className="w-full h-12 bg-blue-50 text-blue-600 rounded-xl border-2 border-dashed border-blue-200 font-bold flex items-center justify-center gap-2 hover:bg-blue-100 transition-all"
              >
                <Plus className="h-4 w-4" />
                Add Task
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Other Resources Cost ($)</label>
              <input type="number" value={resourcesCost} onChange={e => setResourcesCost(e.target.value)} className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-black text-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contingency (%)</label>
              <input type="number" value={contingency} onChange={e => setContingency(e.target.value)} className="w-full h-14 px-6 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-black text-xl" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 rounded-3xl p-8 text-white space-y-6 shadow-2xl sticky top-8">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Estimation Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-gray-400">
                <span className="text-sm font-medium">Labor Cost</span>
                <span className="font-black">${laborCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span className="text-sm font-medium">Resources</span>
                <span className="font-black">${resourceCostNum.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span className="text-sm font-medium">Contingency ({contingency}%)</span>
                <span className="font-black">${contingencyAmount.toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                <span className="text-lg font-black uppercase tracking-tight">Total Estimate</span>
                <span className="text-2xl font-black text-blue-400">${totalEstimate.toLocaleString()}</span>
              </div>
            </div>
            <button className="w-full h-14 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              <Calculator className="h-4 w-4" />
              Recalculate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
