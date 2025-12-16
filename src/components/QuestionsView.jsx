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
            <div className="flex justify-between items-center glass-panel bg-yellow-500/10 border-yellow-500/30 p-4">
                <div className="flex items-center gap-3">
                    <div className="bg-yellow-500/20 p-2 rounded-lg text-yellow-400">
                        <HelpCircle size={20} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-yellow-400">Intelligent Clarifications Needed</h3>
                        <p className="text-xs text-yellow-400/80">Generated based on gaps in Scope & Compliance sections</p>
                    </div>
                </div>
                <button onClick={handleSaveQnA} className="text-xs font-bold text-yellow-400 hover:underline flex items-center gap-1">
                    <Save size={14} /> Save List
                </button>
            </div>

            {questions.map((q) => (
                <div key={q.id} className="glass-card overflow-hidden">
                    <div
                        onClick={() => toggle(q.id)}
                        className="p-4 flex items-start gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                    >
                        <div className={`
                            px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-0.5
                            ${q.priority === 'High' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}
                        `}>
                            {q.priority}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-white">{q.question}</h4>
                        </div>
                        {expanded[q.id] ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
                    </div>

                    {expanded[q.id] && (
                        <div className="px-14 pb-4 text-sm text-muted space-y-2">
                            <p className="bg-white/5 p-3 rounded-lg">
                                <span className="font-bold text-white">Reasoning: </span>
                                {q.reasoning}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-neon-blue cursor-pointer hover:underline">
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
