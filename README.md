## vintinder-web 
 - Created vintinder-web project using vite + React
 - Install Tailwindcss for vite
 - Install daisyUI for vite
 - Created Header and Footer components and added to app.jsx  
 - Install react-router-dom 
 - created a BroweseRouter and Routes
 - Add Outlet to Body components
 - Install axios 
 - Install cors in backend => add middleware to with configurations:origin,credentials: true,
 - Whenever making api call so pass axios => {withCredentials : true}
 - Install Redux Toolkit => https://redux-toolkit.js.org/tutorials/quick-start  
 - Install @reduxjs/toolkit   react-redux =>  npm install @reduxjs/toolkit react-redux
 - Navbar should update as soon as user logs in
 - Created components folder and add all files to components
 - Refractor the code to add constant file + create a components folder
 - You Should not access other routes   without login   (Imp)
 - If token is not  present,redirect to login page 
 - Created logout page feature 
 - Added Error handling feature to login page
 - Get the feed and added to store 
 - build usercard
 - build Edit Profile feature
 - created Toast feature
 - create a connections page
 - create a connection request page
 - Feature Accept/Reject Connection request
 - Send Interested/Ignored the user card from the feed


 # deployment in aws
 - signup on aws
 - Launch instance
 - chmod 400 <secret>.pem
 - ssh - i "Vintinder-secret.pem " ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com
 - Install node verion manager (v24.8.0)
 - git clone on ubuntu terminal
 - Frontend
    - npm install => dependencies install 
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy code from dist(build files) to /var/www/html/
    - sudo scp -r dist/* /var/www/html/
    - enable port:80 of you instance =>
         - security -> security Group => inbound rules -> edit inbound rules
              - Add rule -> port:80 
  - Backend
    - allowed EC2 instances public IP on network access in mongoDB server
    - Install PM2 for 24*7 server => npm install pm2 -g
    - start PM2 => pm2  start npm  -- start
    - pm2 logs 
    <!-- - clear pm2 logs --> - pm2 flush <name>
    - pm2 list , pm2 stop <name>, pm2 delete <name>
    - pm2 start npm --name "newname" -- start  => change name
    - config nginx =>  sudo nano /etc/nginx/sites-avilabele/default 
    
    # update and deploy project AWS server
     - For Backends-
         - cd devtinder
         - git pull
         - pm2 restart 0 
         - pm2 flush -> To see the logs
     - For frontend-
         - cd ../devtinder/web
         - git pull
         - npm run build
         - sudo scp -r dist/* /var/www/html/   -> it will copy the dist folder to var folder 
    - => sudo systemctl restart nginx
     # nginx config
    - Modify the BASE_URL in frontend project to /api/
       - git pull in ubuntu server terminal


  # adding domain Name
  - purchase domain from Godaddy or BlueHost or any website
  - SignUp on cloudflare  & add new domain name
  - change the name server on Godaddy and point it to cloudaflare 
  - wait for sometime till your nameservers are updated
  - DNS - record- VinTinder IP address (run server address) 
  - Enable SSL for website 

  # AWS SES
   - SignUp on SES
   - IAM create a user
     - addpolicies
   - SES create an identity 
   - Verify the domain name
   - Verify an email address
   - Install AWS SDK - v3 - 
   - Setup SesClient 
   - Access Credentials should be created in IAM under SecurityCredentials Tab
   - Add the credentials to the file
   - write code for SESClient 
   - Write code for Sedning email address
   - make the email dynamic by passing more params to the run function

   # Scheduling cron jobs in NodeJS
   - Installing node-cron
   - Learning about cron expression syntax - crontab.guru
   - Scheduling a job
   - date-fns
   - Find all the unique email Id Who have got connetion Request in Previous day
   - send Email
   - Explore queue mechanis to send bulk emails
   - Amazon SES Bulk Emails
   - Make sendEmail function 
   - bee-queue and bull package
   # Razorpay Payment Gateway Integrations
    - SignUp in Razorpay & complete KYC 
    - Create UI for premium page 
    - creating API for backend Premium
    - added key and secret key to .env file
    - creating order on Razorpay
    - create Schema and model
    - saved the order in payments collection
    - making the api dynamic
    - creating webhooks api and add  webhook in dashboard and created a webhook secret key
    - Created payment/verify api after it called webshooks ,using handle function
    - bug fixed successfully
  
   # Real time chat using Websockets(Socket.io)
     - build the UI for a window on /chat/:targetUserId  
     - npm i socket.io -> In Backend
     - npm i socket.io-client -> In FrontEnd
       - create socket connection and joinchat event is emmited and socket.disconnect()
       - create socket rooms and create a secret hash auth for security
      