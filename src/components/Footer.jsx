export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      &copy; {year} ScholarHub &mdash; Academic Records Portal. Built with React &amp; Vite.
    </footer>
  );
}
