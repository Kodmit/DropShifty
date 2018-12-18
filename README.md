# DropShifty
Plateforme de dropshipping WooCommerce.  

# How to install ?
  
- Clone the repository `git clone https://github.com/Kodmit/DropShifty.git`
- Go in the `/api` folder and enter `composer update`
- Edit the `.env` file with your database credentials.
- Enter `php bin/console d:d:d` and `php bin/console d:s:u --force`
- Start the server with `php bin/console s:r`
- You can now access the GraphQL interface on `http://localhost:8000/graphiql`