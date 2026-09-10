import React, { useState } from 'react';
import './App.css';

const ARTISTS = [
  { id: '1', name: '💕 Arijit Sir', price: 500, genre: 'Bollywood Romantic' },
  { id: '2', name: '🎶 Shreya Ghoshal', price: 450, genre: 'Melodic Vocals' },
  { id: '3', name: '🎸🔊 Armaan Malik', price: 350, genre: 'Pop & EDM' },
  { id: '4', name: '🕺 Hardy Sandhu', price: 300, genre: 'Punjabi Beats' },
  { id: '5', name: '🪗 Jasleen Royal', price: 250, genre: 'Indie Folk' }
];

const INITIAL_FOODS = [
  { id: '1', name: 'Pizza 🍕', price: 200 },
  { id: '2', name: 'Burger 🍔', price: 120 },
  { id: '3', name: 'Doughnut 🍩', price: 90 },
  { id: '4', name: 'Hotdog 🌭', price: 110 },
  { id: '5', name: 'Coffee ☕', price: 60 },
  { id: '6', name: 'Orange juice 🥤', price: 70 },
  { id: '7', name: 'Tea 🍵', price: 40 }
];

const GAMES = [
  { id: '1', name: 'BGMI Tournament 🎮', price: 150 },
  { id: '2', name: 'Valorant League 🎯', price: 200 },
  { id: '3', name: 'FIFA Arena ⚽', price: 100 },
  { id: '4', name: 'Tekken 8 Clash 🥊', price: 100 }
];

const PASS_TIERS = [
  { id: 'silver', name: 'Silver Pass', price: 499, perk: 'General Ground Access' },
  { id: 'gold', name: 'Gold Pass', price: 999, perk: 'Front Zone Access + 1 Free Drink' },
  { id: 'vip', name: 'VIP Pass', price: 1999, perk: 'Backstage Meet & Greet + Lounge Access' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' or 'generator'
  const [wizardStep, setWizardStep] = useState(1); // Steps: 1:Details, 2:Artists, 3:Food, 4:Games, 5:Tier, 6:Review & Generate, 7:Final Ticket

  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    imageUrl: '',
    selectedArtists: [],
    foodQuantities: {}, // Stores food ID and quantity
    selectedGames: [],
    passTier: 'silver'
  });

  const [touched, setTouched] = useState({
    name: false,
    rollNo: false
  });

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleArtistToggle = (artist) => {
    setFormData((prev) => {
      const exists = prev.selectedArtists.some((a) => a.id === artist.id);
      const updated = exists
        ? prev.selectedArtists.filter((a) => a.id !== artist.id)
        : [...prev.selectedArtists, artist];
      return { ...prev, selectedArtists: updated };
    });
  };

  const handleFoodQty = (foodId, delta) => {
    setFormData((prev) => {
      const currentQty = prev.foodQuantities[foodId] || 0;
      const newQty = Math.max(0, currentQty + delta);
      const updatedMap = { ...prev.foodQuantities };
      if (newQty === 0) {
        delete updatedMap[foodId];
      } else {
        updatedMap[foodId] = newQty;
      }
      return { ...prev, foodQuantities: updatedMap };
    });
  };

  const handleGameToggle = (game) => {
    setFormData((prev) => {
      const exists = prev.selectedGames.some((g) => g.id === game.id);
      const updated = exists
        ? prev.selectedGames.filter((g) => g.id !== game.id)
        : [...prev.selectedGames, game];
      return { ...prev, selectedGames: updated };
    });
  };

  // Color logic for input borders & text
  const getInputClass = (field, isMandatory = false) => {
    const value = formData[field]?.trim();
    if (value) return 'input-field valid-green';
    if (isMandatory && touched[field] && !value) return 'input-field invalid-red';
    return 'input-field default-blue';
  };

  // Dynamic Price Calculations
  const basePassPrice = PASS_TIERS.find((t) => t.id === formData.passTier)?.price || 0;
  const artistsTotal = formData.selectedArtists.reduce((sum, item) => sum + item.price, 0);
  
  const foodsTotal = Object.entries(formData.foodQuantities).reduce((sum, [id, qty]) => {
    const item = INITIAL_FOODS.find((f) => f.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const gamesTotal = formData.selectedGames.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = basePassPrice + artistsTotal + foodsTotal + gamesTotal;

  const isUserValid = formData.name.trim() !== '' && formData.rollNo.trim() !== '';

  return (
    <div className="app-shell">
      {/* HEADER & TOP NAVIGATION TABS */}
      <header className="navbar">
        <div className="nav-brand">
          <img
            src="/kshitij-logo.png"
            alt="Logo"
            className="brand-logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://upload.wikimedia.org/wikipedia/commons/2/23/Kshitij_Logo.jpg";
            }}
          />
          <span className="brand-title">TECHFEST 2026</span>
        </div>
        <nav className="nav-tabs">
          <button
            className={`tab-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            🏠 Home
          </button>
          <button
            className={`tab-btn ${activeTab === 'generator' ? 'active' : ''}`}
            onClick={() => setActiveTab('generator')}
          >
            🎟️ Generate Ticket
          </button>
        </nav>
      </header>

      {/* BODY CONTENT */}
      <main className="container">
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <section className="card home-hero">
            <h1 className="hero-heading">Welcome to TechFest Pass Generator</h1>
            <p className="sub-title">
              Easily customize your official event pass. Pick your favorite lineup artists, food vouchers, esports tournaments, and festival access passes with live total calculation.
            </p>
            <div className="hero-features">
              <div className="feature-pill">⚡ Live Pricing</div>
              <div className="feature-pill">🖼️ Profile Photo Preview</div>
              <div className="feature-pill">🎤 Multi-Artist Lineup</div>
              <div className="feature-pill">🍕 Food Vouchers</div>
            </div>
            <button
              className="btn-primary cta-btn"
              onClick={() => {
                setActiveTab('generator');
                setWizardStep(1);
              }}
            >
              Generate Ticket Now →
            </button>
          </section>
        )}

        {/* TAB 2: GENERATE TICKET (MULTI-STEP) */}
        {activeTab === 'generator' && (
          <section className="generator-flow">
            {/* STEPPER BAR */}
            {wizardStep < 7 && (
              <div className="stepper">
                <button className={wizardStep === 1 ? 'active' : ''} onClick={() => setWizardStep(1)}>1. Details</button>
                <button className={wizardStep === 2 ? 'active' : ''} onClick={() => setWizardStep(2)}>2. Artists</button>
                <button className={wizardStep === 3 ? 'active' : ''} onClick={() => setWizardStep(3)}>3. Food</button>
                <button className={wizardStep === 4 ? 'active' : ''} onClick={() => setWizardStep(4)}>4. Games</button>
                <button className={wizardStep === 5 ? 'active' : ''} onClick={() => setWizardStep(5)}>5. Tier</button>
                <button className={wizardStep === 6 ? 'active' : ''} onClick={() => setWizardStep(6)}>6. Review</button>
              </div>
            )}

            {/* STEP 1: PERSONAL DETAILS */}
            {wizardStep === 1 && (
              <div className="card">
                <h2>1. Personal Details</h2>
                
                <div className="form-group">
                  <label>Full Name <span className="asterisk">*</span></label>
                  <input
                    type="text"
                    placeholder="Tripti Sharma"
                    value={formData.name}
                    className={getInputClass('name', true)}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onBlur={() => handleBlur('name')}
                  />
                </div>

                <div className="form-group">
                  <label>Institute Roll Number <span className="asterisk">*</span></label>
                  <input
                    type="text"
                    placeholder="26CS10078"
                    value={formData.rollNo}
                    className={getInputClass('rollNo', true)}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    onBlur={() => handleBlur('rollNo')}
                  />
                </div>

                <div className="form-group">
                  <label>Image URL (Live Image Preview)</label>
                  <input
                    type="text"
                    placeholder="Paste photo link here"
                    value={formData.imageUrl}
                    className={getInputClass('imageUrl', false)}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  />
                </div>

                {formData.imageUrl && (
                  <div className="image-preview-container">
                    <p>Live Profile Preview:</p>
                    <img
                      src={formData.imageUrl}
                      alt="Profile Preview"
                      className="user-preview-avatar"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/80?text=No+Image";
                      }}
                    />
                  </div>
                )}

                <button
                  className="btn-primary"
                  onClick={() => setWizardStep(2)}
                  disabled={!isUserValid}
                >
                  Next: Select Artists →
                </button>
              </div>
            )}

            {/* STEP 2: ARTISTS */}
            {wizardStep === 2 && (
              <div className="card">
                <h2>2. Select Performing Artists</h2>
                <div className="options-grid">
                  {ARTISTS.map((artist) => {
                    const isSelected = formData.selectedArtists.some((a) => a.id === artist.id);
                    return (
                      <div
                        key={artist.id}
                        className={`option-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleArtistToggle(artist)}
                      >
                        <h3>{artist.name}</h3>
                        <small>{artist.genre}</small>
                        <p className="price">+₹{artist.price}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="button-group">
                  <button className="btn-secondary" onClick={() => setWizardStep(1)}>← Back</button>
                  <button className="btn-primary" onClick={() => setWizardStep(3)}>Next: Food Items →</button>
                </div>
              </div>
            )}

            {/* STEP 3: FOOD ITEMS */}
            {wizardStep === 3 && (
              <div className="card">
                <h2>3. Food Items & Vouchers</h2>
                <div className="food-list">
                  {INITIAL_FOODS.map((food) => {
                    const qty = formData.foodQuantities[food.id] || 0;
                    return (
                      <div key={food.id} className="food-item-row">
                        <div>
                          <strong>{food.name}</strong>
                          <span className="price-tag"> ₹{food.price}</span>
                        </div>
                        <div className="qty-controls">
                          {qty > 0 && (
                            <button className="btn-qty" onClick={() => handleFoodQty(food.id, -1)}>-1</button>
                          )}
                          <span className="qty-count">{qty}</span>
                          <button className="btn-qty" onClick={() => handleFoodQty(food.id, 1)}>+1</button>
                          {qty > 0 && (
                            <button className="btn-remove" onClick={() => handleFoodQty(food.id, -qty)}>Remove</button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="button-group">
                  <button className="btn-secondary" onClick={() => setWizardStep(2)}>← Back</button>
                  <button className="btn-primary" onClick={() => setWizardStep(4)}>Next: Games & Activities →</button>
                </div>
              </div>
            )}

            {/* STEP 4: GAMES AND ACTIVITIES */}
            {wizardStep === 4 && (
              <div className="card">
                <h2>4. Games and Activities</h2>
                <div className="options-grid">
                  {GAMES.map((game) => {
                    const isSelected = formData.selectedGames.some((g) => g.id === game.id);
                    return (
                      <div
                        key={game.id}
                        className={`option-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleGameToggle(game)}
                      >
                        <h3>{game.name}</h3>
                        <p className="price">₹{game.price}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="button-group">
                  <button className="btn-secondary" onClick={() => setWizardStep(3)}>← Back</button>
                  <button className="btn-primary" onClick={() => setWizardStep(5)}>Next: Choose Tier →</button>
                </div>
              </div>
            )}

            {/* STEP 5: TIER SELECTION */}
            {wizardStep === 5 && (
              <div className="card">
                <h2>5. Select Pass Tier Category</h2>
                <div className="options-grid">
                  {PASS_TIERS.map((tier) => (
                    <div
                      key={tier.id}
                      className={`option-card ${formData.passTier === tier.id ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, passTier: tier.id })}
                    >
                      <h3>{tier.name}</h3>
                      <p className="price">₹{tier.price}</p>
                      <small>{tier.perk}</small>
                    </div>
                  ))}
                </div>
                <div className="button-group">
                  <button className="btn-secondary" onClick={() => setWizardStep(4)}>← Back</button>
                  <button className="btn-primary" onClick={() => setWizardStep(6)}>Next: Review Ticket →</button>
                </div>
              </div>
            )}

            {/* STEP 6: REVIEW TICKET & GENERATE */}
            {wizardStep === 6 && (
              <div className="card">
                <h2>6. Review Ticket Details</h2>
                <div className="summary-box">
                  <h3>User Details</h3>
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Roll No:</strong> {formData.rollNo}</p>
                  {formData.imageUrl && (
                    <div style={{ marginTop: '8px' }}>
                      <strong>Photo Preview:</strong>
                      <br />
                      <img
                        src={formData.imageUrl}
                        alt="User Avatar"
                        className="user-preview-avatar"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <hr />
                  <h3>Price Breakdown</h3>
                  <p>Pass Tier ({formData.passTier.toUpperCase()}): ₹{basePassPrice}</p>
                  <p>Artists Selection: ₹{artistsTotal}</p>
                  <p>Food Vouchers: ₹{foodsTotal}</p>
                  <p>Games Subtotal: ₹{gamesTotal}</p>
                  <hr />
                  <h2>Dynamic Total: ₹{grandTotal}</h2>
                </div>
                <div className="button-group">
                  <button className="btn-secondary" onClick={() => setWizardStep(5)}>← Back</button>
                  <button className="btn-primary" onClick={() => setWizardStep(7)}>Generate Final Ticket 🎉</button>
                </div>
              </div>
            )}

            {/* STEP 7: FINAL GENERATED TICKET */}
            {wizardStep === 7 && (
              <div className="ticket-card">
                <div className="ticket-header">
                  <img
                    src="/kshitij-logo.png"
                    alt="Logo"
                    className="ticket-logo"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://upload.wikimedia.org/wikipedia/commons/2/23/Kshitij_Logo.jpg";
                    }}
                  />
                  <h2>TECHFEST 2026 TICKET</h2>
                  <span className="badge">{formData.passTier.toUpperCase()}</span>
                </div>
                <div className="ticket-body">
                  <div className="user-ticket-info">
                    {formData.imageUrl && (
                      <img
                        src={formData.imageUrl}
                        alt="Profile"
                        className="ticket-avatar"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div>
                      <p><strong>Name:</strong> {formData.name}</p>
                      <p><strong>Roll No:</strong> {formData.rollNo}</p>
                      <p><strong>Ticket ID:</strong> KSH-{Math.floor(100000 + Math.random() * 900000)}</p>
                    </div>
                  </div>
                  <hr />
                  <p><strong>Selected Artists:</strong> {formData.selectedArtists.map((a) => a.name).join(', ') || 'None'}</p>
                  <p>
                    <strong>Food Vouchers:</strong>{' '}
                    {Object.entries(formData.foodQuantities)
                      .map(([id, q]) => `${INITIAL_FOODS.find((f) => f.id === id)?.name} (x${q})`)
                      .join(', ') || 'None'}
                  </p>
                  <p><strong>Games & Activities:</strong> {formData.selectedGames.map((g) => g.name).join(', ') || 'None'}</p>
                  <hr />
                  <h3 className="total-paid">Total Amount: ₹{grandTotal}</h3>
                </div>
                <button
                  className="btn-secondary"
                  style={{ marginTop: '20px' }}
                  onClick={() => {
                    setWizardStep(1);
                    setFormData({
                      name: '',
                      rollNo: '',
                      imageUrl: '',
                      selectedArtists: [],
                      foodQuantities: {},
                      selectedGames: [],
                      passTier: 'silver'
                    });
                  }}
                >
                  Generate Another Ticket
                </button>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

