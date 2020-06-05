# Fruit Facts API

Enter a fruit as the url slug and see a random fruit fact displayed as json. [See the blog post: Fruit Ninja Random Fruit Facts API Built with Pure Node.js](https://tamalweb.com/fruit-ninja-facts)

Run it on your computer:

`node index.js`

Example:

`localhost:5000/apple`

Response:

```
{
  "fruit": "apple",
  "fact": "There are over 10,000 varieties of apples grown around the world",
}
```

To run this code, run: `node index.js`

Fruit facts from Fruit Ninja game, retrieved from https://fruitninjafacts.fandom.com/wiki/Sensei%27s_fruit_facts

# API

/ -index page shows greeting

/help -help page shows help and available fruits

/:fruit -fruit page shows info about the given fruit

not found page shows up when search does not match available fruits

**All fruits:**

apple,

banana,

coconut,

kiwi,

lemon,

lime,

orange,

pear,

watermelon,

mango,

pineapple,

passion,

strawberry
