export default {
	files: ["test/*_test.ts"],
	failWithoutAssertions: true,
	verbose: true,
  extensions: ["ts"],
  require: [
    "./test/lib/bootstrap.js"
  ]
};
