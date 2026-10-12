function submitSignin(_req, res) {
  res.json({
    prototype: true,
    message:
      "This is a prototype. No sign-in was performed and no account data was saved.",
  });
}

function submitSignup(_req, res) {
  res.json({
    prototype: true,
    message:
      "This is a prototype. No account was created and no account data was saved.",
  });
}

function enterDemo(req, res) {
  const { role } = req.body || {};

  if (role !== "adult" && role !== "child") {
    return res.status(400).json({
      prototype: true,
      message: "Choose either adult or child demo mode.",
    });
  }

  const label = role === "adult" ? "Adult" : "Child";
  return res.json({
    prototype: true,
    role,
    message: `${label} demo selected. No sign-in required.`,
  });
}

module.exports = { submitSignin, submitSignup, enterDemo };
