#!/usr/bin/env node
import { Command } from "commander";
import { addCommand } from "./commands/add.js";

const program = new Command();

program
  .name("stashcode")
  .description("CLI for installing StashCode components into your project")
  .version("0.0.1");

addCommand(program);

program.parseAsync(process.argv);
