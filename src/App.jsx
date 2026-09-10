import React, { useState } from 'react';
import './App.css';

const ARTISTS = [
  { id: '1', name: 'Arijit Singh', genre: 'Bollywood / Soul' },
  { id: '2', name: 'Shreya Ghoshal', genre: 'Classical / Melody' },
  { id: '3', name: 'Armaan Malik', genre: 'Pop / Romantic' },
  { id: '4', name: 'Hardy Sandhu', genre: 'Punjabi Pop' },
  { id: '5', name: 'Jasleen Royal', genre: 'Indie / Folk' }
];

const FOODS = [
  { id: '1', name: 'Samosa', price: 30 },
  { id: '2', name: 'Pizza', price: 200 },
  { id: '3', name: 'Burger', price: 120 },
  { id: '4', name: 'Dosa', price: 100 },
  { id: '5', name: 'Kachori', price: 40 },
  { id: '6', name: 'Idli', price: 60 },
  { id: '7', name: 'Vada Sambar', price: 80 }
];

const GAMES = [
  { id: '1', name: 'BGMI Tournament', price: 150 },
  { id: '2', name: 'Valorant League', price: 200 },
  { id: '3', name: 'FIFA 2026 Arena', price: 100 },
  { id: '4', name: 'Tekken 8 Clash', price: 100 }
];

const PASSES = [
  { id: 'bronze', name: 'Bronze Pass', price: 500, benefits: 'Basic TechFest Entry' },
  { id: 'silver', name: 'Silver Pass', price: 1000, benefits: 'Entry + Front Zone' },
  { id: 'gold', name: 'Gold Pass', price: 2000, benefits: 'VIP Access + Backstage' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [foodQuantities, setFoodQuantities] = useState({});
  const [selectedGames, setSelectedGames] = useState([]);
  const [selectedPass, setSelectedPass] = useState(PASSES[0]);
  const [ticketGenerated, setTicketGenerated] = useState(false);

  // Handlers
  const handleArtistToggle = (id) => {
    setSelectedArtists((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFoodChange = (id, delta) => {
    setFoodQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleGameToggle = (id) => {
    setSelectedGames((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculations
  const foodTotal = FOODS.reduce(
    (sum, item) => sum + item.price * (foodQuantities[item.id] || 0),
    0
  );
  const gamesTotal = GAMES.filter((item) => selectedGames.includes(item.id)).reduce(
    (sum, item) => sum + item.price,
    0
  );
  const grandTotal = selectedPass.price + foodTotal + gamesTotal;

  const generateTicket = () => {
    if (!name.trim() || !rollNo.trim()) {
      alert('Please fill out your Name and Roll Number!');
      return;
    }
    setTicketGenerated(true);
  };

  return (
    <div className="container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <h2>TechFest 2026</h2>
        <div className="nav-links">
          <button
            className={activeTab === 'home' ? 'active' : ''}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button
            className={activeTab === 'generate' ? 'active' : ''}
            onClick={() => setActiveTab('generate')}
          >
            Generate Ticket
          </button>
        </div>
      </nav>

      {/* Tab 1: Home Tab */}
      {activeTab === 'home' && (
        <div className="tab-content hero">
          <h1>Welcome to TechFest 2026 Pass Generator</h1>
          <p>Configure your personal details, custom line-up, food options, and festival passes in one place.</p>
          <button
            className="btn-primary"
            onClick={() => setActiveTab('generate')}
          >
            Get Started & Generate Pass
          </button>
        </div>
      )}

      {/* Tab 2: Generate Ticket Tab */}
      {activeTab === 'generate' && (
        <div className="tab-content">
          {!ticketGenerated ? (
            <div>
              {/* Stepper Navigation */}
              <div className="stepper">
                <button className={step === 1 ? 'active-step' : ''} onClick={() => setStep(1)}>1. Details</button>
                <button className={step === 2 ? 'active-step' : ''} onClick={() => setStep(2)}>2. Artists</button>
                <button className={step === 3 ? 'active-step' : ''} onClick={() => setStep(3)}>3. Food</button>
                <button className={step === 4 ? 'active-step' : ''} onClick={() => setStep(4)}>4. Games</button>
                <button className={step === 5 ? 'active-step' : ''} onClick={() => setStep(5)}>5. Pass</button>
                <button className={step === 6 ? 'active-step' : ''} onClick={() => setStep(6)}>6. Review</button>
              </div>

              {/* Step 1: User Details */}
              {step === 1 && (
                <div className="step-box">
                  <h3>Enter Personal Details</h3>
                  <label>Full Name:</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe" />
                  <label>Institute Roll Number:</label>
                  <input type="text" value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="e.g. 21CS001" />
                  <label>Image URL:</label>
                  <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
                  {imageUrl && <img src={imageUrl} alt="Preview" className="preview-img" />}
                  <div className="btn-group">
                    <div></div>
                    <button className="btn-primary" onClick={() => setStep(2)}>Next</button>
                  </div>
                </div>
              )}

              {/* Step 2: Artists Selection */}
              {step === 2 && (
                <div className="step-box">
                  <h3>Select Artists</h3>
                  <div className="card-grid">
                    {ARTISTS.map((artist) => (
                      <div
                        key={artist.id}
                        className={`card ${selectedArtists.includes(artist.id) ? 'selected' : ''}`}
                        onClick={() => handleArtistToggle(artist.id)}
                      >
                        <h4>{artist.name}</h4>
                        <p>{artist.genre}</p>
                      </div>
                    ))}
                  </div>
                  <div className="btn-group">
                    <button className="btn-secondary" onClick={() => setStep(1)}>Back</button>
                    <button className="btn-primary" onClick={() => setStep(3)}>Next</button>
                  </div>
                </div>
              )}

              {/* Step 3: Food Selection */}
              {step === 3 && (
                <div className="step-box">
                  <h3>Select Food Items</h3>
                  {FOODS.map((item) => (
                    <div key={item.id} className="item-row">
                      <span>{item.name} (₹{item.price})</span>
                      <div className="quantity-controls">
                        <button onClick={() => handleFoodChange(item.id, -1)}>-</button>
                        <span style={{ margin: '0 10px' }}>{foodQuantities[item.id] || 0}</span>
                        <button onClick={() => handleFoodChange(item.id, 1)}>+</button>
                      </div>
                    </div>
                  ))}
                  <div className="btn-group">
                    <button className="btn-secondary" onClick={() => setStep(2)}>Back</button>
                    <button className="btn-primary" onClick={() => setStep(4)}>Next</button>
                  </div>
                </div>
              )}

              {/* Step 4: Games Selection */}
              {step === 4 && (
                <div className="step-box">
                  <h3>Select Games & Activities</h3>
                  <div className="card-grid">
                    {GAMES.map((game) => (
                      <div
                        key={game.id}
                        className={`card ${selectedGames.includes(game.id) ? 'selected' : ''}`}
                        onClick={() => handleGameToggle(game.id)}
                      >
                        <h4>{game.name}</h4>
                        <p>₹{game.price}</p>
                      </div>
                    ))}
                  </div>
                  <div className="btn-group">
                    <button className="btn-secondary" onClick={() => setStep(3)}>Back</button>
                    <button className="btn-primary" onClick={() => setStep(5)}>Next</button>
                  </div>
                </div>
              )}

              {/* Step 5: Pass Selection */}
              {step === 5 && (
                <div className="step-box">
                  <h3>Select Pass Tier</h3>
                  <div className="card-grid">
                    {PASSES.map((pass) => (
                      <div
                        key={pass.id}
                        className={`card ${selectedPass.id === pass.id ? 'selected' : ''}`}
                        onClick={() => setSelectedPass(pass)}
                      >
                        <h4>{pass.name}</h4>
                        <p>₹{pass.price}</p>
                        <small>{pass.benefits}</small>
                      </div>
                    ))}
                  </div>
                  <div className="btn-group">
                    <button className="btn-secondary" onClick={() => setStep(4)}>Back</button>
                    <button className="btn-primary" onClick={() => setStep(6)}>Next</button>
                  </div>
                </div>
              )}

              {/* Step 6: Review & Calculation */}
              {step === 6 && (
                <div className="step-box">
                  <h3>Review Details & Pricing Breakdown</h3>
                  <p><strong>Name:</strong> {name}</p>
                  <p><strong>Roll No:</strong> {rollNo}</p>
                  
                  <table className="summary-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Details</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Pass</td>
                        <td>{selectedPass.name}</td>
                        <td>₹{selectedPass.price}</td>
                      </tr>
                      <tr>
                        <td>Food Subtotal</td>
                        <td>Items selected</td>
                        <td>₹{foodTotal}</td>
                      </tr>
                      <tr>
                        <td>Games Subtotal</td>
                        <td>{selectedGames.length} activities</td>
                        <td>₹{gamesTotal}</td>
                      </tr>
                      <tr>
                        <td colSpan="2"><strong>Grand Total</strong></td>
                        <td><strong>₹{grandTotal}</strong></td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="btn-group">
                    <button className="btn-secondary" onClick={() => setStep(5)}>Back</button>
                    <button className="btn-primary" onClick={generateTicket}>Generate Final Ticket</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Generated Ticket View */
            <div className="ticket">
              <div className="ticket-header">
                <h2>TECHFEST 2026 - OFFICIAL PASS</h2>
                <small>Ticket ID: #{Math.floor(100000 + Math.random() * 900000)}</small>
              </div>
              {imageUrl && <img src={imageUrl} alt="Attendee" className="ticket-avatar" />}
              <h3>{name}</h3>
              <p><strong>Roll No:</strong> {rollNo}</p>
              
              <div className="ticket-details">
                <p><strong>Pass Category:</strong> {selectedPass.name}</p>
                <p>
                  <strong>Artists:</strong>{' '}
                  {selectedArtists.map((id) => ARTISTS.find((a) => a.id === id)?.name).join(', ') || 'None'}
                </p>
                <p><strong>Total Paid:</strong> ₹{grandTotal}</p>
              </div>

              <button className="btn-secondary" onClick={() => setTicketGenerated(false)}>
                Edit Selections
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
