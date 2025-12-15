import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronRight, AlertCircle, Clock, DollarSign, Users } from 'lucide-react';
import { rfpService } from '../services/rfpService';
import { useParams } from 'react-router-dom';

const QuestionsView = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        rfpService.getQuestions(id).then(data => {
            setQuestions(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <div className="text-slate-400 animate-pulse">Identifying missing information...</div>;

    const getPriorityColor = (p) => {
        switch (p) {
            case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'Low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            default: return 'bg-slate-500/20 text-slate-400';
        }
    };

    const getCategoryIcon = (cat) => {
        switch (cat) {
            case 'Timeline': return <Clock size={16} />;
            case 'Budget': return <DollarSign size={16} />;
            case 'Stakeholders': return <Users size={16} />;
            default: return <AlertCircle size={16} />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
        >
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Clarification Questions</h2>
                <p className="text-slate-400 text-sm">Prioritized list of questions for the client based on ambiguities found.</p>
            </div>

            <div className="space-y-4">
                {questions.map((q, idx) => (
                    <motion.div
                        key={q.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-panel p-5 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-colors group cursor-pointer"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-slate-800 rounded-lg text-slate-400 group-hover:text-blue-400 transition-colors">
                                {getCategoryIcon(q.category)}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-semibold text-slate-200">{q.category}</h3>
                                    <span className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded border ${getPriorityColor(q.priority)}`}>
                                        {q.priority} Importance
                                    </span>
                                </div>
                                <p className="text-slate-300">{q.question}</p>
                            </div>

                            <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronRight className="text-slate-500" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default QuestionsView;
