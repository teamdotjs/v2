class DropLessonWordinfosJoinTable < ActiveRecord::Migration[5.0]
  def change
    drop_table :lesson_wordinfos

    add_reference :wordinfos, :lesson
  end
end
