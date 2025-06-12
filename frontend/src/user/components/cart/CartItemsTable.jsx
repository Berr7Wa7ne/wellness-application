import React from 'react';
import { X } from 'lucide-react';

export const CartItemsTable = ({ items }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Item</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-center">Qty</th>
            <th className="py-3 px-6 text-right">Subtotal</th>
            <th className="py-3 px-6 text-center"></th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {items.map((item) => (
            <tr key={item.name} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <div className="mr-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  </div>
                  <span>{item.name}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-left">USD {item.price.toLocaleString('en-US')}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <button className="px-2 py-1 border border-gray-300 rounded">-</button>
                  <input
                    type="number"
                    value={item.quantity}
                    readOnly
                    className="w-12 text-center border border-gray-300 rounded py-1"
                  />
                  <button className="px-2 py-1 border border-gray-300 rounded">+</button>
                </div>
              </td>
              <td className="py-3 px-6 text-right">USD {(item.price * item.quantity).toLocaleString('en-US')}</td>
              <td className="py-3 px-6 text-center">
                <button className="text-red-500 hover:text-red-700">
                  <X size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 