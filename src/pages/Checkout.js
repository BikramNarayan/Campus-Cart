import React, { useState } from "react";

function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    area: "",
    flatNumber: "",
    nearbyLandmark: "",
    district: "",
    state: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your logic for handling the submission here.
    // For a dummy example, we're simply setting isSubmitted to true.
    setIsSubmitted(true);
  };

  const isCreditDebitCard = formData.paymentMethod === "creditCard" || formData.paymentMethod === "debitCard";

  return (
    <div className="container">
      <h1>Checkout</h1>
      {isSubmitted ? (
        <div className="alert alert-success" role="alert">
          Successful! Your order has been placed.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="form-label">
              Contact
            </label>
            <input
              type="text"
              className="form-control"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="area" className="form-label">
              Area
            </label>
            <input
              type="text"
              className="form-control"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="flatNumber" className="form-label">
              Flat Number
            </label>
            <input
              type="text"
              className="form-control"
              id="flatNumber"
              name="flatNumber"
              value={formData.flatNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nearbyLandmark" className="form-label">
              Nearby Landmark
            </label>
            <input
              type="text"
              className="form-control"
              id="nearbyLandmark"
              name="nearbyLandmark"
              value={formData.nearbyLandmark}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="district" className="form-label">
              District
            </label>
            <input
              type="text"
              className="form-control"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="paymentMethod" className="form-label">
              Payment Method
            </label>
            <select
              className="form-select"
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a payment method</option>
              <option value="cash">Cash</option>
              <option value="creditCard">Credit Card</option>
              <option value="debitCard">Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          {isCreditDebitCard && (
            <div>
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                  Card Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="expiryDate" className="form-label">
                    Expiry Date
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-primary my-3">
            Place Order
          </button>
        </form>
      )}
    </div>
  );
}

export default Checkout;
