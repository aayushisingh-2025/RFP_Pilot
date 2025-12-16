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
            <div className="flex justify-end gap-2">
                <button onClick={handleSaveToDrive} disabled={saving} className="glass-btn flex items-center gap-2 text-neon-blue">
                    <Save size={16} /> {saving ? 'Saving...' : 'Save to Drive'}
                </button>
                <button onClick={handleDownloadPDF} className="glass-btn flex items-center gap-2 text-white">
                    <Download size={16} /> PDF
                </button>
            </div>

            <div className="glass-panel min-h-[600px] p-12">
                <div
                    className="prose prose-invert max-w-none outline-none font-serif text-white"
                    contentEditable
                    dangerouslySetInnerHTML={{ __html: content }}
                    onBlur={(e) => setContent(e.currentTarget.innerHTML)}
                />
            </div>
        </div>
    );
};

export default DraftView;
