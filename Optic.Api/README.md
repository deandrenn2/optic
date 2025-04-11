# build

Build the project
dotnet publish -c Release -r win-x64 --self-contained true --urls "http://0.0.0.0:5000;https://0.0.0.0:7045" -o ./public

# certification

Certification the project
dotnet dev-certs https --trust
