class RenameLessonInstructorToOwner < ActiveRecord::Migration[5.0]
  def change
    rename_column :lessons, :instructor_id, :owner_id
  end
end
