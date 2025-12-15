import React, { useState, useEffect } from 'react';
import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, PieChart, MessageSquare, ChevronLeft, Save, Share, Home, Settings } from 'lucide-react';

const DashboardPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const docName = "Global_IT_Transformation_RFP_v2.docx";

    const tabs = [
        { id: 'assessment', label: 'Assessment', icon: PieChart, path: '' },
        { id: 'draft', label: 'Draft Response', icon: FileText, path: 'draft' },
        { id: 'questions', label: 'Client Questions', icon: MessageSquare, path: 'questions' },
    ];

    return (
        <div className="flex bg-[#f8f9fc] min-h-screen font-sans">

            {/* Sidebar - Fixed Left */}
            <aside className="w-72 bg-white border-r border-[#e2e8f0] flex flex-col fixed h-full z-10 shadow-sm">
                <div className="h-20 flex items-center px-8 border-b border-[#f1f5f9]">
                    <div className="flex items-center gap-2 text-[#2e1a47] font-bold text-2xl">
                        <span>RFP Pilot</span>
                    </div>
                </div>

                <nav className="p-4 space-y-2 flex-1">
                    <NavLink to="/" className="flex items-center gap-3 px-4 py-3 text-[#64748b] hover:bg-[#f1f5f9] rounded-lg transition-colors mb-6">
                        <Home size={20} />
                        <span className="font-medium">Home</span>
                    </NavLink>

                    <div className="px-4 mb-2">
                        <span className="text-xs font-semibold text-[#94a3b8] uppercase tracking-widest">RFP Modules</span>
                    </div>

                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.id}
                            to={tab.path}
                            end={tab.path === ''}
                            className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive
                                    ? 'bg-[#2e1a47] text-white shadow-md shadow-indigo-500/20'
                                    : 'text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#2e1a47]'}
              `}
                        >
                            <tab.icon size={20} />
                            <span className="font-medium">{tab.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-6 border-t border-[#f1f5f9] bg-[#f8fafc]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#00d4ff] flex items-center justify-center text-[#2e1a47] font-bold">
                            AS
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-[#1e293b] truncate">Aayushi Singh</p>
                            <p className="text-xs text-[#64748b]">Sales Lead</p>
                        </div>
                        <Settings size={18} className="text-[#94a3b8] cursor-pointer hover:text-[#2e1a47]" />
                    </div>
                </div>
            </aside>

            {/* Main Content - Scrollable Right */}
            <div className="flex-1 ml-72 flex flex-col min-h-screen">

                {/* Top Header */}
                <header className="h-20 bg-white border-b border-[#e2e8f0] flex items-center justify-between px-8 shadow-sm text-[#1e293b] sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-[#f1f5f9] rounded-lg">
                            <FileText size={24} className="text-[#2e1a47]" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">{docName}</h2>
                            <div className="flex items-center gap-2 text-xs text-[#64748b]">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Processing Complete
                                <span>•</span>
                                Last updated 2 mins ago
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="btn-outline flex items-center gap-2">
                            <Save size={18} /> Save Draft
                        </button>
                        <button className="btn-primary flex items-center gap-2">
                            <Share size={18} /> Export
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>

            </div>
        </div>
    );
};

export default DashboardPage;
