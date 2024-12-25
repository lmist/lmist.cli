#!/usr/bin/env bun

/**
 * 
    npx lmist@latest ls
    npx lmist@latest get <file-name> -o => optional
    npx lmist@latest stow <file-name>
 */

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import logSymbols from "log-symbols";

/**
 * Handles the business logic of checking for the file's existence.
 * @param {string} filePath - The path to check for the file.
 * @returns {boolean} - True if the file exists, otherwise false.
 */
function checkFileExists(filePath) {
  // Placeholder for checking if the file exists
  return false;
}

/**
 * Handles downloading and writing the specified file.
 * @param {string} fileName - The name of the file to download.
 * @param {string} destination - The destination directory where the file will be saved.
 */
function downloadAndWriteFile(fileName, destination) {
  // Placeholder for downloading and writing the file
}

/**
 * CLI definition and execution
 */
yargs(hideBin(process.argv))
  .command(
    "add <filename>",
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

        // Check if the file already exists
        if (checkFileExists(destination)) {
          spinner.info(
            chalk.yellow(
              `The file "${filename}" already exists at the specified location.`
            )
          );
          process.exit(0);
        }

        // Download and write the file
        spinner.text = `Downloading and saving "${filename}" to "${destination}"...`;
        downloadAndWriteFile(filename, destination);
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
  .alias("a", "add")
  .demandCommand(1, chalk.blue("You need to specify a command."))
  .strict()
  .help()
  .alias("h", "help")
  .parse();
