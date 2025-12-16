import React, { useEffect, useState } from 'react';
import { rfpService } from '../services/rfpService';
import { CheckCircle, AlertCircle, FileText, ArrowUpRight } from 'lucide-react';

const AssessmentView = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        rfpService.getAssessment().then(setData);
    }, []);

    if (!data) return <div className="text-center p-10 text-muted animate-pulse">Running Compliance & Strategy Checks...</div>;

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Hero Score Card */}
            <div className="aura-card p-8 flex items-center justify-between bg-gradient-to-r from-violet-900/20 to-fuchsia-900/20 border-violet-500/20">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Strategic Fit Score</h2>
                    <p className="text-sm text-text-secondary max-w-md">
                        Calculated based on Intelia's historical win criteria, resource availability, and technical compliance.
                    </p>
                </div>
                <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Simplified Circular Progress CSS */}
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent"
                            strokeDasharray={351.86}
                            strokeDashoffset={351.86 - (351.86 * data.overallScore) / 100}
                            className="text-accent-primary drop-shadow-[0_0_10px_rgba(112,0,255,0.5)] transition-all duration-1000 ease-out"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-white">{data.overallScore}</span>
                        <span className="text-[10px] uppercase tracking-wider text-accent-primary font-bold">Points</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {data.sections.map((section) => (
                    <div key={section.id} className="aura-card p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-white">{section.name}</h3>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${section.score >= 80 ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
                                {section.score}% Match
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-white/5 rounded-full h-1.5">
                            <div
                                className={`h-1.5 rounded-full ${section.score >= 80 ? 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.3)]' : 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.3)]'}`}
                                style={{ width: `${section.score}%` }}
                            ></div>
                        </div>

                        {/* Source Citation */}
                        <div className="flex items-center gap-2 text-xs text-text-secondary pt-2 border-t border-white/5">
                            <FileText size={12} className="text-white/30" />
                            <span>Source: <span className="text-white/70">{section.source}</span></span>
                            <div className="ml-auto flex items-center gap-1 text-accent-secondary cursor-pointer hover:underline">
                                <span>Verify Context</span>
                                <ArrowUpRight size={12} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssessmentView;
