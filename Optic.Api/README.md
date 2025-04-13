# build

Build the project
dotnet publish -c Release -r win-x64 --self-contained true -o ./public

Run
./public/Optic.Api.exe --urls "http://0.0.0.0:5000;https://0.0.0.0:7045"

# certification

Certification the project
dotnet dev-certs https --trust
