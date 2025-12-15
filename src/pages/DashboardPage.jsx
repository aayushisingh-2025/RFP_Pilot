import React, { useState, useEffect } from 'react';
import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, PieChart, MessageSquare, ChevronLeft, Save, Share } from 'lucide-react';

const DashboardPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Basic mock metadata
    const docName = "Global_IT_Transformation_RFP_v2.docx";

    const tabs = [
        { id: 'assessment', label: 'Assessment', icon: PieChart, path: '' }, // Default
        { id: 'draft', label: 'Draft Response', icon: FileText, path: 'draft' },
        { id: 'questions', label: 'Client Questions', icon: MessageSquare, path: 'questions' },
    ];

    return (
        <div className="flex flex-col h-screen bg-[#0f172a] text-slate-100 font-sans">
            {/* Top Header */}
            <header className="h-16 border-b border-slate-700/50 bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-between px-6 z-20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-lg font-semibold text-white tracking-tight">RFP Workspace</h1>
                        <p className="text-xs text-slate-400 font-mono">{docName}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-all">
                        <Save size={16} />
                        Save to SharePoint
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-md shadow-lg shadow-blue-500/20 transition-all">
                        <Share size={16} />
                        Export
                    </button>
                </div>
            </header>

            {/* Main Layout */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar / Tabs */}
                <aside className="w-64 border-r border-slate-700/50 bg-[#1e293b]/50 p-4 flex flex-col gap-2">
                    <div className="mb-4 px-2">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Modules</p>
                    </div>

                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.id}
                            to={tab.path}
                            end={tab.path === ''}
                            className={({ isActive }) => `
                flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                ${isActive
                                    ? 'bg-blue-600/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)] border border-blue-500/20'
                                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}
              `}
                        >
                            <tab.icon size={20} />
                            <span className="font-medium text-sm">{tab.label}</span>
                            {tab.path === '' && (
                                <div className="ml-auto w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                            )}
                        </NavLink>
                    ))}

                    <div className="mt-auto">
                        <div className="glass-panel p-4 rounded-xl">
                            <p className="text-xs text-slate-400 mb-2">Strategy Score</p>
                            <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[82%]"></div>
                            </div>
                            <div className="flex justify-between mt-1">
                                <span className="text-xs text-white font-bold">82/100</span>
                                <span className="text-[10px] text-green-400 font-medium">PURSUE</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-8 relative">
                    <div className="max-w-5xl mx-auto pb-20">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
