import MathJax from "react-native-mathjax";
import WebView from "react-native-webview";

export default function MathExpression({ formula }) {
  return (
    <MathJax
      // HTML content with MathJax support
      html={formula}
      // MathJax config option
      mathJaxOptions={{
        messageStyle: "none",
        extensions: ["tex2jax.js"],
        jax: ["input/TeX", "output/HTML-CSS"],
        tex2jax: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
          displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"],
          ],
          processEscapes: true,
        },
        TeX: {
          extensions: [
            "AMSmath.js",
            "AMSsymbols.js",
            "noErrors.js",
            "noUndefined.js",
          ],
        },
      }}
      {...WebView.props}
    />
  );
}
