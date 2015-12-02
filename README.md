# roux-academy
This is the project for the Ray Villalobos' course [Building a Website with Node.js and Express.js ][l1]. It's a pretty basic course about [Express.js][l2], but a very good one for beginners.

The author uses [EJS][l3] as a templating system(surprisingly similar to ERB), and since the course was pretty basic, I took the chance to modify it to use [Handlebars][l4] templates instead and learn about the syntax. This *readme* contains some notes I took about what I learned on the process.

If you want to give it a go just clone it and run:

```bash
$ DEBUG=roux-meet:* npm start
```
And open your browser at [localhost:3000](http://localhost:3000/)

You can also see it [live here][l9].

## Express templates
I wanted to use the cool [Express app generator][l5] to create a lot of the boilerplate code an Express app needs to start up. At the moment of this writing, using the **generator** the templates engine defaults to [JADE][l6], but it also offers a couple of alternative templating options to choose among:

* [EJS][l3], using the `-e` or `--ejs` options.
* [Handlebars][l4], using the `--hbs` option.

Even though I wanted to use [Handlebars][l4], I didn't use the `--hbs` option, since it uses the [hbs][l6] package. There's nothing wrong with that, but I wanted to be able of using **layouts** in my templates, which is not supported by this package.

## Another Handlebars for Express
The [express-handlebars][l7] is advertised as a *"A Handlebars view engine for Express which doesn't suck."*, I don't know about that, but I chose it because if offers the possibility of using **layouts**, which I pretty much wanted to use.

So after generating the app, I just had to add this package:
```bash
$ npm install express-handlebars --save
```

Then require it in `app.js`:
```js
var exphbs  = require('express-handlebars');
var helpers = require('./lib/helpers');
```

And configure it:
```js
app.engine('hbs', expHbs({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers: helpers
}));
```

A couple of things to notice here:

* I had to use `hbs` to register the engine, otherwise using `.hbs` as an extension for the templates files will generate errors.
* Also notice how I had to require the directory for the **helpers**, and declare it in the engine configuration.

I have to say that the **helpers** configuration was something I added later after hitting a bump using [Handlebars][l4]. One of the things that struck me was the small logic we have available using this engine, later I understood that's a design philosophy and the only way to force developers to move the logic out of the templates themselves, to **helper files**.

## Where to put the helpers
Once I realized the built-in helpers offered by Handlebars weren't gonna cut it and that I needed to use a custom helper function, first doubt I had was where should I put the stuff. So I created the `lib` folder and inside a `helpers.js` file, and wired it to the app as shown in the previous section.

This is the scenario. I have one source of data in the `data.json` file, which I have to show differently depending on the path requested:

1. For the `home` page, I don't want to show any info.
2. For the `speakers` page I want to show just a summary.
3. For the `artistDetail` page I want to show the whole description.

This is the helper function I used:

```js
exports.artistInfo = function (page) {
  if (page == 'home') {
    return '';
  } else if (page == 'artistDetail'){
    return this.description;
  } else {
    return this.summary;
  }
}
```

## Changing the context
Another interesting thing I learned was once we are iterating through a given context using an `#each` helper, we can get out of the context and go up a level using `../`. The situation:

* We want to use the same partial in 3 different routes, passing along different data for each of them.
* You are inside an `#each` block iterating over the items of a data context (in this case `speakers`).
* Then, inside this block we need to use the helper(`artistInfo`), and pass it a field (`page`) that is out of the data context we are iterating on. So we need to do `{{artistInfo ../page}}` and that's it. Check the [speakerlist.hbs][l8] partial to refresh your memory.


[l1]: http://www.lynda.com/Expressjs-tutorials/Building-Website-Nodejs-Expressjs/163094-2.html
[l2]: http://expressjs.com/en/index.html
[l3]: http://www.embeddedjs.com/
[l4]: http://handlebarsjs.com/
[l5]: http://expressjs.com/en/starter/generator.html
[l6]: https://github.com/donpark/hbs
[l7]: https://github.com/ericf/express-handlebars
[l8]: https://github.com/lifeBalance/roux-academy/blob/master/views/partials/speakerslist.hbs
[l9]: https://academia-roux.herokuapp.com
