const WORDS = {
    'Antartica' : ['A very cold place', 'At the edge of the world' ],
    'Sahara Desert' : ['A very hot and dry place', 'Located in Northern Africa'],
    'North Korea' : ['Is a country that is divided', ' Has a supreme leader'],
    'United Arab Emirates' : ['Has one of the most richest cities', 'Located in Western Asia'],
    'California' : ['Is one of the 50 states', 'Has a bear on its flag'],
    'New York' : ['Is one of the 50 states', 'Has a huge statue'],
    'United Kingdom' : ['Is an island nation', 'A country in Europe'],
    'Brazil' : ['Has a very popular soccer team', 'A country in South America'],
    'Russia' : ['3 striped country flag', 'Largest country in the world'],
    'China' : ['Has stars in its flag', 'Most populous country'],
    'Hummingbird' : ['Has many books written with its name','Flaps its wings very fast'],
    'Elephant' : ['Has huge ears', 'Largest land animal'],
    'Cheetah' : ['A spotted animal', 'A large cat in Africa'],
    'Hippopotamus' : ['A semiaquatic animal','Mostly herbivore and native to sub-Saharan Africa'],
    'Platypus' : ['Has a bill and flippers',' Egg laying mammal'],
    'Vulture' : ['Likes to eat dead stuff', 'A very large bird'],
    'Tortoise' : ['A reptile', 'Very slow'],
    'Cockroach' : ['A type of insect', 'Appears in houses and can sometimes fly'],
    'Starfish' : ['An animal that has appeared in a famous cartoon', 'Has a very unique shape'],
    'Guinea Pig' : ['An animal thats used in a lot of phrases','Its name has nothing to do with its looks'],
    'Waffle Cone' : ['A container for something sweet', 'Usually paired with Ice Cream'],
    'Guacamole' : ['Modern Mexican condiment', 'Avocado'],
    'Pita Bread' : ['Carbohydrates type of food', 'Common in the Middle East'],
    'Spring Roll' : ['Usually eaten with a dip', 'Common appetizer in Asia'],
    'Fish And Chips' : ['Combination type of food', 'Common in England'],
    'Grilled Cheese' : ['A mixture of fats with carbs', 'Common food for children'],
    'Orange Chicken' : ['Sweet, salty, and a bit of heat', 'Color + food'],
    'Artichoke Dip' : ['Made from a plant','Eaten as a dip'],
    'Jellybeans' : ['Flavor depends on the color', 'A type of candy'],
    'Smoothie' : ['Usually a combination of things', 'A sweet drink']
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