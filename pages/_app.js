// Global Styles
import '../styles/main.scss'

// This default export is required in a new `pages/_app.js` file.
// If it didn’t work: Make sure you restart the development server when you add pages/_app.js.
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}