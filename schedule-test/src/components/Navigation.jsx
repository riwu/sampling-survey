import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import './Navigation.css';

const Navigation = () => (
  <Nav bsStyle="pills" className="Navigation">
    <IndexLinkContainer to="/">
      <NavItem>Get Data</NavItem>
    </IndexLinkContainer>
    <LinkContainer to="/schedule-test">
      <NavItem>Schedule Test</NavItem>
    </LinkContainer>
  </Nav>
);

export default Navigation;
