import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { rfpService } from '../services/rfpService';

const LandingPage = () => {
    const navigate = useNavigate();
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = useCallback(async (e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            await processFile(files[0]);
        }
    }, []);

    const handleFileSelect = async (e) => {
        if (e.target.files.length > 0) {
            await processFile(e.target.files[0]);
        }
    };

    const processFile = async (file) => {
        setIsUploading(true);
        try {
            const id = await rfpService.uploadRFP(file);
            navigate(`/dashboard/${id}`);
        } catch (error) {
            console.error("Upload failed", error);
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative bg-[#f8f9fc] text-[#1e293b]">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f1f5f9] -z-10 skew-x-12 origin-top" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-16 px-8"
            >
                {/* Text Side */}
                <div className="flex-1 space-y-6">
                    <h1 className="text-6xl font-extrabold text-[#2e1a47] leading-tight">
                        RFP <span className="text-[#00d4ff]">Pilot</span>
                    </h1>
                    <p className="text-xl text-[#64748b]">
                        Accelerate your sales cycle with intelligent RFP analysis and automated response drafting.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <button onClick={() => document.getElementById('file-input').click()} className="btn-primary flex items-center gap-2">
                            Start Analysis <ArrowRight size={18} />
                        </button>
                        <button onClick={() => processFile({ name: 'Demo_RFP.pdf' })} className="btn-outline">View Demo</button>
                    </div>
                </div>

                {/* Upload Card Side */}
                <motion.div
                    className={`flex-1 w-full card p-10 flex flex-col items-center justify-center text-center cursor-pointer border-2 border-dashed transition-all duration-300
            ${isDragging ? 'border-[#00d4ff] bg-[#eff6ff]' : 'border-slate-300 hover:border-[#2e1a47]'}
            ${isUploading ? 'pointer-events-none opacity-80' : ''}
          `}
                    style={{ minHeight: '400px' }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-input').click()}
                    whileHover={{ scale: 1.02 }}
                >
                    <input
                        type="file"
                        id="file-input"
                        className="hidden"
                        accept=".pdf,.docx,.txt"
                        onChange={handleFileSelect}
                    />

                    <div className="bg-[#f1f5f9] p-6 rounded-full mb-6">
                        {isUploading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            >
                                <CheckCircle className="w-12 h-12 text-[#00d4ff]" />
                            </motion.div>
                        ) : (
                            <Upload className="w-12 h-12 text-[#2e1a47]" />
                        )}
                    </div>

                    <h3 className="text-2xl font-bold text-[#1e293b] mb-2">
                        {isUploading ? 'Analyzing Document...' : 'Upload RFP'}
                    </h3>
                    <p className="text-[#64748b] max-w-xs mx-auto">
                        {isUploading
                            ? 'Extracting criteria, assessing risk, and matching capabilities...'
                            : 'Drag & drop your PDF or DOCX file here to begin.'}
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LandingPage;
