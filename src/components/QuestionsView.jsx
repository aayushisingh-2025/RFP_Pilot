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

    if (questions.length === 0) return <div className="p-10 text-center text-muted">Generating questions...</div>;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl">
                <div className="flex items-center gap-4">
                    <div className="bg-orange-500/20 p-3 rounded-lg text-orange-400">
                        <HelpCircle size={24} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-orange-400">Clarification Intelligence</h3>
                        <p className="text-sm text-orange-400/70">Identifying ambiguity in Scope & Compliance</p>
                    </div>
                </div>
                <button onClick={handleSaveQnA} className="aura-button secondary text-orange-400 border-orange-500/30 hover:bg-orange-500/10 flex items-center gap-2 text-xs">
                    <Save size={14} /> Export to Excel
                </button>
            </div>

            {questions.map((q) => (
                <div key={q.id} className="aura-card overflow-hidden group">
                    <div
                        onClick={() => toggle(q.id)}
                        className="p-5 flex items-start gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                    >
                        <div className={`
                            px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider mt-0.5 border
                            ${q.priority === 'High' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}
                        `}>
                            {q.priority}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-base font-medium text-white group-hover:text-accent-primary transition-colors">{q.question}</h4>
                        </div>
                        {expanded[q.id] ? <ChevronUp size={20} className="text-muted" /> : <ChevronDown size={20} className="text-muted" />}
                    </div>

                    {expanded[q.id] && (
                        <div className="px-16 pb-6 text-sm text-text-secondary space-y-3">
                            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                                <span className="block font-bold text-accent-primary mb-1 text-xs uppercase tracking-wider">Reasoning Logic</span>
                                {q.reasoning}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-text-secondary hover:text-white cursor-pointer transition-colors w-fit">
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
