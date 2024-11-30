import React, { useState } from 'react';
import './GeminiPage.css';

const GeminiPage = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data from server');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let content = '';

      while (!done) {
        const { value, done: isDone } = await reader.read();
        done = isDone;
        content += decoder.decode(value, { stream: true });

        setResponse(content);
      }
    } catch (error) {
      console.error('Error generating content:', error);
      setResponse('Error generating content');
    }
  };

  return (
    <div className="gemini-page">
      <form onSubmit={handleSubmit} className="gemini-form">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
          className="gemini-textarea"
        />
        <button type="submit" className="gemini-button">
          Generate
        </button>
      </form>
      <div className="gemini-response-container">
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default GeminiPage;
