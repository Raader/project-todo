export function Returner(props) {
  return (
    <div className="returner" onClick={() => (window.location.href = "#")}>
      <i class="fas fa-chevron-up"></i>
    </div>
  );
}
