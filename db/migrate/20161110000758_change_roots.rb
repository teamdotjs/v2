class ChangeRoots < ActiveRecord::Migration[5.0]
  def change
    add_column :roots, :meaning, :string
    rename_column :roots, :word, :root
  end
end
