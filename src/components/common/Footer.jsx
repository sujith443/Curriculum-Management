import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <Container className="text-center">
        <p className="mb-0">© {new Date().getFullYear()} SVIT College, Andhra Pradesh. All rights reserved.</p>
        <p className="small mb-0">BTech Curriculum Management System</p>
      </Container>
    </footer>
  );
};

export default Footer;