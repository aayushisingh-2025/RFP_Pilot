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

    if (questions.length === 0) return <div className="p-10 text-center text-[#5f6368]">Generating questions...</div>;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#fef7e0] p-4 rounded-xl border border-[#fee_fc8]">
                <div className="flex items-center gap-3">
                    <div className="bg-[#fce8b2] p-2 rounded-lg text-[#b06000]">
                        <HelpCircle size={20} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-[#b06000]">Intelligent Clarifications Needed</h3>
                        <p className="text-xs text-[#b06000]/80">Generated based on gaps in Scope & Compliance sections</p>
                    </div>
                </div>
                <button onClick={handleSaveQnA} className="text-xs font-bold text-[#b06000] hover:underline flex items-center gap-1">
                    <Save size={14} /> Save List
                </button>
            </div>

            {questions.map((q) => (
                <div key={q.id} className="bg-white border border-[#dadce0] rounded-xl overflow-hidden">
                    <div
                        onClick={() => toggle(q.id)}
                        className="p-4 flex items-start gap-4 cursor-pointer hover:bg-[#f8f9fa] transition-colors"
                    >
                        <div className={`
                            px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-0.5
                            ${q.priority === 'High' ? 'bg-[#fce8b2] text-[#e37400]' : 'bg-[#e8f0fe] text-[#1967d2]'}
                        `}>
                            {q.priority}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-[#202124]">{q.question}</h4>
                        </div>
                        {expanded[q.id] ? <ChevronUp size={16} className="text-[#5f6368]" /> : <ChevronDown size={16} className="text-[#5f6368]" />}
                    </div>

                    {expanded[q.id] && (
                        <div className="px-14 pb-4 text-sm text-[#5f6368] space-y-2">
                            <p className="bg-[#f1f3f4] p-3 rounded-lg">
                                <span className="font-bold text-[#3c4043]">Reasoning: </span>
                                {q.reasoning}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-[#1a73e8] cursor-pointer hover:underline">
                                <ExternalLink size={12} />
                                View Source Context (RFP Page 14)
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default QuestionsView;
