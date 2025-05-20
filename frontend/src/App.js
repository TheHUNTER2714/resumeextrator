import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import saveAs from 'file-saver';

function App() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (
      selected &&
      ![
        'application/pdf',
        'text/plain',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ].includes(selected.type)
    ) {
      alert('Unsupported file type! Please upload PDF, TXT, or DOCX.');
      return;
    }
    setFile(selected);
    setSkills([]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('resume', file);
    setLoading(true);

    try {
      const res = await axios.post(
        'https://resumeextrator.onrender.com/upload', 
        formData
      );
      setSkills(res.data.skills);
      alert('Skills extracted successfully!');
    } catch (err) {
      if (err.response) {
        alert(`Error uploading file: ${err.response.data.error || err.response.statusText}`);
        console.error('Response error:', err.response.data);
      } else if (err.request) {
        alert('No response from backend.');
        console.error('No response:', err.request);
      } else {
        alert(`Upload error: ${err.message}`);
        console.error('Error:', err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([skills.join(', ')], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(blob, 'extracted_skills.txt');
  };

  const gradientShapes = (
    <>
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-bounce"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-spin-slow"></div>
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400 to-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
    </>
  );

  if (!started) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-200 via-pink-200 to-yellow-200 animate-gradient-x">
        {gradientShapes}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6 drop-shadow-md">
            <Typewriter
              words={[
                'Welcome to Resume Skill Extractor',
                'Upload & Extract Skills Instantly',
              ]}
              loop={Infinity}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>
          <p className="text-lg text-gray-600 mb-8 animate-fade-in">
            Upload your resume and instantly extract relevant skills.
          </p>
          <motion.button
            onClick={() => setStarted(true)}
            whileHover={{ scale: 1.15, rotate: 2 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-xl animate-pulse"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-tr from-blue-100 via-white to-purple-100 flex flex-col items-center justify-center p-8 overflow-hidden animate-gradient-x">
      {gradientShapes}
      <motion.button
        onClick={() => setStarted(false)}
        whileHover={{ scale: 1.1 }}
        className="absolute top-4 left-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-full shadow"
      >
        ← Back
      </motion.button>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-blue-700 mb-6 z-10"
      >
        <Typewriter
          words={['React Developer', 'Skill Extractor', 'Open Source Contributor']}
          loop={0}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md z-10 animate-fade-in border-4 border-transparent hover:border-blue-400 transition duration-300"
      >
        <input
          type="file"
          accept=".pdf,.txt,.docx"
          onChange={handleFileChange}
          className="w-full mb-2 border border-gray-300 p-2 rounded-lg"
        />
        {file && (
          <p className="text-sm text-gray-600 mb-2">
            Selected file: {file.name}
          </p>
        )}

        <motion.button
          onClick={handleUpload}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:from-indigo-600 hover:to-blue-600 text-white py-2 rounded-lg font-semibold"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Extracting...
            </span>
          ) : (
            'Upload & Extract'
          )}
        </motion.button>

        {skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Extracted Skills{' '}
              <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full">
                {skills.length}
              </span>
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm shadow"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full shadow-md"
            >
              Download Skills
            </motion.button>
          </motion.div>
        )}

        {skills.length === 0 && !loading && file && started && (
          <p className="text-sm text-blue-500 mt-4">
            please upload your simple templates for extracting skill from your resume.
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default App;
