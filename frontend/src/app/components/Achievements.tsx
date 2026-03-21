import React from 'react';
import { motion } from 'framer-motion';

const Badge = ({ icon, title, level, progress, color }: any) => (
    <div className="bg-white border border-black/5 p-8 rounded-[3rem] shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all group relative overflow-hidden">
        <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-neutral-50 rounded-full blur-2xl group-hover:bg-brand-orange/5 transition-colors" />
        <div className="flex flex-col items-center gap-6 relative z-10">
            <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center text-4xl shadow-lg border border-black/5 ${
                color === 'orange' ? 'bg-brand-orange/10 text-brand-orange' : 
                color === 'blue' ? 'bg-brand-blue/10 text-brand-blue' : 
                'bg-brand-pink/10 text-brand-pink'
            }`}>
                {icon}
            </div>
            <div className="text-center">
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text mb-2">{title}</h5>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-[9px] font-black text-brand-text/30">LEVEL</span>
                    <span className="text-lg font-black">{level}</span>
                </div>
            </div>
            <div className="w-full h-1.5 bg-neutral-50 rounded-full overflow-hidden border border-black/5">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className={`h-full rounded-full ${
                        color === 'orange' ? 'bg-brand-orange shadow-[0_0_10px_rgba(255,92,0,0.5)]' : 
                        color === 'blue' ? 'bg-brand-blue shadow-[0_0_10px_rgba(0,95,255,0.5)]' : 
                        'bg-brand-pink shadow-[0_0_10px_rgba(255,0,193,0.5)]'
                    }`}
                />
            </div>
        </div>
    </div>
);

export const Achievements: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
            <Badge icon="🧠" title="Sync Master" level="04" progress={85} color="orange" />
            <Badge icon="⚡" title="Speed Demon" level="02" progress={42} color="blue" />
            <Badge icon="🛡️" title="Logic Wall" level="01" progress={90} color="pink" />
            <Badge icon="🚀" title="Alpha Node" level="07" progress={12} color="orange" />
        </div>
    );
};
