import React, { useEffect, useState } from 'react';
import { rfpService } from '../services/rfpService';
import { CheckCircle, AlertCircle, FileText, ArrowUpRight } from 'lucide-react';

const AssessmentView = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        rfpService.getAssessment().then(setData);
    }, []);

    if (!data) return <div className="text-center p-10 text-muted">Analyzing fit with Intelia Strategy...</div>;

    return (
        <div className="space-y-6">
            <div className="glass-panel p-6 flex items-center justify-between bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-neon-blue/30">
                <div>
                    <h2 className="text-lg font-medium text-neon-blue">Assessment Summary</h2>
                    <p className="text-sm text-white/80 mt-1">Based on Intelia Business Rules & Historical Wins</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-normal text-white">{data.overallScore}/100</div>
                    <div className="text-xs font-medium uppercase tracking-wide text-neon-blue bg-neon-blue/10 px-2 py-1 rounded mt-1 inline-block border border-neon-blue/20">
                        Qualified
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {data.sections.map((section) => (
                    <div key={section.id} className="glass-card p-5">
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="font-medium text-white">{section.name}</h3>
                            <span className={`text-sm font-bold ${section.score >= 80 ? 'text-green-400' : 'text-orange-400'}`}>
                                {section.score}%
                            </span>
                        </div>

                        {/* Source Citation */}
                        <div className="flex items-center gap-2 text-xs text-muted bg-white/5 p-2 rounded-lg border border-white/10 w-fit">
                            <FileText size={12} />
                            <span>Source: {section.source}</span>
                            <ArrowUpRight size={12} className="text-neon-blue cursor-pointer" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssessmentView;
