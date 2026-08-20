import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import https from "https";
import url from "url";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const parsedUrl = url.parse(req.url || "", true);
        if (parsedUrl.pathname === "/api/scrape/zomato") {
          const query = parsedUrl.query.q || "";
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Access-Control-Allow-Origin", "*");
          
          const targetUrl = `https://www.zomato.com/visakhapatnam/delivery?q=${encodeURIComponent(String(query))}`;
          const options = {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.9',
            },
            timeout: 10000
          };

          https.get(targetUrl, options, (zomatoRes) => {
            if (zomatoRes.statusCode !== 200) {
              res.statusCode = zomatoRes.statusCode || 500;
              res.end(JSON.stringify({ error: `Zomato returned status ${zomatoRes.statusCode}` }));
              return;
            }

            let data = "";
            zomatoRes.on("data", (chunk) => {
              data += chunk;
            });

            zomatoRes.on("end", () => {
              const match = data.match(/window\.__PRELOADED_STATE__\s*=\s*JSON\.parse\("([\s\S]*?)"\);/);
              if (!match) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: "Failed to parse Zomato response state" }));
                return;
              }

              try {
                const state = JSON.parse(JSON.parse(`"${match[1]}"`));
                const pages = state.pages;
                if (!pages || !pages.search) {
                  res.end(JSON.stringify([]));
                  return;
                }
                const searchKeys = Object.keys(pages.search);
                const searchData = pages.search[searchKeys[0]];
                if (!searchData || !searchData.sections || !searchData.sections.SECTION_SEARCH_RESULT) {
                  res.end(JSON.stringify([]));
                  return;
                }
                const results = searchData.sections.SECTION_SEARCH_RESULT;
                const restaurants = results
                  .filter((item: any) => item.type === 'restaurant')
                  .map((item: any) => ({
                    name: item.info.name,
                    id: item.info.resId,
                    cuisines: item.info.cuisine.map((c: any) => c.name),
                    rating: parseFloat(item.info.rating.aggregate_rating) || 0,
                    votes: parseInt(item.info.rating.votes) || 0,
                    costForTwo: item.info.cft.text,
                    locality: item.info.locality.name,
                    image: item.info.image ? item.info.image.url : null,
                    url: `https://www.zomato.com${item.info.o2FeaturedImage ? item.info.o2FeaturedImage.url : ''}`
                  }));
                res.end(JSON.stringify(restaurants));
              } catch (e: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: e.message }));
              }
            });
          }).on("error", (err) => {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          });
          return;
        }
        
        if (req.url?.startsWith("/api/scrape/")) {
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Access-Control-Allow-Origin", "*");
          const platform = req.url.split("/").pop()?.split("?")[0] || "unknown";
          let reason = "Service unavailable";
          if (platform === "swiggy") reason = "AWS WAF / Bot protection challenge detected";
          if (platform === "bigbasket") reason = "Client-side rendering shell / Dynamic content geo-locked";
          if (platform === "uber") reason = "Session authentication token required";
          if (platform === "makemytrip") reason = "Akamai anti-bot block / Connection timeout";
          
          res.end(JSON.stringify({ status: "unavailable", reason }));
          return;
        }

        next();
      });
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
