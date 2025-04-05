import React, { useEffect, useState } from 'react';
import supabase from './supabaseClient';

function Leaderboard() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchMemes = async () => {
      const { data, error } = await supabase
        .from('memes')
        .select('*')
        .order('upVote', { ascending: false });

      if (error) {
        console.error('Error fetching leaderboard:', error.message);
      } else {
        setMemes(data);
      }
    };

    fetchMemes();
  }, []);

return (
  
  <div className="leaderboard-app">
  <header className="nav-header">
  <nav className="nav-bar">
    <a href="https://luna-meme-generator.vercel.app/">🖼️ Generator</a>
    <a href="https://luna-meme-voting.vercel.app/">🗳️ Voting</a>
    <a href="https://luna-meme-leaderboard.vercel.app/">📊 Leaderboard</a>
  </nav>
</header>
    <h1 className="title">🏆 Meme Leaderboard</h1>
    <div className="meme-grid">
      {memes.map((meme, index) => (
        <div className="meme-card" key={meme.id}>
          <h3 className="rank">#{index + 1}</h3>
          <img src={meme.image_url} alt={meme.text} />
          <p className="meme-text">{meme.text}</p>
          <p className="vote-count">🔥 Votes: {meme.upVote}</p>
        </div>
      ))}
    </div>
  </div>
);
}

export default Leaderboard;
