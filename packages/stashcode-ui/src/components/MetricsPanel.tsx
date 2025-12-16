import * as React from "react";

export type Metric = { label: string; value: string; accent?: string };

export type MetricsPanelProps = {
  metrics: Metric[];
  background?: string;
  borderColor?: string;
  rowBackground?: string;
  radius?: number;
  padding?: number;
};

export function MetricsPanel({
  metrics,
  background = "rgba(255,255,255,0.07)",
  borderColor = "#424242",
  rowBackground = "rgba(255,255,255,0.05)",
  radius = 12,
  padding = 16,
}: MetricsPanelProps) {
  return (
    <div
      style={{
        background,
        border: `1px solid ${borderColor}`,
        borderRadius: radius,
        padding,
        color: "#fff",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {metrics.map((metric) => (
        <div
          key={metric.label}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 12px",
            borderRadius: 8,
            background: rowBackground,
            marginTop: 8,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.75)" }}>{metric.label}</span>
          <span style={{ color: metric.accent ?? "#9a2323" }}>{metric.value}</span>
        </div>
      ))}
    </div>
  );
}
