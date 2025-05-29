import React from 'react'
import { Package } from 'lucide-react';

const products = [
    { name: 'Premium Plan', value: 1245, change: '+12%', changeType: 'up' },
    { name: 'Basic Package', value: 958, change: '+5%', changeType: 'up' },
    { name: 'Pro Subscription', value: 849, change: '+8%', changeType: 'up' },
    { name: 'Enterprise Solution', value: 432, change: '-3%', changeType: 'down' },
];

const TopProducts = () => {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm w-full">
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center justify-between gap-80">
                    <h2 className="text-lg font-semibold">Top Products</h2>
                    <Package className="w-5 h-5 text-gray-400" />
                </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">Best selling products this month</p>
            <ul className="space-y-3">
                {products.map((product, i) => (
                    <li key={i} className="flex items-center justify-between">
                        <div className="flex space-x-2 items-start min-w-[120px]">
                            <span className="w-6 h-6 bg-[#213721] text-white text-sm border rounded-sm flex items-center justify-center mb-1">{i + 1}</span>
                            <span className="font-medium">{product.name}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="font-semibold">{product.value.toLocaleString()}</span>
                            <span className={`text-xs ${product.changeType === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                                {product.change}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TopProducts