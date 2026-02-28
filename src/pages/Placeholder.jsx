import React from 'react';
import { Construction } from 'lucide-react';

const Placeholder = ({ title }) => {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] animate-in fade-in zoom-in-95 duration-700 ease-out">
            <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mb-6 shadow-sm shadow-brand-500/20">
                <Construction className="w-12 h-12 text-brand-500" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">{title}</h1>
            <p className="text-slate-500 text-base max-w-sm text-center">This section is currently under development. Detailed features will be rolling out soon!</p>
        </div>
    );
};



export default Placeholder;
