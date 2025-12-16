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

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-md w-full relative z-10 animate-fadeIn">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
                        RFP <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Pilot</span>
                    </h1>
                    <p className="text-muted text-base">Intelligent Proposal Automation</p>
                </div>

                <div className="aura-card p-8 text-center"
                    onClick={() => document.getElementById('file-upload').click()}
                >
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={(e) => handleUpload(e.target.files[0])}
                    />

                    <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        {uploading ? (
                            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <Upload className="text-accent-primary" size={40} />
                        )}
                    </div>

                    <h2 className="text-lg font-semibold text-white mb-2">
                        {uploading ? 'Analyzing Document...' : 'Upload RFP Document'}
                    </h2>
                    <p className="text-sm text-muted mb-8">Drag & drop or click to browse</p>

                    {!uploading && (
                        <button className="aura-button w-full shadow-lg shadow-purple-500/25">
                            Select Document
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
