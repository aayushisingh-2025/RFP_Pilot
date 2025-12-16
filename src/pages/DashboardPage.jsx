import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout, FileText, CheckSquare, HelpCircle, HardDrive, Plus, ArrowLeft } from 'lucide-react';
import { DRIVE_CONFIG } from '../services/rfpService';

const DashboardPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const modules = [
        { id: '', label: 'Assessment Matrix', icon: CheckSquare },
        { id: 'response', label: 'RFP Response', icon: FileText },
        { id: 'qna', label: 'Intelligent QnA', icon: HelpCircle },
    ];

    const sources = [
        { name: 'Existing RFPs', folderId: DRIVE_CONFIG.SOURCES.EXISTING_RFPS },
        { name: 'QnA Knowledge Base', folderId: DRIVE_CONFIG.SOURCES.QNA_KNOWLEDGE_BASE },
        { name: 'Intelia Website', isLink: true }
    ];

    return (
        <div className="flex h-screen text-white font-sans overflow-hidden">
            {/* Dashboard Sidebar */}
            <aside className="w-64 border-r border-white/5 flex flex-col p-4 z-10 bg-black/40 backdrop-blur-xl">
                <div onClick={() => navigate('/')} className="cursor-pointer mb-8 flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    <span className="font-medium text-sm">Return Home</span>
                </div>

                <div className="mb-8 flex-1">
                    <h2 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4 px-3">Start</h2>
                    <nav className="space-y-1">
                        {modules.map(mod => (
                            <NavLink
                                key={mod.id}
                                to={mod.id}
                                end={mod.id === ''}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition-colors
                                    ${isActive ? 'bg-white/10 text-neon-blue' : 'text-muted hover:bg-white/5 hover:text-white'}
                                `}
                            >
                                <mod.icon size={18} />
                                {mod.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Sources Section Removed as requested */}
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative z-0">
                <header className="h-16 flex items-center justify-between px-8 flex-shrink-0">
                    <h1 className="text-xl font-medium text-white animate-fadeIn">
                        {/* Dynamic Title based on Route */}
                        {location.pathname.includes('response') ? 'Draft Response' :
                            location.pathname.includes('qna') ? 'Client QnA' : 'Assessment'}
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider rounded border border-green-500/20">
                            Auto-sync Active
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto pb-20">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
