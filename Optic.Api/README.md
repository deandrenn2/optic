# build

Build the project
dotnet publish -c Release -r win-x64 --self-contained true -p:OutputType=WinExe -o ./public

## or multiple files recommended

dotnet publish -c Release -r win-x64 --self-contained true -o ./public

Run
"C:\LAB\OPTICA\ARQUITECTURA\ARQUITECTURA 1\optic\Optic.Api\public\Optic.Api.exe" --urls "http://0.0.0.0:5001;http://localhost:5001;https://0.0.0.0:7045;https://localhost:7045"

# certification

Certification the project
dotnet dev-certs https --trust
