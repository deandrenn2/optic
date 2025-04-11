# build

Build the project
dotnet publish -c Release -r win-x64 --self-contained true -o ./public

# certification

Certification the project
dotnet dev-certs https --trust
