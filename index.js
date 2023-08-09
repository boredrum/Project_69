import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ----------Excercise 1--------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const book = "The Wind in the Willows (introductory fragment).txt";

const readStream = fs.createReadStream(path.join(__dirname, "/text", book), {
	highWaterMark: 4096,
});
const writeStream = fs.createWriteStream(
	path.join(__dirname, "/text", "book_copy.txt")
);

readStream.on("data", (chunk) => {
	writeStream.write(chunk.toString());
	writeStream.write(
		"\n" +
			"\n" +
			"\n" +
			"\n" +
			"-----------------------------Introductory fragment, copying is prohibited!-----------------------------" +
			"\n" +
			"\n" +
			"\n" +
			"\n"
	);
});

// ----------Excercise 2--------------------------------------------------

const log = function (data) {
	data = data.toString();
	process.stdout.write(data + "\n");
};

log("Excercise 2 test" + "\n");

// ----------Excercise 3--------------------------------------------------

const dataYes = ["Y", "y", "yes", "YES"];
const dataNo = ["N", "n", "no", "NO"];
const validData = [...dataYes, ...dataNo];

const ask = (question) => {
	return new Promise((resolve, reject) => {
		process.stdout.write(question);
		process.stdin.once("data", (data) => {
			const formData = data.toString().trim();
			if (formData) {
				if (validData.includes(formData)) {
					resolve(data.toString().trim());
				} else {
					reject(new Error("Invalid response format"));
				}
			} else {
				reject(new Error("Fields cannot be empty!"));
			}
		});
	});
};
(async () => {
	try {
		const SCSS = await ask("Do you want to use SCSS? ");
		const ESLint = await ask("Do you want to use ESLint? ");
		dataYes.includes(SCSS)
			? process.stdout.write(`SCSS is in use` + "\n")
			: process.stdout.write(`SCSS is NOT in use` + "\n");
		dataYes.includes(ESLint)
			? process.stdout.write(`ESLint is in use` + "\n")
			: process.stdout.write(`ESLint is NOT in use` + "\n");
		process.exit();
	} catch (error) {
		process.stderr.write(error.message);
		process.exit(1);
	}
})();
