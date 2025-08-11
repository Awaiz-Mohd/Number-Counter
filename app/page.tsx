"use client";

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from 'react';

    export default function Home() {
      const [count, setCount] = useState(0);
      const [list, setList] = useState<number[]>([]);
      const [sortOrder, setSortOrder] = useState('asc');
      const [isInitialLoad, setIsInitialLoad] = useState(true);
    
      // Load from localStorage on initial render
      useEffect(() => {
        const savedList = localStorage.getItem('numberList');
        if (savedList) {
          setList(JSON.parse(savedList));
        }
        setIsInitialLoad(false);
      }, []);
    
      // Save to localStorage whenever list changes
      useEffect(() => {
        if (!isInitialLoad) {
          localStorage.setItem('numberList', JSON.stringify(list));
        }
      }, [list, isInitialLoad]);
    
      const increment = () => {
        setCount(count + 1);
      };
    
      const decrement = () => {
        if (count > 0) {
          setCount(count - 1);
        }
      };
    
      const addNumber = () => {
        if (count > 0 && !list.includes(count)) {
          const newList = [...list, count];
          setList(newList);
          setCount(0);
        }
      };
    
      const sortList = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        
        const sortedList = [...list].sort((a, b) => {
          return newOrder === 'asc' ? a - b : b - a;
        });
        
        setList(sortedList);
      };
    
      const resetList = () => {
        setList([]);
        setCount(0);
        localStorage.removeItem('numberList');
      };
    
      const getHighlightClass = (number:number):string => {
        if (list.length < 2) return '';
        const max = Math.max(...list);
        const min = Math.min(...list);
        
        if (number === max) return 'bg-green-100';
        if (number === min) return 'bg-blue-100';
        return '';
      };
    
      return (

        <div className="min-h-screen bg-red-50 py-12 px-4 sm:px-6 lg:px-8"
          style={{ backgroundImage: "url('raiqa1.png')" }}
        >
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 ml-35 mt-8">
            <h1 className="text-2xl font-bold text-center mb-6 text-black">RAIQA HEALTH</h1>
            <h1 className="text-2xl font-bold text-center mb-6 text-black">Number Counter</h1>
            
            {/* Counter Section */}
            <div className="mb-8 p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={decrement}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  -
                </button>
                
                <span className="text-2xl font-bold text-black">{count}</span>
                
                <button 
                  onClick={increment}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={addNumber}
                disabled={count === 0}
                className={`w-full py-2 rounded ${count === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-black transition`}
              >
                Add to List
              </button>
            </div>
            
            {/* List Section */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-black">Number List</h2>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={sortList}
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
                  >
                    Sort {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                  
                  <button 
                    onClick={resetList}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              {list.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No numbers added yet</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {list.map((number, index) => (
                    <li 
                      key={index} 
                      className={`py-3 px-2 text-black ${getHighlightClass(number)}`}
                    >
                      {number}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      );
    }