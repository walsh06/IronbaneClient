Ironbane Client
==============

The client for Ironbane, the open source MMO.
Play the game at <http://www.ironbane.com/>.

## Requirements

* A browser with WebGL support
* A local webserver (XAMPP, WAMP, etc)
* MySQL 5.0 or later
* A MySQL client (I recommend [SQLyog Community Edition](https://code.google.com/p/sqlyog/downloads/list) but you can also use phpMyAdmin which should come pre-installed with your webserver)
* PHP 5.3.8 or later

## Getting started

* Clone this repository inside your webserver.
```
git clone https://github.com/ironbane/IronbaneClient.git
```

* Open ```config.php``` and edit the variables to match your MySQL server

* Run this git command from your repository to make sure your changed ```config.php``` won't be accidentally commited:
```
  git update-index --assume-unchanged config.php
```

* Make an empty ```cache```directory inside ```plugins/game/images/characters/```

* Open up your MySQL client and make a new database ```ironbane```

* Import ```sql/install.sql``` to database ```ironbane```

* [Install the Ironbane server on the same machine](https://github.com/ironbane/IronbaneServer/)

* Run the Ironbane server

* Open up ```http://localhost/IronbaneClient/game.php```

## Note

A lot of code in this repository is somewhat ancient and majority of it needs to be improved/rewritten.
I have learned more about better software development since I started this project, and would do it differently if I had to start over.
That being said, it works! If you find stuff you think you can improve, by all means go for it and make a pull request!
