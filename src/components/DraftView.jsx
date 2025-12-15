import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, RefreshCw, Wand2 } from 'lucide-react';
import { rfpService } from '../services/rfpService';
import { useParams } from 'react-router-dom';

const DraftView = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        rfpService.getDraftResponse(id).then(data => {
            setContent(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <div className="text-slate-400 animate-pulse">Generating draft response...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Draft Response</h2>
                    <p className="text-slate-400 text-sm">AI-generated based on KB and historic wins</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors">
                        <RefreshCw size={14} />
                        Regenerate
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-sm transition-colors border border-blue-500/30">
                        <Wand2 size={14} />
                        AI Polish
                    </button>
                </div>
            </div>

            <div className="glass-panel rounded-xl overflow-hidden min-h-[600px] flex flex-col">
                {/* Toolbar */}
                <div className="bg-slate-800/50 p-3 border-b border-slate-700/50 flex gap-2">
                    <div className="flex gap-1 border-r border-slate-700 pr-3 mr-1">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <span className="text-xs text-slate-500 font-mono py-0.5">draft_v1.docx</span>
                </div>

                {/* Editor Area */}
                <div
                    className="flex-1 p-12 bg-slate-900/50 outline-none text-slate-300 font-serif leading-relaxed text-lg whitespace-pre-wrap"
                    contentEditable
                    dangerouslySetInnerHTML={{ __html: content }}
                    onBlur={(e) => setContent(e.currentTarget.innerHTML)}
                />
            </div>
        </motion.div>
    );
};

export default DraftView;
