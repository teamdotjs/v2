class CreateGrades < ActiveRecord::Migration[5.0]
  def change
    create_table :grades do |t|
      t.string :value
      t.integer :duration, default: 0
      t.belongs_to :user, index: true
      t.belongs_to :question, index: true
    end
  end
end
