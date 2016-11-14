# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161111191936) do

  create_table "antonyms", force: :cascade do |t|
    t.string   "word"
    t.integer  "wordinfo_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["wordinfo_id"], name: "index_antonyms_on_wordinfo_id"
  end

  create_table "forms", force: :cascade do |t|
    t.integer  "wordinfo_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "word"
    t.string   "part_of_speech"
    t.index ["wordinfo_id"], name: "index_forms_on_wordinfo_id"
  end

  create_table "lessons", force: :cascade do |t|
    t.string   "title",      default: "Untitled"
    t.integer  "owner_id"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.index ["owner_id"], name: "index_lessons_on_owner_id"
  end

  create_table "options", force: :cascade do |t|
    t.integer  "question_id"
    t.string   "value"
    t.boolean  "is_correct"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["question_id"], name: "index_options_on_question_id"
  end

  create_table "practices", force: :cascade do |t|
    t.integer  "lesson_id"
    t.integer  "type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["lesson_id"], name: "index_practices_on_lesson_id"
    t.index ["type"], name: "index_practices_on_type"
  end

  create_table "prompts", force: :cascade do |t|
    t.integer  "question_id"
    t.text     "text"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["question_id"], name: "index_prompts_on_question_id"
  end

  create_table "questions", force: :cascade do |t|
    t.integer  "practice_id"
    t.integer  "type"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["practice_id"], name: "index_questions_on_practice_id"
    t.index ["type"], name: "index_questions_on_type"
  end

  create_table "roots", force: :cascade do |t|
    t.string   "root"
    t.integer  "wordinfo_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "meaning"
    t.index ["wordinfo_id"], name: "index_roots_on_wordinfo_id"
  end

  create_table "sentences", force: :cascade do |t|
    t.text     "context_sentence"
    t.integer  "wordinfo_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["wordinfo_id"], name: "index_sentences_on_wordinfo_id"
  end

  create_table "synonyms", force: :cascade do |t|
    t.string   "word"
    t.integer  "wordinfo_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["wordinfo_id"], name: "index_synonyms_on_wordinfo_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.date     "birthday"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "wordinfos", force: :cascade do |t|
    t.string   "word"
    t.text     "definition"
    t.integer  "user_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "lesson_id"
    t.string   "part_of_speech"
    t.index ["lesson_id"], name: "index_wordinfos_on_lesson_id"
    t.index ["user_id"], name: "index_wordinfos_on_user_id"
    t.index ["word"], name: "index_wordinfos_on_word"
  end

end
