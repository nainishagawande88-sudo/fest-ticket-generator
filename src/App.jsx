import React, { useState } from 'react';
import './App.css';

const ARTISTS = [
  { id: '1', name: '💕 Arijit Sir', price: 500 },
  { id: '2', name: '🎶 Shreya Ghoshal', price: 450 },
  { id: '3', name: '🎸🔊 Armaan Malik', price: 350 },
  { id: '4', name: '🕺 Hardy Sandhu', price: 300 },
  { id: '5', name: '🪗 Jasleen Royal', price: 250 }
];

const FOODS = [
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
  { id: '3', name: 'FIFA 2026 Arena ⚽', price: 100 },
  { id: '4', name: 'Tekken 8 Clash 🥊', price: 100 }
];

const PASS_TIERS = [
  { id: 'silver', name: 'Silver Pass', price: 499, perk: 'General Access' },
  { id: 'gold', name: 'Gold Pass', price: 999, perk: 'Front Zone Access + Free Drink' },
  { id: 'vip', name: 'VIP Pass', price: 1999, perk: 'Backstage Meet & Greet + VIP Lounge' }
];

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    email: '',
    phone: '',
    selectedArtists: [],
    selectedFoods: [],
    selectedGames: [],
    passTier: 'silver'
  });

  const [touched, setTouched] = useState({
    name: false,
    rollNo: false,
    email: false,
    phone: false
  });

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleToggle = (category, item) => {
    setFormData((prev) => {
      const currentList = prev[category];
      const exists = currentList.some((i) => i.id === item.id);
      const updatedList = exists
        ? currentList.filter((i) => i.id !== item.id)
        : [...currentList, item];
      return { ...prev, [category]: updatedList };
    });
  };

  // Dynamic styling for Input Boxes (Blue Default -> Green Filled -> Red Unfilled Mandatory)
  const getInputClass = (field, isMandatory = false) => {
    const value = formData[field]?.trim();
    if (value) return 'input-field valid-green';
    if (isMandatory && touched[field] && !value) return 'input-field invalid-red';
    return 'input-field default-blue';
  };

  const basePassPrice = PASS_TIERS.find((t) => t.id === formData.passTier)?.price || 0;
  const artistsTotal = formData.selectedArtists.reduce((sum, item) => sum + item.price, 0);
  const foodsTotal = formData.selectedFoods.reduce((sum, item) => sum + item.price, 0);
  const gamesTotal = formData.selectedGames.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = basePassPrice + artistsTotal + foodsTotal + gamesTotal;

  const isStep1Valid = formData.name.trim() !== '' && formData.rollNo.trim() !== '';

  return (
    <div className="container">
      <header className="header">
        <div className="title-wrapper">
          <img
            src="/kshitij-logo.png"
            alt="Kshitij Logo"
            className="brand-logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://upload.wikimedia.org/wikipedia/commons/2/23/Kshitij_Logo.jpg";
            }}
          />
          <h1 className="main-title">Welcome to TechFest Pass Generator</h1>
        </div>
        <p className="sub-title">Configure your personal details, custom line-up, food options, and festival passes in one place.</p>
      </header>

      {step < 5 && (
        <div className="stepper">
          <button className={step === 1 ? 'active' : ''} onClick={() => setStep(1)}>1. Details</button>
          <button className={step === 2 ? 'active' : ''} onClick={() => setStep(2)}>2. Lineup</button>
          <button className={step === 3 ? 'active' : ''} onClick={() => setStep(3)}>3. Food & Games</button>
          <button className={step === 4 ? 'active' : ''} onClick={() => setStep(4)}>4. Tier</button>
        </div>
      )}

      {/* Step 1: Details */}
      {step === 1 && (
        <div className="card">
          <h2>Personal Information</h2>
          
          <div className="form-group">
            <label>Full Name <span className="asterisk">*</span></label>
            <input
              type="text"
              placeholder="e.g. Tripti Sharma"
              value={formData.name}
              className={getInputClass('name', true)}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onBlur={() => handleBlur('name')}
            />
          </div>

          <div className="form-group">
            <label>Roll Number <span className="asterisk">*</span></label>
            <input
              type="text"
              placeholder="e.g. 26CS10078"
              value={formData.rollNo}
              className={getInputClass('rollNo', true)}
              onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
              onBlur={() => handleBlur('rollNo')}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="tripti@example.com"
              value={formData.email}
              className={getInputClass('email', false)}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onBlur={() => handleBlur('email')}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="+91 9876543210"
              value={formData.phone}
              className={getInputClass('phone', false)}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              onBlur={() => handleBlur('phone')}
            />
          </div>

          <button
            className="btn-primary"
            onClick={() => setStep(2)}
            disabled={!isStep1Valid}
          >
            Next: Select Artists
          </button>
        </div>
      )}

      {/* Step 2: Lineup */}
      {step === 2 && (
        <div className="card">
          <h2>Select Artists You Want to Watch</h2>
          <div className="options-grid">
            {ARTISTS.map((artist) => {
              const isSelected = formData.selectedArtists.some((a) => a.id === artist.id);
              return (
                <div
                  key={artist.id}
                  className={`option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleToggle('selectedArtists', artist)}
                >
                  <h3>{artist.name}</h3>
                  <p>+₹{artist.price}</p>
                </div>
              );
            })}
          </div>
          <div className="button-group">
            <button className="btn-secondary" onClick={() => setStep(1)}>Back</button>
            <button className="btn-primary" onClick={() => setStep(3)}>Next: Food & Gaming</button>
          </div>
        </div>
      )}

      {/* Step 3: Food & Games */}
      {step === 3 && (
        <div className="card">
          <h2>Add Food & Tournament Passes</h2>
          
          <h3>Food Vouchers</h3>
          <div className="options-grid">
            {FOODS.map((food) => {
              const isSelected = formData.selectedFoods.some((f) => f.id === food.id);
              return (
                <div
                  key={food.id}
                  className={`option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleToggle('selectedFoods', food)}
                >
                  <h3>{food.name}</h3>
                  <p>₹{food.price}</p>
                </div>
              );
            })}
          </div>

          <h3 style={{ marginTop: '24px' }}>Gaming Arenas</h3>
          <div className="options-grid">
            {GAMES.map((game) => {
              const isSelected = formData.selectedGames.some((g) => g.id === game.id);
              return (
                <div
                  key={game.id}
                  className={`option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleToggle('selectedGames', game)}
                >
                  <h3>{game.name}</h3>
                  <p>₹{game.price}</p>
                </div>
              );
            })}
          </div>

          <div className="button-group">
            <button className="btn-secondary" onClick={() => setStep(2)}>Back</button>
            <button className="btn-primary" onClick={() => setStep(4)}>Next: Choose Pass Tier</button>
          </div>
        </div>
      )}

      {/* Step 4: Tier Selection */}
      {step === 4 && (
        <div className="card">
          <h2>Select Festival Pass Tier</h2>
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

          <div className="summary-box">
            <h3>Summary</h3>
            <p>Base Pass ({formData.passTier.toUpperCase()}): ₹{basePassPrice}</p>
            <p>Artist Add-ons: ₹{artistsTotal}</p>
            <p>Food Vouchers: ₹{foodsTotal}</p>
            <p>Gaming Arenas: ₹{gamesTotal}</p>
            <hr />
            <h2>Grand Total: ₹{grandTotal}</h2>
          </div>

          <div className="button-group">
            <button className="btn-secondary" onClick={() => setStep(3)}>Back</button>
            <button className="btn-primary" onClick={() => setStep(5)}>Generate Ticket 🎉</button>
          </div>
        </div>
      )}

      {/* Step 5: Final Pass Ticket */}
      {step === 5 && (
        <div className="ticket-card">
          <div className="ticket-header">
            <img src="/kshitij-logo.png" alt="Logo" className="ticket-logo" />
            <h2>TECHFEST 2026 PASS</h2>
            <span className="badge">{formData.passTier.toUpperCase()}</span>
          </div>
          <div className="ticket-body">
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Roll No:</strong> {formData.rollNo}</p>
            {formData.email && <p><strong>Email:</strong> {formData.email}</p>}
            {formData.phone && <p><strong>Phone:</strong> {formData.phone}</p>}
            <hr />
            <p><strong>Lineup:</strong> {formData.selectedArtists.map((a) => a.name).join(', ') || 'None'}</p>
            <p><strong>Food:</strong> {formData.selectedFoods.map((f) => f.name).join(', ') || 'None'}</p>
            <p><strong>Games:</strong> {formData.selectedGames.map((g) => g.name).join(', ') || 'None'}</p>
            <hr />
            <h3 className="total-paid">Total Amount Paid: ₹{grandTotal}</h3>
          </div>
          <button className="btn-secondary" onClick={() => setStep(1)}>Create Another Ticket</button>
        </div>
      )}
    </div>
  );
}