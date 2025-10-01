import TradingViewWidget from "@/components/TradingViewWidget";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/constants";

const Home = () => {
  const scriptURL =
    "https://s3.tradingview.com/external-embedding/embed-widget-";
  return (
    <div className="min-h-screen flex home-wrapper p-4">
      <section className="grid grid-cols-2 w-full home-section">
        <div className="md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            title="Market Overview"
            scriptURL={`${scriptURL}market-overview.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            height={600}
          />
        </div>
        <div className="md-col-span xl:col-span-2">
          <TradingViewWidget
            title="Stock Heatmap"
            scriptURL={`${scriptURL}stock-heatmap.js`}
            config={HEATMAP_WIDGET_CONFIG}
            height={300}
          />
        </div>
      </section>
      <section className="grid w-full gap-8 home-section">
        <div className=" h-full md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            title="Market Overview"
            scriptURL={`${scriptURL}timeline.js`}
            config={TOP_STORIES_WIDGET_CONFIG}
            height={600}
          />
        </div>
        <div className="md-col-span xl:col-span-2">
          <TradingViewWidget
            title="Stock Heatmap"
            scriptURL={`${scriptURL}market-quotes.js`}
            config={MARKET_DATA_WIDGET_CONFIG}
            height={300}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
