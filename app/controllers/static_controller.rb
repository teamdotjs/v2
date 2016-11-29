class StaticController < ApplicationController

  def lesson
    file = File.read("#{Rails.root}/client/dist/index.html")
    init_data = Lesson.where(id: params[:id]).to_json
    pre_loaded_data = file.gsub(/<!--RAILS_RENDERED_INIT_DATA-->/,
      "<script type=\"text/javascript\">" \
      "     var LESSON_INIT_DATA = #{init_data};" \
      "</script>" \
    )
    send_data pre_loaded_data,
              type: 'text/html; charset=utf-8',
              disposition: 'inline'
  end

  def base
    send_data File.read("#{Rails.root}/client/dist/index.html"),
              type: 'text/html; charset=utf-8',
              disposition: 'inline'
  end

end
