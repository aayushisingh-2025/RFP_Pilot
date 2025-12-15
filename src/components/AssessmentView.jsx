import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, Shield, Layers, Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
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

    if (loading) return <div className="text-[#64748b] p-10 text-center">Loading analysis...</div>;

    const pieData = [
        { name: 'Business Strategy', value: scores.businessStrategy, color: '#2e1a47' },
        { name: 'Core Offerings', value: scores.coreOfferings, color: '#00d4ff' },
        { name: 'Resources', value: scores.resourceAvailability, color: '#10b981' },
        { name: 'Risk', value: scores.riskCompliance, color: '#f59e0b' },
    ];

    return (
        <div className="space-y-8">
            {/* Top Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Overall Score & Recommendation */}
                <div className="col-span-1 bg-white p-8 rounded-2xl shadow-sm border border-[#e2e8f0] flex flex-col justify-center items-center text-center">
                    <h3 className="text-[#64748b] font-medium uppercase tracking-wide text-sm mb-4">Overall Qualification</h3>
                    <div className="relative mb-6">
                        <div className="w-40 h-40 rounded-full border-8 border-[#f1f5f9] flex items-center justify-center">
                            <span className="text-5xl font-bold text-[#2e1a47]">{scores.overallScore}</span>
                        </div>
                        <div className="absolute top-0 right-0">
                            {scores.recommendation === 'PURSUE'
                                ? <CheckCircle className="text-[#10b981] bg-white rounded-full" size={40} />
                                : <XCircle className="text-[#ef4444] bg-white rounded-full" size={40} />
                            }
                        </div>
                    </div>
                    <div className={`px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase
              ${scores.recommendation === 'PURSUE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
           `}>
                        {scores.recommendation}
                    </div>
                </div>

                {/* Detailed Chart */}
                <div className="col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-[#e2e8f0]">
                    <h3 className="text-[#1e293b] font-bold text-lg mb-6">Score Breakdown by Category</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Insight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ScoreCard
                    title="Strategy"
                    score={scores.businessStrategy}
                    icon={Target}
                    desc="Alignment with goals"
                />
                <ScoreCard
                    title="Offerings"
                    score={scores.coreOfferings}
                    icon={Layers}
                    desc="Product fit"
                />
                <ScoreCard
                    title="Resources"
                    score={scores.resourceAvailability}
                    icon={TrendingUp}
                    desc="Team capacity"
                />
                <ScoreCard
                    title="Compliance"
                    score={scores.riskCompliance}
                    icon={Shield}
                    desc="Legal exposure"
                />
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#e2e8f0] shadow-sm">
                <h3 className="text-lg font-bold text-[#1e293b] mb-6">Key Insights & Risks</h3>
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#f0fdf4] border-l-4 border-[#10b981] flex gap-4">
                        <CheckCircle className="text-[#10b981] flex-shrink-0 mt-0.5" size={20} />
                        <div>
                            <h4 className="font-bold text-[#166534] mb-1">Strong Technical Match</h4>
                            <p className="text-sm text-[#166534]">The client's AWS migration requirement aligns 100% with our core competency. Win probability increases by 15%.</p>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#fffbeb] border-l-4 border-[#f59e0b] flex gap-4">
                        <AlertTriangle className="text-[#f59e0b] flex-shrink-0 mt-0.5" size={20} />
                        <div>
                            <h4 className="font-bold text-[#92400e] mb-1">Aggressive Timeline</h4>
                            <p className="text-sm text-[#92400e]">Requested 3-month delivery is risky. Standard delivery is 5 months. Mitigation: Propose phased rollout.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ScoreCard = ({ title, score, icon: Icon, desc }) => {
    const isHigh = score >= 80;
    const colorClass = isHigh ? 'text-[#10b981]' : score >= 60 ? 'text-[#f59e0b]' : 'text-[#ef4444]';

    return (
        <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg bg-[#f8f9fc] text-[#64748b]`}>
                    <Icon size={24} />
                </div>
                <span className={`text-2xl font-bold ${colorClass}`}>{score}%</span>
            </div>
            <h4 className="font-bold text-[#1e293b]">{title}</h4>
            <p className="text-xs text-[#94a3b8]">{desc}</p>
        </div>
    );
};

export default AssessmentView;
