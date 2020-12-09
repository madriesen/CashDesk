const shell = require("shelljs");

module.exports = {
  shutdown: (request, response) => {
    if (shell.exec("sudo shutdown now").code !== 0) {
      shell.echo("Error: cannot shutdown");
      shell.exit(1);
    }
  },
  update: async (request, response) => {
    const result = await gitPull();

    function gitPull() {
      shell.cd(process.env.CURRENT_DIR);
      return shell.exec('git pull');
    }


    if (result.code !== 0) {
      if (result.stderr.includes('Could not resolve host'))
        response.status(500).json({ error: { message: "Update failed! Check if your ethernet connection is plugged-in." } });
      response.status(500).json({ error: { message: "Update failed!" } });

    }

    if (result.stdout.includes("up to date")) {
      response.status(200).json({ message: "Already up-to-date." });
    }

    if (result.stdout.includes('Updating')) {
      shell.cd('client').exec('npm install && npm run build');
      shell.cd('../server').exec('npm install');
      response
        .status(201)
        .json({ message: "Updating... Don't shut down the system!" });
    }
  },
};

async function gitPull() {
  shell.cd('..')
  return shell.exec("git pull");
  // check update
}
