import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ChevronRight, File } from 'lucide-react';
import { rfpService } from '../services/rfpService';

const LandingPage = () => {
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (file) => {
        setUploading(true);
        const id = await rfpService.uploadRFP(file);
        navigate(`/dashboard/${id}`);
    };

    <div className="min-h-screen flex items-center justify-center p-4 relative bg-[#0B0F19]">
        {/* Background Google Glows - Subtle */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-green-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="w-full max-w-[480px] relative z-10 animate-fade-in text-center">
            <div className="mb-10">
                <h1 className="text-h1 text-white mb-2">
                    RFP <span className="text-g-blue">Pilot</span>
                </h1>
                <p className="text-[#94A3B8] text-lg">Intelligent Proposal Automation</p>
            </div>

            <div className="b-card p-10 text-center mx-auto shadow-2xl"
                onClick={() => document.getElementById('file-upload').click()}
            >
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={(e) => handleUpload(e.target.files[0])}
                />

                <div className="w-20 h-20 bg-[#1A202C] rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-105 transition-transform duration-300 border border-[#30363d]">
                    {uploading ? (
                        <div className="w-8 h-8 border-4 border-t-[#4285F4] border-r-[#EA4335] border-b-[#FBBC05] border-l-[#34A853] rounded-full animate-spin"></div>
                    ) : (
                        <Upload className="text-[#4285F4]" size={36} />
                    )}
                </div>

                <h2 className="text-h2 text-white mb-3">
                    {uploading ? 'Analyzing...' : 'Upload RFP'}
                </h2>
                <p className="text-[#94A3B8] text-sm mb-8 leading-relaxed">
                    Drag and drop your document here, or click to browse files.
                    <br />Supports PDF, DOCX, XLSX.
                </p>

                {!uploading && (
                    <button className="b-btn w-full justify-center shadow-lg shadow-blue-500/20">
                        Select Document
                    </button>
                )}
            </div>
        </div>
    </div>
    );
};

export default LandingPage;
