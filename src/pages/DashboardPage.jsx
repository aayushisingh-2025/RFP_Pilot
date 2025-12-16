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
            <aside className="w-64 b-sidebar flex flex-col p-4 z-10">
                <div onClick={() => navigate('/')} className="cursor-pointer mb-8 flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors">
                    <ArrowLeft size={16} />
                    <span className="font-medium text-sm">Main Menu</span>
                </div>

                <div className="mb-8 flex-1">
                    <h2 className="text-label mb-4 px-3">Pilot Tools</h2>
                    <nav className="space-y-1">
                        {modules.map(mod => (
                            <NavLink
                                key={mod.id}
                                to={mod.id}
                                end={mod.id === ''}
                                className={({ isActive }) => `
                                    b-nav-item ${isActive ? 'active' : ''}
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
                <header className="h-16 flex items-center justify-between px-8 flex-shrink-0 border-b border-[rgba(255,255,255,0.05)]">
                    <h1 className="text-xl font-semibold text-white animate-fade-in tracking-tight">
                        {/* Dynamic Title based on Route */}
                        {location.pathname.includes('response') ? 'Draft Response' :
                            location.pathname.includes('qna') ? 'Client QnA' : 'Assessment'}
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-g-green-subtle text-g-green text-[10px] font-bold uppercase tracking-wider rounded">
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
