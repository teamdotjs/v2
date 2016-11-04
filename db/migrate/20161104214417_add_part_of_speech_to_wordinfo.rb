class AddPartOfSpeechToWordinfo < ActiveRecord::Migration[5.0]
  def change
    add_column :wordinfos, :part_of_speech, :string
  end
end
