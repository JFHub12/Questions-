from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS for all routes - essential for cross-origin frontend requests
CORS(app)

# Sample data containing 10 realistic questions
# Each object follows the structure: { id: int, question: str, options: list[str] }
questions_data = [
    {
        "id": 1,
        "question": "What is the capital of France?",
        "options": ["London", "Berlin", "Paris", "Madrid"]
    },
    {
        "id": 2,
        "question": "Which planet is known as the Red Planet?",
        "options": ["Venus", "Mars", "Jupiter", "Saturn"]
    },
    {
        "id": 3,
        "question": "Who wrote 'Romeo and Juliet'?",
        "options": ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"]
    },
    {
        "id": 4,
        "question": "What is the largest ocean on Earth?",
        "options": ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"]
    },
    {
        "id": 5,
        "question": "Which element has the chemical symbol 'O'?",
        "options": ["Gold", "Oxygen", "Silver", "Iron"]
    },
    {
        "id": 6,
        "question": "What is the square root of 64?",
        "options": ["6", "7", "8", "9"]
    },
    {
        "id": 7,
        "question": "In which year did World War II end?",
        "options": ["1943", "1944", "1945", "1946"]
    },
    {
        "id": 8,
        "question": "What is the tallest mountain in the world?",
        "options": ["K2", "Mount Everest", "Kilimanjaro", "Mount Denali"]
    },
    {
        "id": 9,
        "question": "Which animal is known as the 'King of the Jungle'?",
        "options": ["Tiger", "Elephant", "Lion", "Giraffe"]
    },
    {
        "id": 10,
        "question": "How many continents are there on Earth?",
        "options": ["5", "6", "7", "8"]
    }
]

@app.route('/api/questions', methods=['GET'])
def get_questions():
    """
    HTTP GET endpoint that returns a list of question objects in JSON format.
    """
    return jsonify(questions_data)

if __name__ == '__main__':
    # Running the app on port 3000 to match common dev environments
    app.run(host='0.0.0.0', port=3000, debug=True)
