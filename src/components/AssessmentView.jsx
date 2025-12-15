import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, Shield, Layers, Target } from 'lucide-react';
import { rfpService } from '../services/rfpService';
import { useParams } from 'react-router-dom';

const AssessmentView = () => {
    const { id } = useParams();
    const [scores, setScores] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        rfpService.getAssessment(id).then(data => {
            setScores(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <div className="text-slate-400 animate-pulse">Analyzing RFP criteria...</div>;

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-400';
        if (score >= 60) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Assessment Result</h2>
                    <p className="text-slate-400">AI-driven analysis of fit and probability</p>
                </div>
                <div className={`
          px-6 py-3 rounded-2xl border flex items-center gap-3 shadow-[0_0_30px_rgba(0,0,0,0.2)]
          ${scores.recommendation === 'PURSUE' ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}
        `}>
                    {scores.recommendation === 'PURSUE' ? <CheckCircle className="text-green-400" size={32} /> : <XCircle className="text-red-400" size={32} />}
                    <div>
                        <div className={`text-xs font-bold tracking-wider uppercase ${scores.recommendation === 'PURSUE' ? 'text-green-400' : 'text-red-400'}`}>
                            Recommendation
                        </div>
                        <div className="text-2xl font-bold text-white">{scores.recommendation}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ScoreCard
                    title="Business Strategy"
                    score={scores.businessStrategy}
                    icon={Target}
                    desc="Alignment with client goals"
                />
                <ScoreCard
                    title="Core Offerings"
                    score={scores.coreOfferings}
                    icon={Layers}
                    desc="Product/Service fit"
                />
                <ScoreCard
                    title="Resources"
                    score={scores.resourceAvailability}
                    icon={TrendingUp}
                    desc="Capacity to deliver"
                />
                <ScoreCard
                    title="Risk & Compliance"
                    score={scores.riskCompliance}
                    icon={Shield}
                    desc="Legal/Security exposure"
                />
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-slate-700/50">
                <h3 className="text-xl font-semibold mb-6">Detailed Insights</h3>
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-800/40 border-l-4 border-green-500">
                        <h4 className="font-semibold text-green-300 mb-1 flex items-center gap-2"><CheckCircle size={16} /> Strong Alignment</h4>
                        <p className="text-sm text-slate-300">The RFP prioritizes "User Experience Transformation", which matches our core "UX Studio" offering perfectly. Historical win rate for this category is 78%.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/40 border-l-4 border-yellow-500">
                        <h4 className="font-semibold text-yellow-300 mb-1 flex items-center gap-2"><AlertTriangle size={16} /> Potential Risk</h4>
                        <p className="text-sm text-slate-300">Timeline requirement (3 months) is aggressive compared to our standard delivery model (4-5 months). Requires executive approval for expedited resourcing.</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ScoreCard = ({ title, score, icon: Icon, desc }) => {
    const isHigh = score >= 80;
    const isMid = score >= 60 && score < 80;

    const colorClass = isHigh ? 'text-green-400' : isMid ? 'text-yellow-400' : 'text-red-400';
    const bgClass = isHigh ? 'bg-green-400' : isMid ? 'bg-yellow-400' : 'bg-red-400';

    return (
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className={`absolute top-0 right-0 p-3 opacity-10 ${colorClass}`}>
                <Icon size={80} />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-slate-800/50 ${colorClass}`}>
                        <Icon size={20} />
                    </div>
                    <h3 className="font-semibold text-slate-200 mb-1">{title}</h3>
                    <p className="text-xs text-slate-500 mb-4">{desc}</p>
                </div>

                <div className="flex items-end gap-2">
                    <span className={`text-4xl font-bold ${colorClass}`}>{score}</span>
                    <span className="text-sm text-slate-500 mb-1.5">/ 100</span>
                </div>

                <div className="w-full bg-slate-700/50 h-1.5 rounded-full mt-4">
                    <div className={`h-full rounded-full ${bgClass}`} style={{ width: `${score}%` }}></div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentView;
