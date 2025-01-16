with import <nixpkgs> {};

mkShell {
  # Specify the build inputs (dependencies)
  buildInputs = [
    nodejs # Node.js
    yarn   # Yarn (optional, replace with `nodePackages.npm` if you prefer npm)
  ];

  # Set environment variables
  shellHook = ''
    export PATH="$PWD/node_modules/.bin:$PATH"
    echo "Node.js environment ready!"
  '';
}