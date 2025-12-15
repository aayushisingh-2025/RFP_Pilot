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
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-6">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl w-full text-center space-y-8"
            >
                <div className="space-y-4">
                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        RFP Pilot
                    </h1>
                    <p className="text-xl text-slate-400">
                        Intelligent RFP Assessment & Response Automation
                    </p>
                </div>

                <motion.div
                    className={`glass-panel rounded-2xl p-12 border-2 border-dashed transition-all duration-300 cursor-pointer
            ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-slate-600'}
            ${isUploading ? 'pointer-events-none' : ''}
          `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-input').click()}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                >
                    <input
                        type="file"
                        id="file-input"
                        className="hidden"
                        accept=".pdf,.docx,.txt"
                        onChange={handleFileSelect}
                    />

                    <div className="flex flex-col items-center gap-6">
                        <div className={`p-4 rounded-full bg-slate-800/50 transition-all duration-500 ${isUploading ? 'animate-pulse' : ''}`}>
                            {isUploading ? (
                                <CheckCircle className="w-12 h-12 text-blue-500" />
                            ) : (
                                <Upload className="w-12 h-12 text-blue-400" />
                            )}
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-white">
                                {isUploading ? 'Processing RFP...' : 'Upload RFP Document'}
                            </h3>
                            <p className="text-slate-400">
                                {isUploading
                                    ? 'Analyzing requirements, extracting criteria...'
                                    : 'Drag & drop or click to browse (PDF, DOCX)'}
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="flex justify-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        SharePoint Connected
                    </span>
                    <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        Vertex AI Ready
                    </span>
                </div>
            </motion.div>
        </div>
    );
};

export default LandingPage;
