const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
const utopian = require('utopian-api');
const moment = require('moment');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.engine('handlebars', hbs({
    defaultLayout: 'main', 
    helpers: {
        formatDate: function(context) { return moment(context).fromNow(); },
        checkPrev: function(context) { if (parseInt(context) <= 1) {return "disabled"}; },
        checkNext: function(totalCount, perPage, page) {if ((parseInt(totalCount) / parseInt(perPage)) <= parseInt(page)) {return "disabled"}; },
        parseImage: function(bodyText) { 
            var res = bodyText.match(/(https?:\/\/.*\.(?:png|jpg))/i); 
            if (res) { 
                return 'https://steemitimages.com/0x0/' + res[0]; 
            } else {
                return 'https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg';
            }; 
        }
    }
}));

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

const index = require('./routes/index');
const user = require('./routes/user');
const moderator = require('./routes/moderator');
const project = require('./routes/project');

app.use('/', index);
app.use('/user', user);
app.use('/moderator', moderator);
app.use('/project', project);
