import { useState } from 'react';
import react from 'react';
function Header() {
  return (
    <header>
      <p>
        We are a student and employee run collective which is focused on making the university a safe space for queer people
      </p>
      <p>
        We organise weekly events where everyone is welcome to join and meet new people
      </p>
    </header>
  );
}

function Pictures() {
  return (
    <section>
      <p>Here are some pictures from our events!</p>
      {/* Add <img src="..." alt="Event" /> here */}
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <p>Follow us on Instagram and WhatsApp for updates!</p>
    </footer>
  );
}

function Page() {
  return (
    <>
      <Header />
      <CalendarSection />
      <Pictures />
      <Footer />
    </>
  );
}

export default Page;
