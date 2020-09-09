# Usage
### IdentityServer4
Either run the solution in VS, or with `dotnet run`.<br>
Username/password is `alice/alice`.
### Angular Client
Run `npm install && npm start`.
<br>Client is already configured to communicate with in-memory client defined in IDS4 with a 60 second access token.

## Problem
When clicking "Stop automatic refresh" and "Start automatic refresh" a couple of times, it seems the internal timers that should be unsubscribed start running again, firing off increasing numbers of calls to the `token` endpoint, which breaks functionality when not re-using refresh tokens.