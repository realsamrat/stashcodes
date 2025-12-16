import fs from "fs";
import path from "path";
import boxen from "boxen";
import chalk from "chalk";

const REGISTRY_BASE =
  (process.env.STASHCODE_REGISTRY_URL ||
    "https://stashcode.dev/registry").replace(/\/$/, "");

function toPascalCase(slug) {
  return slug
    .split(/[-_\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

async function fetchComponent(slug) {
  const url = `${REGISTRY_BASE}/components/${slug}.json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Unknown component "${slug}" (status ${res.status})`);
  }
  return res.json();
}

function resolveFiles(slug, component) {
  if (Array.isArray(component.files) && component.files.length > 0) {
    return component.files;
  }
  if (component.reactCode) {
    return [
      {
        name: `${toPascalCase(slug)}.tsx`,
        content: component.reactCode,
      },
    ];
  }
  throw new Error(`Component "${slug}" has no files to install`);
}

export function addCommand(program) {
  program
    .command("add")
    .argument("<component>", "component slug (e.g. glassy-cta)")
    .option("-d, --dir <path>", "target directory", "src/components")
    .description("Copy a StashCode component into your project")
    .action(async (component, options) => {
      try {
        const data = await fetchComponent(component);
        const files = resolveFiles(component, data);
        const targetDir = path.resolve(process.cwd(), options.dir);

        fs.mkdirSync(targetDir, { recursive: true });
        files.forEach((file) => {
          const targetFile = path.join(targetDir, file.name);
          fs.writeFileSync(targetFile, file.content, "utf8");
        });

        console.log(
          boxen(
            [
              `${chalk.green("Added")} ${chalk.white(component)}`,
              chalk.gray(targetDir),
              "",
              chalk.dim(
                "Tip: import it from your project path and start using it.",
              ),
            ].join("\n"),
            { padding: 1, borderColor: "green", title: "stashcode add" },
          ),
        );
      } catch (err) {
        console.error(
          boxen(
            [
              `${chalk.red("Failed to add:")} ${chalk.white(component)}`,
              "",
              chalk.red(err.message),
            ].join("\n"),
            { padding: 1, borderColor: "red", title: "stashcode add" },
          ),
        );
        process.exit(1);
      }
    });
}
