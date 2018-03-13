# Utopian-graphics
Graphics section of Utopian

# Usage
You'll need node and npm for it, if you have brew. This will install node and npm(node package manager)
```bash
$ brew install node
$ node --version
$ npm --version
```

If you don't have brew you can simply install it via,
```bash
$ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```

```bash
$ git clone git@github.com:anilkilic/utopian-graphics.git
$ cd utopian-graphics
$ npm install
$ node app
```

and browse localhost:3000

# Features
Displaying graphic contributions done over Utopian.io.
Filtering by User / Project / Moderator
Available routes at the moment;
- /user/{username}
- /project/{projectId}
- /moderator/{username}

Filters
- ../reviewed
- ../flagged
- ../pending

Parameters
- ?limit=
- ?skip=

# Roadmap
- Better UI/UX
- Search Functionality
- Statistics about Users/Moderators/Projects

