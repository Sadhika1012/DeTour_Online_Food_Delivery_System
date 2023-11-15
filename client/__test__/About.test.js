import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import About from '../src/components/pages/About';

describe('About component', () => {
  it('renders About component with necessary content', () => {
    const { getByText, getByAltText } = render(
      <Router>
        <About />
      </Router>
    );
    
    // Check if the main title "About Us" is rendered
    const mainTitle = getByText('About Us');
    expect(mainTitle).toBeInTheDocument();

    // Check for specific text content within the component using regex for flexibility
    const content1 = getByText(/This Website was built by Sadhika/i);
    expect(content1).toBeInTheDocument();

    const content2 = getByText(/Teja,.*Roseline.*Sanjana/i);
    expect(content2).toBeInTheDocument();

    // Check for the contact information
    const contactInfo = getByText('Contact us at : +91-7385298567');
    expect(contactInfo).toBeInTheDocument();

    // Check for the Instagram handle
    const instagramHandle = getByText('Our instagram handle: Detour_bangalore');
    expect(instagramHandle).toBeInTheDocument();

    // Check for the presence of the background image
    const backgroundImage = getByAltText('');
    expect(backgroundImage).toBeInTheDocument();
    
    // Ensure that specific classes are applied to the elements
    const backgroundDiv = document.querySelector('.bg');
    expect(backgroundDiv).toHaveClass('bg');
    
    // ... Add more specific tests for other elements or content
    
    // You might need to modify these checks based on your actual component structure and content.
  });
});

