/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!nanoid/)", // Ignora tudo na pasta node_modules, exceto o nanoid
  ],
  detectOpenHandles: true,
};
