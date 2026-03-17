Solution
1. Install PostgreSQL client inside the devcontainer
```bash
sudo apt update
sudo apt install postgresql-client -y```
2. Verify installation
`psql --version`

Expected output:
psql (PostgreSQL) XX.X

3. Connect to the database
`psql -h db -U postgres -d postgres`