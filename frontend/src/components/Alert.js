import { useEffect } from "react";

export default function Alert({ alert, onDismiss }) {
  useEffect(() => {
    if (!alert) return undefined;
    const timer = window.setTimeout(onDismiss, 2800);
    return () => window.clearTimeout(timer);
  }, [alert, onDismiss]);

  if (!alert) return null;
  return (
    <div className={`app-alert alert-${alert.type}`} role="status">
      <span aria-hidden="true">{alert.type === "danger" ? "!" : alert.type === "warning" ? "i" : "✓"}</span>
      <p>{alert.msg}</p>
      <button type="button" onClick={onDismiss} aria-label="Dismiss notification">×</button>
    </div>
  );
}
