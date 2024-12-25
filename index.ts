#!/usr/bin/env bun

/**
 *
 *  npx lmist@latest (l)s
 *  npx lmist@latest (a)dd <filename> -o | .
 *  npx lmist@latest (s)tow <filename> -o | .
 *
 */

import fs from "fs";
import path from "path";

import type { BunFile } from "bun";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import chalk from "chalk";
import ora from "ora";
import logSymbols from "log-symbols";

async function getFile(filename: string): Promise<BunFile | Error> {
  const file = Bun.file(filename);
  const exists = await file.exists();

  if (!exists) {
    return new Error("File not found");
  }
  return file;
}

async function copyFile(
  sourceFile: BunFile,
  destinationPath: string
): Promise<number> {
  return await Bun.write(destinationPath, sourceFile);
}

/**
 * cli defexec
 */
yargs(hideBin(process.argv))
  .command(
    "a <filename>",
    "Downloads a specified file and saves it in the current directory or a specified output location.",
    (yargs) =>
      yargs
        .positional("filename", {
          description: "The name of the file to download.",
          type: "string",
          demandOption: true,
        })
        .option("o", {
          alias: "output",
          description: "The directory where the file should be saved.",
          type: "string",
          default: process.cwd(),
        }),
    async (argv) => {
      const spinner = ora("Processing...").start();

      try {
        const { filename, output } = argv;
        const destination = path.resolve(output, filename);

        // Validate output directory
        if (!fs.existsSync(output)) {
          spinner.fail(
            chalk.red(`Error: The output directory "${output}" does not exist.`)
          );
          process.exit(1);
        }

        const src = await getFile(filename);
        if (src instanceof Error) {
          /* panic here */
          console.log("bad");
          process.exit(1);
        }

        if (await Bun.file(output).exists()) {
          spinner.info(
            chalk.yellow(
              `The file "${filename}" already exists at the specified location.`
            )
          );
          process.exit(-1);
        }

        // Download and write the file
        spinner.text = `Downloading and saving "${filename}" to "${destination}"...`;

        await copyFile(src, output);

        spinner.succeed(
          chalk.green(
            `✅ File "${filename}" has been successfully saved to "${output}".`
          )
        );
      } catch (error) {
        spinner.fail(chalk.red("An unexpected error occurred:"));
        console.error(logSymbols.error, error.message);
        process.exit(1);
      } finally {
        /* shutdown gracefully lol gpt 4got 2 add this, i still matter! */
        process.exit(0);
      }
    }
  )
  .alias("a <filename>", "add")
  .demandCommand(1, chalk.blue("You need to specify a command."))
  .strict()
  .help()
  .alias("h", "help")
  .parse();
