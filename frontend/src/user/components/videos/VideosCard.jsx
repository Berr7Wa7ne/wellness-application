import React from 'react';
import { Play } from 'lucide-react';

export const VideosCard = ({img, title, desc}) => {
    return (
        <div className="bg-white overflow-hidden rounded-lg border-2 border-[#C8D8C0] hover:shadow-xl transition-all duration-300 group hover:border-[#617C5F]">
            <div className="relative w-full h-[220px] overflow-hidden">
                <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-8 h-8 text-[#617C5F] transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" />
                    </div>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-medium text-[20px] text-[#213721] mb-2 font-mono group-hover:text-[#617C5F] transition-colors duration-300">{title}</h3>
                <p className="text-sm text-[#617C5F] font-mono group-hover:text-[#213721] transition-colors duration-300">{desc}</p>
            </div>
        </div>
    );
}
