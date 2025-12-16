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

    if (!content) return <div className="p-10 text-center text-[#94A3B8]">Drafting response...</div>;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center bg-[#1A202C] p-4 rounded-xl border border-[rgba(255,255,255,0.05)]">
                <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                    <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse"></span>
                    AI Drafting Complete
                </div>
                <div className="flex gap-3">
                    <button onClick={handleSaveToDrive} disabled={saving} className="b-btn flex items-center gap-2">
                        <Save size={16} /> {saving ? 'Saving...' : 'Sync to Drive'}
                    </button>
                    <button onClick={handleDownloadPDF} className="b-btn secondary flex items-center gap-2">
                        <Download size={16} /> Export PDF
                    </button>
                </div>
            </div>

            <div className="b-card min-h-[600px] p-12 bg-[#0F131F] border-[rgba(255,255,255,0.05)] relative overflow-hidden group">
                {/* Decorative corner glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

                <div
                    className="prose prose-invert max-w-none outline-none font-serif text-[#E2E8F0] relative z-10 leading-relaxed"
                    contentEditable
                    dangerouslySetInnerHTML={{ __html: content }}
                    onBlur={(e) => setContent(e.currentTarget.innerHTML)}
                />
            </div>
        </div>
    );
};

export default DraftView;
