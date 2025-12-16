import React, { useEffect, useState } from 'react';
import { rfpService, googleDriveService, DRIVE_CONFIG } from '../services/rfpService';
import { Download, Save, RefreshCw } from 'lucide-react';
import { jsPDF } from "jspdf";

const DraftView = () => {
    const [content, setContent] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        rfpService.getGeneratedResponse().then(setContent);
    }, []);

    const handleSaveToDrive = async () => {
        setSaving(true);
        await googleDriveService.saveFile(
            DRIVE_CONFIG.OUTPUTS.RESPONSES,
            'Draft_Response_v1.docx',
            content
        );
        setSaving(false);
        alert('Saved to Google Drive Folder: ' + DRIVE_CONFIG.OUTPUTS.RESPONSES);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text(content.replace(/<[^>]*>?/gm, ''), 10, 10);
        doc.save("RFP_Response_Draft.pdf");
    };

    if (!content) return <div className="p-10 text-center text-muted">Drafting response...</div>;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    AI Drafting Complete
                </div>
                <div className="flex gap-3">
                    <button onClick={handleSaveToDrive} disabled={saving} className="aura-button flex items-center gap-2">
                        <Save size={16} /> {saving ? 'Saving...' : 'Sync to Drive'}
                    </button>
                    <button onClick={handleDownloadPDF} className="aura-button secondary flex items-center gap-2">
                        <Download size={16} /> Export PDF
                    </button>
                </div>
            </div>

            <div className="aura-card min-h-[600px] p-12 bg-black/20 border-white/5 relative overflow-hidden group">
                {/* Decorative corner glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-accent-primary/10 transition-colors duration-500"></div>

                <div
                    className="prose prose-invert max-w-none outline-none font-serif text-white/90 relative z-10 leading-relaxed"
                    contentEditable
                    dangerouslySetInnerHTML={{ __html: content }}
                    onBlur={(e) => setContent(e.currentTarget.innerHTML)}
                />
            </div>
        </div>
    );
};

export default DraftView;
