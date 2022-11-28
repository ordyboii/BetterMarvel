import { defineConfig } from "astro/config";

// https://astro.build/config
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [
    solidJs(),
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp"
    })
  ],
  output: "server",
  adapter: vercel()
});
