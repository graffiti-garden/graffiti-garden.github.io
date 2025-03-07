import { defineConfig, ViteDevServer } from "vite";
import path from "path";
import fs from "fs";
import vue from "@vitejs/plugin-vue";
import { exec } from "child_process";

const paperInputDirectory = "paper";
const htmlOutputDirectory = "paper-html";

function compilePaperFile(inputFile: string) {
  const root = import.meta.dirname;
  const inputFileRelative = path.relative(root, inputFile);

  if (
    inputFileRelative.endsWith(".png") ||
    inputFileRelative.endsWith(".jpg")
  ) {
    const outputFileRelative = path.resolve("public", inputFileRelative);
    const outputFile = path.resolve(root, outputFileRelative);
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.copyFileSync(inputFile, outputFile);
    return;
  } else if (inputFileRelative.endsWith(".tex")) {
    const outputFileRelative = inputFileRelative
      .replace(paperInputDirectory, htmlOutputDirectory)
      .replace(".tex", ".html");
    const outputFile = path.resolve(root, outputFileRelative);
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });

    exec(
      `pandoc \
      --write=html5 \
      --mathjax \
      --listings \
      --variable linestretch=1.25 \
      --bibliography=${paperInputDirectory}/bibliography.bib \
      --citeproc \
      -M link-citations=true \
      --output=${outputFile} \
      ${inputFile}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        } else {
          console.log(stdout);
          console.log(stderr);
        }
      },
    );
  }
}

function buildAllPaperFiles(searchDirectory: string = paperInputDirectory) {
  const files = fs.readdirSync(searchDirectory);
  for (const file of files) {
    const filePath = path.resolve(searchDirectory, file);
    if (fs.statSync(filePath).isDirectory()) {
      buildAllPaperFiles(filePath);
    } else {
      compilePaperFile(filePath);
    }
  }
}

console.log("hiii");

export default defineConfig({
  plugins: [
    vue(),
    {
      name: "watch-and-convert-latex-to-html",
      buildStart() {
        buildAllPaperFiles();
      },
      configureServer(server) {
        buildAllPaperFiles();

        // Watch for any subsequent changes
        server.watcher.on("change", async (file) => {
          const fileRelative = path.relative(server.config.root, file);
          if (fileRelative.split("/")[0] === paperInputDirectory) {
            buildAllPaperFiles();
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler",
    },
  },
});
