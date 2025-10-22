'use client';

import { useState } from 'react';
import { generateVideo as generateVideoClient } from '@/lib/videoGenerator';

export default function Home() {
  const [text, setText] = useState('');
  const [style, setStyle] = useState({
    fontSize: 48,
    color: '#ffffff',
    backgroundColor: '#000000',
    fontFamily: 'Arial, sans-serif'
  });
  const [duration, setDuration] = useState(3);
  const [animation, setAnimation] = useState('fade');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const generateVideo = async () => {
    if (!text.trim()) {
      alert('Please enter some text');
      return;
    }

    setIsGenerating(true);
    setVideoUrl('');

    try {
      // Generate video on client side using canvas
      const blob = await generateVideoClient({
        text,
        style,
        duration,
        animation
      });

      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate video. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadVideo = () => {
    if (!videoUrl) return;

    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = 'text-video.webm';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Text to Video Generator</h1>
          <p className="text-gray-300 text-lg">Transform your text into animated videos instantly</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-4">Input</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Text Content</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your text here..."
                  className="w-full h-32 px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  maxLength={200}
                />
                <div className="text-gray-400 text-sm mt-1">{text.length}/200 characters</div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Duration (seconds)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-gray-400 text-sm">{duration}s</div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Animation Style</label>
                <select
                  value={animation}
                  onChange={(e) => setAnimation(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="fade">Fade In</option>
                  <option value="slide">Slide In</option>
                  <option value="zoom">Zoom In</option>
                  <option value="typewriter">Typewriter</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Font Size</label>
                <input
                  type="range"
                  min="24"
                  max="96"
                  value={style.fontSize}
                  onChange={(e) => setStyle({...style, fontSize: Number(e.target.value)})}
                  className="w-full"
                />
                <div className="text-gray-400 text-sm">{style.fontSize}px</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Text Color</label>
                  <input
                    type="color"
                    value={style.color}
                    onChange={(e) => setStyle({...style, color: e.target.value})}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Background Color</label>
                  <input
                    type="color"
                    value={style.backgroundColor}
                    onChange={(e) => setStyle({...style, backgroundColor: e.target.value})}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
              </div>

              <button
                onClick={generateVideo}
                disabled={isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              >
                {isGenerating ? 'Generating...' : 'Generate Video'}
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-4">Preview</h2>

            <div className="space-y-4">
              <div
                className="w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: style.backgroundColor,
                }}
              >
                {videoUrl ? (
                  <video
                    src={videoUrl}
                    controls
                    className="w-full h-full"
                    autoPlay
                    loop
                  />
                ) : (
                  <div
                    className="text-center p-8"
                    style={{
                      color: style.color,
                      fontSize: `${style.fontSize}px`,
                      fontFamily: style.fontFamily,
                    }}
                  >
                    {text || 'Your text will appear here'}
                  </div>
                )}
              </div>

              {videoUrl && (
                <button
                  onClick={downloadVideo}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                >
                  Download Video
                </button>
              )}

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Tips</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Keep text concise for better readability</li>
                  <li>• Adjust duration based on text length</li>
                  <li>• High contrast colors work best</li>
                  <li>• Try different animation styles</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
