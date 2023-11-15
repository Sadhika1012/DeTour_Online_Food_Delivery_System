import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import FAQS from '../src/components/pages/FAQS';

describe('FAQS component', () => {
  it('renders FAQS component without crashing', () => {
    const { getAllByText, container } = render(
      <Router>
        <FAQS />
      </Router>
    );

    // Check if the title of the FAQS is rendered
    const titleElements = getAllByText('FAQs');
    titleElements.forEach((titleElement) => {
      expect(titleElement).toBeInTheDocument();
    });

    // You can add more specific tests to ensure the presence of certain elements or content
    const firstQuestionElements = getAllByText(
      'Do I have to register as a client on this website before ordering?'
    );
    firstQuestionElements.forEach((questionElement) => {
      expect(questionElement).toBeInTheDocument();
    });

    // Check for the presence of the faq-container class
    const faqContainer = container.querySelector('.faq-container');
    expect(faqContainer).toBeInTheDocument();

    // Check specific styles or classes if needed
    const faqContainerStyle = window.getComputedStyle(faqContainer);
    expect(faqContainerStyle.backgroundColor).toBe('black');
    // Ensure other styles/classes are applied as expected

    // You might need to modify these checks based on your actual component structure and content.
  });
});
