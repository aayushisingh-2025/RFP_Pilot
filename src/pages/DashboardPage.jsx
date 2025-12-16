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
        <div className="flex h-screen bg-[#f0f2f5] text-[#1f1f1f] font-sans">
            {/* Minimalist Sidebar */}
            <aside className="w-64 bg-white border-r border-[#dadce0] flex flex-col p-4 z-10">
                <div onClick={() => navigate('/')} className="cursor-pointer mb-8 flex items-center gap-2 text-[#5f6368] hover:text-[#1a73e8] transition-colors">
                    <ArrowLeft size={18} />
                    <span className="font-medium text-sm">Back to Home</span>
                </div>

                <div className="mb-8">
                    <h2 className="text-xs font-bold text-[#5f6368] uppercase tracking-wider mb-4 px-2">Workspace</h2>
                    <nav className="space-y-1">
                        {modules.map(mod => (
                            <NavLink
                                key={mod.id}
                                to={mod.id}
                                end={mod.id === ''}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition-colors
                                    ${isActive ? 'bg-[#e8f0fe] text-[#1a73e8]' : 'text-[#3c4043] hover:bg-[#f1f3f4]'}
                                `}
                            >
                                <mod.icon size={18} />
                                {mod.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <h2 className="text-xs font-bold text-[#5f6368] uppercase tracking-wider mb-4 px-2">Sources (Drive)</h2>
                    <div className="space-y-2">
                        {sources.map((src, idx) => (
                            <div key={idx} className="flex items-center gap-3 px-3 py-2 rounded-lg border border-[#dadce0] bg-white cursor-pointer hover:bg-[#f8f9fa]">
                                <HardDrive size={16} className="text-[#5f6368]" />
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-[#3c4043] truncate">{src.name}</p>
                                    <p className="text-[10px] text-[#5f6368] truncate">
                                        {src.isLink ? 'External Link' : 'Google Drive'}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <button className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-[#1a73e8] border border-dashed border-[#dadce0] rounded-lg hover:bg-[#f1f3f4]">
                            <Plus size={14} /> Add Source
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-hidden flex flex-col relative">
                <header className="h-16 bg-white border-b border-[#dadce0] flex items-center justify-between px-8 flex-shrink-0">
                    <h1 className="text-xl font-normal text-[#1f1f1f]">
                        {/* Dynamic Title based on Route */}
                        {location.pathname.includes('response') ? 'Draft Response' :
                            location.pathname.includes('qna') ? 'Client QnA' : 'Assessment'}
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-[#e6f4ea] text-[#137333] text-xs font-medium rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#137333]"></span>
                            Auto-saved to Drive
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
