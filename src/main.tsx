import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Prevent automatic scrolling to hash on page load
if (window.location.hash) {
  // Store the hash and remove it
  const hash = window.location.hash;
  history.replaceState(null, '', window.location.pathname + window.location.search);

  // Prevent scroll restoration
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
}

// Force scroll to top immediately
window.scrollTo(0, 0);

// Prevent any scroll during page load
const preventScroll = (e: Event) => {
  e.preventDefault();
  window.scrollTo(0, 0);
};

window.addEventListener('scroll', preventScroll, { passive: false });

// Remove scroll prevention after page is fully loaded
window.addEventListener('load', () => {
  setTimeout(() => {
    window.removeEventListener('scroll', preventScroll);
  }, 100);
});

createRoot(document.getElementById("root")!).render(<App />);