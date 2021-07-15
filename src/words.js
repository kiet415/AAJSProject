const WORDS = {
    'Antartica' : ['A very cold place', 'At the edge of the world', 'Place' ],
    'Sahara Desert' : ['A very hot and dry place', 'Located in Northern Africa', 'Place'],
    'North Korea' : ['Is a country that is divided', ' Has a supreme leader', 'Place'],
    'United Arab Emirates' : ['Has one of the most richest cities', 'Located in Western Asia', 'Place'],
    'California' : ['Is one of the 50 states', 'Has a bear on its flag', 'Place'],
    'New York' : ['Is one of the 50 states', 'Has a huge statue', 'Place'],
    'United Kingdom' : ['Is an island nation', 'A country in Europe', 'Place'],
    'Brazil' : ['Has a very popular soccer team', 'A country in South America', 'Place'],
    'Russia' : ['3 striped country flag', 'Largest country in the world', 'Place'],
    'China' : ['Has stars in its flag', 'Most populous country', 'Place'],
    'Hummingbird' : ['Has many books written with its name','Flaps its wings very fast', 'Place'],
    'Elephant' : ['Has huge ears', 'Largest land animal', 'Animal'],
    'Cheetah' : ['A spotted animal', 'A large cat in Africa', 'Animal'],
    'Hippopotamus' : ['A semiaquatic animal','Mostly herbivore and native to sub-Saharan Africa', 'Animal'],
    'Platypus' : ['Has a bill and flippers',' Egg laying mammal', 'Animal'],
    'Vulture' : ['Likes to eat dead stuff', 'A very large bird', 'Animal'],
    'Tortoise' : ['A reptile', 'Very slow', 'Animal'],
    'Cockroach' : ['A type of insect', 'Appears in houses and can sometimes fly', 'Animal'],
    'Starfish' : ['An animal that has appeared in a famous cartoon', 'Has a very unique shape', 'Animal'],
    'Guinea Pig' : ['An animal thats used in a lot of phrases','Its name has nothing to do with its looks', 'Animal'],
    'Waffle Cone' : ['A container for something sweet', 'Usually paired with Ice Cream', 'Food'],
    'Guacamole' : ['Modern Mexican condiment', 'Avocado', 'Food'],
    'Pita Bread' : ['Carbohydrates type of food', 'Common in the Middle East', 'Food'],
    'Spring Roll' : ['Usually eaten with a dip', 'Common appetizer in Asia', 'Food'],
    'Fish And Chips' : ['Combination type of food', 'Common in England', 'Food'],
    'Grilled Cheese' : ['A mixture of fats with carbs', 'Common food for children', 'Food'],
    'Orange Chicken' : ['Sweet, salty, and a bit of heat', 'Color + food', 'Food'],
    'Artichoke Dip' : ['Made from a plant','Eaten as a dip', 'Food'],
    'Jellybeans' : ['Flavor depends on the color', 'A type of candy', 'Food'],
    'Smoothie' : ['Usually a combination of things', 'A sweet drink', 'Food']
}

//const guessWordDiv = document.querySelector('.guess-word');
class RandomWord {
    constructor() {
        this.word = "";
        this.hints = [];
        this.getRandomWord();
    }
    getRandomWord() {
        const keys = Object.keys(WORDS);
        const word = keys[Math.floor(Math.random() * keys.length)];
        this.word = word;
        this.hints = WORDS[word];   
    }
    
}
export default RandomWord;