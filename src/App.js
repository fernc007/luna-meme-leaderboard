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
    <div style={{ padding: '20px' }}>
      <h1>🏆 Meme Leaderboard</h1>
      <div style={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
      }}>
        {memes.map((meme, index) => (
          <div
            key={meme.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '10px',
              background: '#fff',
              textAlign: 'center'
            }}
          >
            <h3>#{index + 1}</h3>
            <img
              src={meme.image_url}
              alt={meme.text}
              style={{ maxWidth: '100%', borderRadius: '6px' }}
            />
            <p style={{ fontWeight: 'bold' }}>{meme.text}</p>
            <p>🔥 Votes: {meme.upVote}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
