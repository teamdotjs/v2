# This file should contain all the record creation needed to seed the
# database with its default values. The data can then be loaded with the
# rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'date'
user = User.create(email: 'user@email.com', name: 'User Name', password: 'password', birthday: Date.yesterday)
lesson = Lesson.create(title: 'A\'s', owner: user)

atheist = Wordinfo.create(word: 'atheist', definition: 'One who does not believe in God', part_of_speech: 'noun', user: user, lesson: lesson)
Root.create(root: 'the', meaning: 'God', wordinfo: atheist)
Form.create(word: 'atheistic', part_of_speech: 'adjective', wordinfo: atheist)
Synonym.create(word: 'nonbeliever', wordinfo: atheist)
Synonym.create(word: 'unbeliever', wordinfo: atheist)
Antonym.create(word: 'believer', wordinfo: atheist)
Sentence.create(context_sentence: 'The atheist wrote a novel disproving the existence of a higher power.', wordinfo: atheist)

anarchy = Wordinfo.create(word: 'anarchy', definition: 'A state of disorder due to absence or nonrecognition of authority', part_of_speech: 'noun', user: user, lesson: lesson)
Root.create(root: 'arch', meaning: 'rule', wordinfo: anarchy)
Form.create(word: 'anarchically', part_of_speech: 'adverb', wordinfo: anarchy)
Synonym.create(word: 'chaos', wordinfo: anarchy)
Synonym.create(word: 'unrest', wordinfo: anarchy)
Antonym.create(word: 'calm', wordinfo: anarchy)
Antonym.create(word: 'peace', wordinfo: anarchy)
Sentence.create(context_sentence: 'As soon as the teacher stepped in the hall, the classroom descended into anarchy.', wordinfo: anarchy)

synonym_practice = Practice.create(type: 'synonym', lesson: lesson)
atheist_synonym_q = Question.create(type: 'mc', practice: synonym_practice)
Prompt.create(text: 'What is the synonym of atheist?', question: atheist_synonym_q)
Option.create(value: 'nonbeliever', is_correct: true, question: atheist_synonym_q)
Option.create(value: 'believer', is_correct: false, question: atheist_synonym_q)
Option.create(value: 'chaos', is_correct: false, question: atheist_synonym_q)
Option.create(value: 'calm', is_correct: false, question: atheist_synonym_q)

anarchy_synonym_q = Question.create(type: 'mc', practice: synonym_practice)
Prompt.create(text: 'What is the synonym of anarchy?', question: anarchy_synonym_q)
Option.create(value: 'nonbeliever', is_correct: false, question: anarchy_synonym_q)
Option.create(value: 'believer', is_correct: false, question: anarchy_synonym_q)
Option.create(value: 'chaos', is_correct: true, question: anarchy_synonym_q)
Option.create(value: 'calm', is_correct: false, question: anarchy_synonym_q)

sentence_practice = Practice.create(type: 'sentence', lesson: lesson)
atheist_sentence_q = Question.create(type: 'fitb', practice: sentence_practice)
Prompt.create(text: 'The atheist wrote a novel disproving the existence of a higher power.', question: atheist_sentence_q)
Option.create(value: 'atheist', is_correct: true, question: atheist_sentence_q)

anarchy_sentence_q = Question.create(type: 'fitb', practice: sentence_practice)
Prompt.create(text: 'As soon as the teacher stepped in the hall, the classroom descended into anarchy.', question: anarchy_sentence_q)
Option.create(value: 'anarchy', is_correct: true, question: anarchy_sentence_q)