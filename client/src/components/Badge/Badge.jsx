import "./badge.scss";

export default function Badge({ children, count }) {
  return (
    <div className="badge-wrapper">
      {count?.accuracy !== 0 && count !== undefined && (
        <span className="badge-count">1</span>
      )}
      {children}
    </div>
  );
}
