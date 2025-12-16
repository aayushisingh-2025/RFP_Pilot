import React, { useEffect, useState } from 'react';
import { rfpService } from '../services/rfpService';
import { CheckCircle, AlertCircle, FileText, ArrowUpRight } from 'lucide-react';

const AssessmentView = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        rfpService.getAssessment().then(setData);
    }, []);

    if (!data) return <div className="text-center p-10 text-[#5f6368]">Analyzing fit with Intelia Strategy...</div>;

    return (
        <div className="space-y-6">
            <div className="bg-[#e8f0fe] p-6 rounded-xl border border-[#d2e3fc] flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-medium text-[#174ea6]">Assessment Summary</h2>
                    <p className="text-sm text-[#1967d2] mt-1">Based on Intelia Business Rules & Historical Wins</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-normal text-[#174ea6]">{data.overallScore}/100</div>
                    <div className="text-xs font-medium uppercase tracking-wide text-[#1967d2] bg-white/50 px-2 py-1 rounded mt-1 inline-block">
                        Qualified
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {data.sections.map((section) => (
                    <div key={section.id} className="bg-white p-5 rounded-xl border border-[#dadce0] hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="font-medium text-[#202124]">{section.name}</h3>
                            <span className={`text-sm font-bold ${section.score >= 80 ? 'text-[#137333]' : 'text-[#ea8600]'}`}>
                                {section.score}%
                            </span>
                        </div>

                        {/* Source Citation */}
                        <div className="flex items-center gap-2 text-xs text-[#5f6368] bg-[#f8f9fa] p-2 rounded-lg border border-[#f1f3f4] w-fit">
                            <FileText size={12} />
                            <span>Source: {section.source}</span>
                            <ArrowUpRight size={12} className="text-[#1a73e8] cursor-pointer" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssessmentView;
