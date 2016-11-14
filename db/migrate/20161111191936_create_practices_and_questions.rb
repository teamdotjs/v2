class CreatePracticesAndQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :practices do |t|
      t.belongs_to :lesson
      t.integer :type, index: true
      t.timestamps
    end

    create_table :questions do |t|
      t.belongs_to :practice
      t.integer :type, index: true
      t.timestamps
    end

    create_table :prompts do |t|
      t.belongs_to :question
      t.text :text
      t.timestamps
    end

    create_table :options do |t|
      t.belongs_to :question
      t.string :value
      t.boolean :is_correct
      t.timestamps
    end
  end
end
