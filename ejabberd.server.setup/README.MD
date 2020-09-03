Before you build amazing things with xmpp you need to first setup the server !!!
Ejabberd, Prosody and Openfire are some of the famous xmpp server. All are great here we are going to use ejabberd as our xmpp server.

# Setup

Start the server/Install the server

```
docker-compose up
```

Register User

```
docker-compose exec xmpp-server bin/ejabberdctl register admin localhost passw0rd
User admin@localhost successfully registered
```

Similarly register other users as well (Incase when doing pubub/muc implementation )

```
docker-compose exec xmpp-server bin/ejabberdctl register hermione localhost hermione
docker-compose exec xmpp-server bin/ejabberdctl register albus localhost albus
docker-compose exec xmpp-server bin/ejabberdctl register hari localhost hari
docker-compose exec xmpp-server bin/ejabberdctl register harry localhost harry
```

Get auth token (Needed when interacting with ejabberd rest api)

```
docker-compose exec xmpp-server bin/ejabberdctl oauth_issue_token admin@localhost 33334444 ejabberd:admin
```

# Exploration

Navigate to ejabberd admin panel http://localhost:5443/admin and login with username: admin pwd: passw0rd
Enjoy :)

You can control ejabberd using Rest Api the best way to learn about them is to explore them in postman at https://documenter.getpostman.com/view/11453962/TVCb3Vc7

Also for additional rest commands similar to postman commands above visit https://docs.ejabberd.im/developer/ejabberd-api/admin-api/

Additional Notes:
For configuring ejabberd to control which services are allowed visit https://docs.ejabberd.im/admin/configuration/
