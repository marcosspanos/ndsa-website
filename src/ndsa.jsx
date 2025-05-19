import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';

function Header() {
  return (
    <>
      <h1> NDSA</h1>
    </>
  );
}

function Clendar() {
  return (
    <>
      <Link to="/calendar">Calendar</Link>
    </>
  );
}
function CalendarPage() {
  return (
    <>
      <h1>Calendar</h1>
      <p> Events and other activities will be displayed here</p>
      <p>if you are interested in organising an event please get in touch so we can add it to the calendar</p>
    </>
  );
}
function FrequentlyAskedQuestions() {
  return (
    <>
    </>
  );
}
function FAQPage() {
  return (
    <>
      <Link to="/faq">Frequently Asked Questions</Link>
    </>
  );
}
function AboutUs() {
  return (
    <>
      <Link to="/about-us">About Us</Link>
    </>
  );
}

// This is the About Us subpage component
function AboutUsPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the About Us page with different content.</p>
    </div>
  );
}

function MainPage(){
  return (
    <>
    <h1>Welcome to NDSA</h1>
      <section>
        <h2>What is NDSA</h2>
        <p>We are a neurodivergent organisation which aims to make a helpful place for neurodivergent people. We also have monthly events</p>
      </section>
    </>
  );
}

function Page() {
  return (
    <HashRouter>
      <Header />
      <AboutUs />
      <Clendar />
      <FAQPage />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/faq" element={<FrequentlyAskedQuestions />} />
      </Routes>
    </HashRouter>
  );
}

export default Page;