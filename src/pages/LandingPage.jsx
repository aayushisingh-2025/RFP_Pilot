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
        <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-normal text-[#202124] mb-3">RFP Pilot <span className="text-[#1a73e8] font-medium">Workspace</span></h1>
                    <p className="text-[#5f6368] text-lg">Upload an empty RFP to generate intelligent responses using your knowledge base.</p>
                </div>

                <div className="bg-white rounded-2xl border border-[#dadce0] p-12 text-center hover:shadow-md transition-shadow cursor-pointer group"
                    onClick={() => document.getElementById('file-upload').click()}
                >
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={(e) => handleUpload(e.target.files[0])}
                    />

                    <div className="w-16 h-16 bg-[#e8f0fe] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#d2e3fc] transition-colors">
                        {uploading ? (
                            <div className="w-6 h-6 border-2 border-[#1a73e8] border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <Upload className="text-[#1a73e8]" size={32} />
                        )}
                    </div>

                    <h2 className="text-xl font-medium text-[#202124] mb-2">
                        {uploading ? 'Processing RFP...' : 'Upload Empty RFP'}
                    </h2>
                    <p className="text-[#5f6368] mb-6">Supported formats: PDF, Word, Excel</p>

                    {!uploading && (
                        <button className="bg-[#1a73e8] text-white px-6 py-2 rounded-full font-medium hover:bg-[#1557b0] transition-colors">
                            Select File
                        </button>
                    )}
                </div>

                <div className="mt-8 flex justify-center">
                    <button onClick={() => handleUpload({ name: 'Demo.pdf' })} className="text-[#5f6368] hover:text-[#202124] flex items-center gap-1 text-sm font-medium">
                        Try with a demo file <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
