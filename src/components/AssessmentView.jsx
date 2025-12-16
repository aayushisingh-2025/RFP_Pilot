import React, { useEffect, useState } from 'react';
import { rfpService } from '../services/rfpService';
import { CheckCircle, AlertCircle, FileText, ArrowUpRight } from 'lucide-react';

const AssessmentView = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        rfpService.getAssessment().then(setData);
    }, []);

    if (!data) return <div className="text-center p-10 text-[#94A3B8] animate-pulse">Running Compliance & Strategy Checks...</div>;

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Hero Score Card */}
            <div className="b-card p-8 flex items-center justify-between bg-gradient-to-r from-[rgba(66,133,244,0.05)] to-[rgba(52,168,83,0.05)] border-l-4 border-l-[#4285F4]">
                <div>
                    <h2 className="text-h2 text-white mb-2">Strategic Fit Score</h2>
                    <p className="text-sm text-[#94A3B8] max-w-md">
                        Calculated based on Intelia's historical win criteria, resource availability, and technical compliance.
                    </p>
                </div>
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-[#333]" />
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent"
                            strokeDasharray={351.86}
                            strokeDashoffset={351.86 - (351.86 * data.overallScore) / 100}
                            className="text-[#4285F4] drop-shadow-[0_0_8px_rgba(66,133,244,0.4)] transition-all duration-1000 ease-out"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-white">{data.overallScore}</span>
                        <span className="text-label text-[#4285F4]">Points</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {data.sections.map((section) => (
                    <div key={section.id} className="b-card p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-white">{section.name}</h3>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${section.score >= 80 ? 'bg-g-green-subtle text-g-green' : 'bg-g-yellow-subtle text-g-yellow'}`}>
                                {section.score}% Match
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-[#1A202C] rounded-full h-1.5 overflow-hidden">
                            <div
                                className={`h-1.5 rounded-full ${section.score >= 80 ? 'bg-[#34A853]' : 'bg-[#FBBC05]'}`}
                                style={{ width: `${section.score}%` }}
                            ></div>
                        </div>

                        {/* Source Citation */}
                        <div className="flex items-center gap-2 text-xs text-[#94A3B8] pt-2 border-t border-[rgba(255,255,255,0.05)]">
                            <FileText size={12} />
                            <span>Source: <span className="text-white/70">{section.source}</span></span>
                            <div className="ml-auto flex items-center gap-1 text-[#4285F4] cursor-pointer hover:underline">
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
