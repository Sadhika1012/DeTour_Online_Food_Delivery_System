import React, { useState, useEffect } from 'react';

const CustomerProfile = ({ customerId }) => {
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch customer data based on the JWT token
    fetch('/api/customer-profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the JWT token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCustomer(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <div className="customer-profile">
      <h1>Customer Profile</h1>
      <div>
        <strong>Name:</strong> {customer.name}
      </div>
      <div>
        <strong>Email:</strong> {customer.email}
      </div>
      <div>
        <strong>Phone:</strong> {customer.phone}
      </div>
      {/* Add more customer details here */}
    </div>
  );
};

export default CustomerProfile;
