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

    if (!content) return <div className="p-10 text-center text-[#5f6368]">Drafting response...</div>;

    return (
        <div className="space-y-4">
            <div className="flex justify-end gap-2">
                <button onClick={handleSaveToDrive} disabled={saving} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#1a73e8] bg-[#e8f0fe] rounded-lg hover:bg-[#d2e3fc]">
                    <Save size={16} /> {saving ? 'Saving...' : 'Save to Drive'}
                </button>
                <button onClick={handleDownloadPDF} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#3c4043] border border-[#dadce0] rounded-lg hover:bg-[#f1f3f4]">
                    <Download size={16} /> PDF
                </button>
            </div>

            <div className="bg-white border border-[#dadce0] rounded-xl min-h-[600px] p-12 shadow-sm">
                <div
                    className="prose max-w-none outline-none font-serif text-[#3c4043]"
                    contentEditable
                    dangerouslySetInnerHTML={{ __html: content }}
                    onBlur={(e) => setContent(e.currentTarget.innerHTML)}
                />
            </div>
        </div>
    );
};

export default DraftView;
