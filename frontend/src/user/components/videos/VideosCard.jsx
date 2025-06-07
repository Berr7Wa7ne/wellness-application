import React from 'react';
import { Play } from 'lucide-react';

export const VideosCard = ({img, title, desc}) => {
    return (
        <div className="bg-white overflow-hidden rounded-lg border-2 border-[#C8D8C0] hover:shadow-lg transition-shadow duration-300 group">
            <div className="relative w-full h-[220px] overflow-hidden">
                <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-transparent bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                        <Play className="w-8 h-8 text-[#617C5F]" fill="currentColor" />
                    </div>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-medium text-[20px] text-[#213721] mb-2 font-mono">{title}</h3>
                <p className="text-sm text-[#617C5F] font-mono">{desc}</p>
            </div>
        </div>
    );
}
