class CreateWordinfosAndLessons < ActiveRecord::Migration[5.0]
  def change
    create_table :wordinfos do |t|
      t.string :word, index: true
      t.text :definition
      t.belongs_to :user, index: true
      t.timestamps
    end

    create_table :lessons do |t|
      t.string :title
      t.belongs_to :instructor, index: true
      t.timestamps
    end

    create_table :lesson_wordinfos, id: false do |t|
      t.belongs_to :wordinfo, index: true
      t.belongs_to :lesson, index: true
      t.timestamps
    end

    create_table :roots do |t|
      t.string :word
      t.belongs_to :wordinfo, index: true
      t.timestamps
    end

    create_table :forms do |t|
      t.belongs_to :associated_word
      t.belongs_to :wordinfo, index: true
      t.timestamps
    end

    create_table :synonyms do |t|
      t.string :word
      t.belongs_to :wordinfo, index: true
      t.timestamps
    end

    create_table :antonyms do |t|
      t.string :word
      t.belongs_to :wordinfo, index: true
      t.timestamps
    end

    create_table :sentences do |t|
      t.text :context_sentence
      t.belongs_to :wordinfo, index: true
      t.timestamps
    end
  end
end
