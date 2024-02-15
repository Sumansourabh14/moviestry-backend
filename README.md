# Express Backend (Moviestry)

## Authentication

#### Common errors

- [bcrypt Error: data and hash arguments required](https://stackoverflow.com/a/68771597)
  
  Make sure to use await keyword before using the bcrypt function

## Authorization

### 1. Auth Middleware

#### Common errors

- [jwt must be provided](https://stackoverflow.com/a/50638723)
  
  This error happens when the coming token is null or empty.

- [jwt malformed](https://stackoverflow.com/a/58641375)
  
  This error happens when a token with invalid format is passed in the request headers.

- [invalid token](https://stackoverflow.com/a/58641375)
  
  

- [invalid signature](https://stackoverflow.com/a/58641375)
  
  