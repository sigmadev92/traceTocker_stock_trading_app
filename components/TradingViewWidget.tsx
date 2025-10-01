"use client";
// TradingViewWidget.jsx
import React, { memo } from "react";
import useTradingViewWidget from "@/hooks/useTradingViewWidget";

interface TradingViewWidgetProps {
  title?: string;
  scriptURL: string;
  config: Record<string, unknown>;
  height?: number;
  className?: string;
}
function TradingViewWidget({
  title,
  scriptURL,
  config,
  height = 600,
}: TradingViewWidgetProps) {
  const containerRef = useTradingViewWidget(scriptURL, config, height);

  return (
    <div>
      {title && (
        <h3 className="text-3xl text-gray-300 mb-5 font-semibold">{title}</h3>
      )}
      <div
        className="tradingview-widget-container"
        ref={containerRef}
        style={{ height: "100%", width: "100%" }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height, width: "100%" }}
        />
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
