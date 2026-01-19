import { onCLS, onLCP, onFCP, onTTFB, onINP } from "web-vitals";

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    onCLS(onPerfEntry);
    onLCP(onPerfEntry);
    onFCP(onPerfEntry);
    onTTFB(onPerfEntry);
    onINP(onPerfEntry); // Replaces FID
  }
};

export default reportWebVitals;
