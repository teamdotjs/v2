class AddUniqueConstraints < ActiveRecord::Migration[5.0]
  def up
    execute 'CREATE UNIQUE INDEX index_wordinfos_on_lesson_id_and_word
             ON wordinfos (lesson_id, lower(word));'
    execute 'CREATE UNIQUE INDEX index_roots_on_wordinfo_id_and_word
             ON roots (wordinfo_id, lower(word));'
    execute 'CREATE UNIQUE INDEX index_synonyms_on_wordinfo_id_and_word
             ON synonyms (wordinfo_id, lower(word));'
    execute 'CREATE UNIQUE INDEX index_antonyms_on_wordinfo_id_and_word
             ON antonyms (wordinfo_id, lower(word));'
    execute 'CREATE UNIQUE INDEX index_sentences_on_wordinfo_id_and_context_sentence
             ON sentences (wordinfo_id, lower(context_sentence));'
  end

  def down
    execute 'DROP INDEX index_wordinfos_on_lesson_id_and_word;'
    execute 'DROP INDEX index_roots_on_wordinfo_id_and_word;'
    execute 'DROP INDEX index_synonyms_on_wordinfo_id_and_word;'
    execute 'DROP INDEX index_antonyms_on_wordinfo_id_and_word;'
    execute 'DROP INDEX index_sentences_on_wordinfo_id_and_context_sentence;'
  end
end
