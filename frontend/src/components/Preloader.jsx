import "./preloader.css";

export default function Preloader() {
  return (
    <div className="preloader-wrapper">
      <div className="loader-ring"></div>
      <h3>Loading</h3>
      <div className="dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );
}