import React, { useState, useRef, useCallback } from "react";
import spinnerImage from "./spinner.png"; // e.g. '../assets/spinner.png'

const FileUploadSection = function ({
  type,
  files,
  accept,
  onFileChange,
  icon,
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) => {
      return accept.some((acceptType) => file.type.includes(acceptType));
    });

    const updatedFiles = [
      ...files,
      ...droppedFiles.filter((newFile) => {
        return !files.some(
          (existingFile) => existingFile.name === newFile.name
        );
      }),
    ];

    onFileChange(updatedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const updatedFiles = [
      ...files,
      ...selectedFiles.filter((newFile) => {
        return !files.some(
          (existingFile) => existingFile.name === newFile.name
        );
      }),
    ];

    onFileChange(updatedFiles);
  };

  const handleRemoveFile = (indexToRemove) => {
    const newFiles = files.filter((_, index) => index !== indexToRemove);
    onFileChange(newFiles);
  };

  return (
    <div
      className={[
        "border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300",
        dragOver
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-blue-300",
      ].join(" ")}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={inputRef}
        multiple
        accept={accept.join(",")}
        onChange={handleFileSelect}
        className="hidden"
      />
      <div className="flex flex-col items-center">
        {icon}
        <p className="mt-4 text-gray-600">
          {files.length === 0
            ? "Drag and drop " + type + " files here, or"
            : files.length +
              " " +
              type +
              " file" +
              (files.length !== 1 ? "s" : "") +
              " selected"}
        </p>
        <button
          type="button"
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.click();
            }
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {files.length === 0 ? "Choose Files" : "Add More Files"}
        </button>
      </div>
      {files.length > 0 && (
        <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-2 rounded"
            >
              <span className="truncate max-w-[70%]">{file.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Landing = function () {
  const [videoFiles, setVideoFiles] = useState([]);
  const [excelFiles, setExcelFiles] = useState([]);
  const [errors, setErrors] = useState({
    video: null,
    excel: null,
    general: null,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const tutorialSteps = [
    "Prepare your video & performance files.",
    "Drag & drop or choose files below.",
    'Click "Process Files" to instantly generate insights!',
    "Monitor real-time performance data.",
    "Download comprehensive reports anytime.",
  ];

  const customerInsights = [
    "CAMcogni helped us reduce downtime by 25% in under a month!",
    "The data-driven performance tracking is a game-changer.",
    "We love how quickly we can visualize our process videos alongside real metrics!",
    "The user-friendly interface makes collaboration effortless.",
    "CAMcogni's automated reports saved us hours every week!",
  ];

  const validateFiles = useCallback(() => {
    let hasError = false;
    const newErrors = { video: null, excel: null, general: null };

    if (videoFiles.length === 0) {
      newErrors.video = "Please upload at least one video file";
      hasError = true;
    } else {
      const invalidVideoFiles = videoFiles.filter((file) => {
        return ![
          "video/mp4",
          "video/avi",
          "video/mov",
          "video/quicktime",
        ].includes(file.type);
      });
      if (invalidVideoFiles.length > 0) {
        newErrors.video =
          "Unsupported video format for: " +
          invalidVideoFiles.map((f) => f.name).join(", ");
        hasError = true;
      }
    }

    if (excelFiles.length === 0) {
      newErrors.excel = "Please upload at least one performance file";
      hasError = true;
    } else {
      const invalidExcelFiles = excelFiles.filter((file) => {
        return ![
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
          "text/csv",
        ].includes(file.type);
      });
      if (invalidExcelFiles.length > 0) {
        newErrors.excel =
          "Unsupported file format for: " +
          invalidExcelFiles.map((f) => f.name).join(", ");
        hasError = true;
      }
    }

    const MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500MB
    const MAX_EXCEL_SIZE = 50 * 1024 * 1024; // 50MB

    const oversizedVideoFiles = videoFiles.filter(
      (file) => file.size > MAX_VIDEO_SIZE
    );
    const oversizedExcelFiles = excelFiles.filter(
      (file) => file.size > MAX_EXCEL_SIZE
    );

    if (oversizedVideoFiles.length > 0) {
      newErrors.video =
        "Files exceed 500MB limit: " +
        oversizedVideoFiles.map((f) => f.name).join(", ");
      hasError = true;
    }

    if (oversizedExcelFiles.length > 0) {
      newErrors.excel =
        "Files exceed 50MB limit: " +
        oversizedExcelFiles.map((f) => f.name).join(", ");
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  }, [videoFiles, excelFiles]);

  const handleProcess = (e) => {
    e.preventDefault();
    if (validateFiles()) {
      setIsProcessing(true);
      setTimeout(() => {
        window.location.href = "/blueprint";
      }, 30000);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* 
        Overlay + Spinner (only visible if isProcessing === true).
        This overlay is translucent, letting the background show through.
      */}
      {isProcessing && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center">
          <img
            src={spinnerImage}
            alt="Processing..."
            className="animate-spin h-32 w-32"
          />
        </div>
      )}

      {/* Main content behind the overlay */}
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl overflow-hidden flex">
        {/* Left Side: Tutorial and Customer Insights */}
        <div className="w-1/3 bg-blue-50 p-8 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Quick Start Tutorial
            </h3>
            {tutorialSteps.map((step, idx) => (
              <p key={idx} className="text-gray-600 mb-2 flex items-center">
                <span className="mr-2 text-blue-500 font-bold">{idx + 1}.</span>
                {step}
              </p>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Customer Insights
            </h3>
            {customerInsights.map((insight, idx) => (
              <p key={idx} className="text-gray-600 mb-2 italic">
                "{insight}"
              </p>
            ))}
          </div>
        </div>

        {/* Right Side: File Upload Form */}
        <div className="w-2/3 p-8 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-400 mb-2">CAMcogni</h1>
            <p className="text-xl text-blue-500 mb-4">
              Upload. Analyze. Accelerate.
            </p>
            <p className="text-gray-600">
              Upload Multiple Videos and Performance Files
            </p>
          </div>

          <form onSubmit={handleProcess} className="space-y-6">
            {/* Error Messages */}
            {errors.video && (
              <div className="text-red-500 text-sm text-center animate-bounce">
                {errors.video}
              </div>
            )}
            {errors.excel && (
              <div className="text-red-500 text-sm text-center animate-bounce">
                {errors.excel}
              </div>
            )}

            {/* Video Upload Section */}
            <FileUploadSection
              type="video"
              files={videoFiles}
              accept={[
                "video/mp4",
                "video/avi",
                "video/mov",
                "video/quicktime",
              ]}
              onFileChange={setVideoFiles}
              icon={
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              }
            />

            {/* Performance File Upload Section */}
            <FileUploadSection
              type="performance"
              files={excelFiles}
              accept={[
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/vnd.ms-excel",
                "text/csv",
              ]}
              onFileChange={setExcelFiles}
              icon={
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              }
            />

            {/* Process Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md active:scale-95"
            >
              Process Files
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Landing;
