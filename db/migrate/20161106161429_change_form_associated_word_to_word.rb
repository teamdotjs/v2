class ChangeFormAssociatedWordToWord < ActiveRecord::Migration[5.0]
  def change
    remove_column :forms, :associated_word_id, :integer
    add_column :forms, :word, :string
    add_column :forms, :part_of_speech, :string
  end
end
