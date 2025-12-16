import React, { useEffect, useState } from 'react';
import { rfpService, googleDriveService, DRIVE_CONFIG } from '../services/rfpService';
import { HelpCircle, ChevronDown, ChevronUp, Save, ExternalLink } from 'lucide-react';

const QuestionsView = () => {
    const [questions, setQuestions] = useState([]);
    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        rfpService.getQnA().then(setQuestions);
    }, []);

    const toggle = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSaveQnA = async () => {
        await googleDriveService.saveFile(
            DRIVE_CONFIG.OUTPUTS.QNA_DOCS,
            'Generated_QnA.xlsx',
            JSON.stringify(questions)
        );
        alert('QnA list saved to Google Drive!');
    };

    if (questions.length === 0) return <div className="p-10 text-center text-[#94A3B8]">Generating questions...</div>;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center bg-[rgba(251,188,5,0.05)] border border-[rgba(251,188,5,0.1)] p-4 rounded-xl">
                <div className="flex items-center gap-4">
                    <div className="bg-[rgba(251,188,5,0.1)] p-3 rounded-lg text-[#FBBC05]">
                        <HelpCircle size={24} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-[#FBBC05]">Clarification Intelligence</h3>
                        <p className="text-sm text-[#FBBC05]/70">Identifying ambiguity in Scope & Compliance</p>
                    </div>
                </div>
                <button onClick={handleSaveQnA} className="b-btn secondary text-[#FBBC05] border-[rgba(251,188,5,0.2)] hover:bg-[rgba(251,188,5,0.05)] flex items-center gap-2 text-xs">
                    <Save size={14} /> Export to Excel
                </button>
            </div>

            {questions.map((q) => (
                <div key={q.id} className="b-card overflow-hidden group">
                    <div
                        onClick={() => toggle(q.id)}
                        className="p-5 flex items-start gap-4 cursor-pointer hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                    >
                        <div className={`
                            px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider mt-0.5 border
                            ${q.priority === 'High' ? 'bg-[rgba(234,67,53,0.1)] text-[#EA4335] border-[rgba(234,67,53,0.2)]' : 'bg-[rgba(66,133,244,0.1)] text-[#4285F4] border-[rgba(66,133,244,0.2)]'}
                        `}>
                            {q.priority}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-base font-medium text-white group-hover:text-[#4285F4] transition-colors">{q.question}</h4>
                        </div>
                        {expanded[q.id] ? <ChevronUp size={20} className="text-[#94A3B8]" /> : <ChevronDown size={20} className="text-[#94A3B8]" />}
                    </div>

                    {expanded[q.id] && (
                        <div className="px-16 pb-6 text-sm text-[#94A3B8] space-y-3">
                            <div className="bg-[#1A202C] p-4 rounded-lg border border-[rgba(255,255,255,0.05)]">
                                <span className="block font-bold text-[#4285F4] mb-1 text-xs uppercase tracking-wider">Reasoning Logic</span>
                                {q.reasoning}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[#94A3B8] hover:text-white cursor-pointer transition-colors w-fit">
                                <ExternalLink size={12} />
                                View Source Context (Reference Page 14)
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default QuestionsView;
