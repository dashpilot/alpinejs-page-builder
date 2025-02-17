import fs from 'fs';
import path from 'path';

function convertHtmlToJs(content) {
    const templateMatch = content.match(/<component-template>([\s\S]*?)<\/component-template>/);
    const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
    const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);

    const template = templateMatch ? templateMatch[1].trim() : '';
    const script = scriptMatch ? scriptMatch[1].trim() : '';
    const style = styleMatch ? styleMatch[1].trim() : '';

    return `
    export const template = \`${template}\`;

    ${script}

    const style = \`${style}\`;
    if (style) {
      const styleElement = document.createElement('style');
      styleElement.textContent = style;
      document.head.appendChild(styleElement);
    }
  `;
}

export default function convertComponentsPlugin() {
    return {
        name: 'convert-components',
        handleHotUpdate({ file, read, server }) {
            if (file.endsWith('.html')) {
                read().then((content) => {
                    const jsContent = convertHtmlToJs(content);
                    const outputFileName = path.basename(file, '.html') + '.js';
                    const outputDir = path.join(path.dirname(file), '../generated');

                    // Ensure the output directory exists
                    if (!fs.existsSync(outputDir)) {
                        fs.mkdirSync(outputDir, { recursive: true });
                    }

                    const outputPath = path.join(outputDir, outputFileName);

                    fs.writeFileSync(outputPath, jsContent, 'utf-8');
                    console.log(`Converted ${file} to ${outputFileName}`);

                    // Trigger Vite to reload the module
                    server.ws.send({
                        type: 'full-reload',
                        path: '*',
                    });
                });
            }
        },
        buildStart() {
            const componentsDir = path.resolve(__dirname, 'src/components');
            const outputDir = path.resolve(__dirname, 'src/generated');

            // Ensure the output directory exists
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            fs.readdirSync(componentsDir).forEach((file) => {
                if (file.endsWith('.html')) {
                    const filePath = path.join(componentsDir, file);
                    const content = fs.readFileSync(filePath, 'utf-8');
                    const jsContent = convertHtmlToJs(content);
                    const outputFileName = path.basename(file, '.html') + '.js';
                    const outputPath = path.join(outputDir, outputFileName);

                    fs.writeFileSync(outputPath, jsContent, 'utf-8');
                    console.log(`Converted ${file} to ${outputFileName}`);
                }
            });
        },
    };
}
