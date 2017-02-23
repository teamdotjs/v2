class CreateCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :courses do |t|
      t.string :title
      t.belongs_to :instructor, index: true
      t.timestamps
    end

    create_table :course_students do |t|
      t.belongs_to :course, index: true
      t.belongs_to :student, index: true
      t.timestamps
    end

    create_table :course_lessons do |t|
      t.belongs_to :course, index: true
      t.belongs_to :lesson, index: true
      t.timestamps
    end
  end
end
