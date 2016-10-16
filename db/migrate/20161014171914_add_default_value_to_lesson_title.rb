class AddDefaultValueToLessonTitle < ActiveRecord::Migration[5.0]
  def change
    change_column_default :lessons, :title, 'Untitled'
  end
end
