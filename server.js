const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", (req, res) => {
  const { error } = req.body;

  let response = "";

  if (error.includes("Cannot find module")) {
    const moduleName = error.split("'")[1] || "express";

    response = `
❌ Error:
${error}

💡 Explanation:
The required module is missing.

💻 Before (Broken Code):
const express = require('${moduleName}');

❌ Module not installed

✅ Fix:
Run:
npm install ${moduleName}

💻 After (Fixed):
npm install ${moduleName}
const express = require('${moduleName}');

🚀 Ready to auto-fix
`;
  } else if (error.includes("SyntaxError")) {
    response = `
❌ Error:
${error}

💡 Explanation:
There is a syntax issue in your code.

✅ Fix:
- Check brackets, commas, or keywords

💻 Example Fix:
function test() {
  console.log("Hello");
}
`;
  } else {
    response = `
❌ Error:
Unknown

💡 Explanation:
General issue

✅ Fix:
Check logs and dependencies
`;
  }

  res.json({ response });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});