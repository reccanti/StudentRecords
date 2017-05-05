#!/usr/bin/env node

process.env['DB_HOST']     = "URL to database here";
process.env['DB_USER']     = "Database username here";
process.env['DB_PASSWORD'] = "Database password here";
process.env['DB_DATABASE'] = "Name of database here";
process.env['DB_PORT']     = "database port here";

process.env['PORT']        = "Specifiy the port you want to host the server on"